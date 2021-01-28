import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CookiesService } from './cookies.service';
import { COOKIES } from './constants';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
    private loginSubject: BehaviorSubject<boolean>;
    httpOptions: any = {
        headers: {},
        responseType: 'json'
    }

    constructor(
        private http: HttpClient,
        private cookiesService: CookiesService,
        private router: Router) {
        this.loginSubject = new BehaviorSubject<boolean>(false);
        this.getLoginStatus().subscribe((res: any) => {
            this.setLoginStatus(res.status);
        });
    }

    getLoginStatusObservable(): Observable<boolean> {
        return this.loginSubject.asObservable();
    }

    setLoginStatus(status: boolean): void {
        this.loginSubject.next(status);
    }

    logout(): any {
        return this.http.get('/api/auth/logout', this.httpOptions).pipe(map(res => res),
            finalize(() => {
                this.router.navigate(['']);
                this.setLoginStatus(false);
            }), catchError(this.handleError)).subscribe(res => {
                this.cookiesService.remove(COOKIES.TOKEN_KEY);
            });
    }

    getLoginStatus(): any {
        return this.http.get('/api/auth/login', this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    login(creds: { email: string, password: string }): any {
        return this.http.post('/api/auth/login', creds, this.httpOptions).pipe(map(
            (res: any) => {
                this.setLoginStatus(true);
                this.cookiesService.set(COOKIES.TOKEN_KEY, res.token);
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