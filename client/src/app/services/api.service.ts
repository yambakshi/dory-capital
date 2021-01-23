import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PageContent } from '@models/page-content';

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

    getSkills(): any {
        return this.http.get('/api/skills', this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    updatePageContent(newParagraph: { _id: string, path: string, text: string }): any {
        return this.http.post('/api/admin', newParagraph, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    addMember(newMember: { name: string, link: string, skills: {}[], imgUrl: string }): any {
        return this.http.put('/api/admin', newMember, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    removeMembers(ids: string[]): any {
        const { _id } = this.pageContent;
        const body = {
            _id,
            data: {
                "leadership.people": ids
            }
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
}