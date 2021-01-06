import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    api: string = 'http://localhost:3000/api';
    httpOptions: any = {
        headers: {
            // 'Access-Control-Allow-Origin': 'https://www.yambakshimusic.com'
        },
        responseType: 'json'
    }

    constructor(private http: HttpClient) { }

    getParagraphs(ids: string[]): any {
        return this.http.post(this.api, ids, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    updateParagraph(text: string): any {
        const url = `${this.api}/update`;
        return this.http.post(url, text, this.httpOptions)
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