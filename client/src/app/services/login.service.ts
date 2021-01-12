import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "@environments/environment";

@Injectable()
export class LoginService {
    readonly api: string = `${environment.apiUrl}/api`;


    constructor(private http: HttpClient) { }

    logout(): void {

    }

    getLoginStatus(): any {
        const httpOptions: any = {
            headers: {},
            responseType: 'json'
        }

        return this.http.get(`${this.api}/get-login-status`, httpOptions)
            .pipe(catchError(this.handleError));
    }

    login(creds: { email: string, password: string }): any {
        const httpOptions: any = {
            headers: {},
            responseType: 'json',
            withCredentials: true
        }

        return this.http.post(`${this.api}/login`, creds, httpOptions)
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