import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Member } from '@models/member';
import { Paragraph } from '@models/paragraph';
import { PageData } from '@models/page-data';
import { SocketIoService } from './socket-io.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private pageDataSubject: BehaviorSubject<PageData>;
    private readonly eventName: string = 'page-data-changed';
    private httpOptions: any = {
        headers: {},
        responseType: 'json'
    }

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any,
        private socketIoService: SocketIoService) {
        this.pageDataSubject = new BehaviorSubject<PageData>(new PageData());

        if (isPlatformBrowser(this.platformId)) {
            this.socketIoService.connect();
            this.socketIoService.listen(this.eventName).subscribe(() => {
                this.getPageData().subscribe(() => { });
            })
        }
    }

    getPageDataObservable(): Observable<PageData> {
        return this.pageDataSubject.asObservable();
    }

    setPageData(pageData: PageData): void {
        this.pageDataSubject.next(pageData);
    }

    getPageData(): any {
        return this.http.get('/api/general', this.httpOptions)
            .pipe(
                map((res: any) => {
                    this.setPageData(res);
                    return res;
                }),
                catchError(this.handleError));
    }

    updateSectionTitle(update: { _id: string, title: string }): any {
        return this.http.post('/api/sections', update, this.httpOptions)
            .pipe(
                map(this.handleResponse.bind(this)),
                catchError(this.handleError));
    }

    updateParagraph(paragraph: Paragraph): any {
        return this.http.post('/api/paragraphs', paragraph, this.httpOptions)
            .pipe(
                map(this.handleResponse.bind(this)),
                catchError(this.handleError));
    }

    getSkills(): any {
        return this.http.get('/api/skills', this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    addMember(member: Member): any {
        const formData = this.objectToFormData(member);
        return this.http.put('/api/members', formData, this.httpOptions)
            .pipe(
                map(this.handleResponse.bind(this)),
                catchError(this.handleError));
    }

    updateMember(member: Member): any {
        const formData = this.objectToFormData(member);
        return this.http.post('/api/members', formData, this.httpOptions)
            .pipe(
                map(this.handleResponse.bind(this)),
                catchError(this.handleError));
    }

    removeMembers(sectionId: string, members: { _id: string, imageId: string }[]): any {
        const body = { sectionId, members };
        const options = { ...this.httpOptions, body };
        return this.http.delete('/api/members', options)
            .pipe(
                map(this.handleResponse.bind(this)),
                catchError(this.handleError));
    }

    reorderMembers(sectionId: string, membersIds: string[]): any {
        const body = { sectionId, membersIds };
        return this.http.post('/api/reorder-members', body, this.httpOptions)
            .pipe(
                map(this.handleResponse.bind(this)),
                catchError(this.handleError));
    }

    private handleResponse(res: any): any {
        this.socketIoService.emit(this.eventName);
        return res;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

    private objectToFormData(obj: any, form?: FormData, namespace?: string): FormData {
        var fd: FormData = form || new FormData();
        var formKey;

        for (var property in obj) {
            if (obj.hasOwnProperty(property) && (obj[property] !== null && obj[property] !== undefined)) {

                if (namespace) {
                    formKey = namespace + '[' + property + ']';
                } else {
                    formKey = property;
                }

                // if the property is an object, but not a File, use recursivity.
                if (typeof obj[property] === 'object' && !(obj[property] instanceof File) && !(obj[property] instanceof Date)) {
                    fd = this.objectToFormData(obj[property], fd, formKey);
                } else if (obj[property] instanceof Date) {
                    fd.append(formKey, obj[property].toISOString());
                } else {
                    // if it's a string or a File object
                    fd.append(formKey, obj[property]);
                }

            }
        }

        return fd;
    }
}