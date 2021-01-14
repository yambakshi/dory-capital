import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CookiesService } from './cookies.service';
import { COOKIES_OPTIONS } from './constants';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
    httpOptions: any = {
        headers: {},
        responseType: 'json'
    }

    constructor(
        private http: HttpClient,
        private cookiesService: CookiesService,
        private router: Router) { }

    logout(): any {
        return this.http.get('/api/logout', this.httpOptions).pipe(map(res => res),
            finalize(() => {
                this.router.navigate(['']);
            }), catchError(this.handleError)).subscribe(res => {
                this.cookiesService.remove(COOKIES_OPTIONS.TOKEN_COOKIE_KEY);
            });
    }

    getLoginStatus(): any {
        return this.http.get('/api/login', this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    login(creds: { email: string, password: string }): any {
        return this.http.post('/api/login', creds, this.httpOptions).pipe(map(
            (res: any) => {
                this.cookiesService.set(COOKIES_OPTIONS.TOKEN_COOKIE_KEY, res.token);
            }),
            catchError(this.handleError));
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