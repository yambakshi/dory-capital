import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Member, PageContent } from '@models/page-content';

@Injectable()
export class ApiService {
    pageContent: PageContent;
    httpOptions: any = {
        headers: {},
        responseType: 'json'
    }

    constructor(private http: HttpClient) { }

    getPageContent(): any {
        return this.http.get('/api', this.httpOptions)
            .pipe(
                map(res => {
                    this.pageContent = res as any;
                    return res;
                }),
                catchError(this.handleError));
    }

    updatePageContent(newParagraph: { _id: string, path: string, text: string }): any {
        return this.http.post('/api/admin', newParagraph, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    getSkills(): any {
        return this.http.get('/api/skills', this.httpOptions)
            .pipe(catchError(this.handleError));
    }


    addMember(member: Member): any {
        const { _id } = this.pageContent;
        const body = {
            _id,
            data: { "leadership.people": [member] }
        }

        const formData = this.objectToFormData(body);
        return this.http.put('/api/admin/leadership', formData, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    updateMember(_id: string, member: Member): any {
        const body = { _id, data: member };
        const formData = this.objectToFormData(body);
        return this.http.post('/api/admin/leadership', body, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    removeMembers(members: { _id: string, imageId: string }[]): any {
        const { _id } = this.pageContent;
        const body = {
            _id,
            data: { "leadership.people": members }
        }

        const options = { ...this.httpOptions, body };
        return this.http.delete('/api/admin/leadership', options)
            .pipe(catchError(this.handleError));
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

                // if the property is an object, but not a File,
                // use recursivity.
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