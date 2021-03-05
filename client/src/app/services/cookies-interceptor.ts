import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { COOKIES } from './constants';

@Injectable({
    providedIn: 'root'
})
export class CookiesInterceptor implements HttpInterceptor {
    constructor(@Optional() @Inject(REQUEST) private httpRequest) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // If optional request is provided, we are server side
        if (this.httpRequest && this.httpRequest.headers.cookie) {
            const cookies = this.httpRequest.headers.cookie;
            const cookiesObj = cookies.split('; ').reduce((acc, val) => {
                const [k, v] = val.split('=');
                return { ...acc, [k]: v };
            }, {});

            const token = cookiesObj[COOKIES.PREFIX + COOKIES.TOKEN_KEY];
            req = req.clone({
                setHeaders: {
                    Authorization: `bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }
}
