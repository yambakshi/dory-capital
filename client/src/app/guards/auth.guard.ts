import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '@services/login.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.loginService.getLoginStatus().pipe(map((res: any) => {
            const routes = {
                'admin': loggedIn => [loggedIn, !loggedIn && '/login'],
                'login': loggedIn => [!loggedIn, loggedIn && '/admin']
            }

            const [activationStatus, newPath] = routes[route.url[0].path](res.status);
            if (newPath) {
                this.router.navigate([newPath]);
            }

            return activationStatus;
        }), catchError(err => {
            this.router.navigate(['']);
            return of(err);
        }));
    }
}