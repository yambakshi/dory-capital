import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    httpOptions: any = {
        headers: {},
        responseType: 'json'
    }

    constructor(private http: HttpClient) { }

    getPageContent(): any {
        return this.http.get('/api', this.httpOptions)
            .pipe(catchError(this.handleError));
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