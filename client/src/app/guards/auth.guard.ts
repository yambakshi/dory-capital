import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '@services/login.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private bypassGuard: boolean = false;
    private isLoggedIn: boolean = false;

    constructor(
        private loginService: LoginService,
        private router: Router) {
        this.loginService.getLoginStatusObservable().subscribe((status: boolean) => {
            this.isLoggedIn = status;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.bypassGuard) {
            this.bypassGuard = false;
            return true;
        }

        const routes = {
            '': loggedIn => [loggedIn, !loggedIn && 'login'],
            'login': loggedIn => [!loggedIn, loggedIn && '']
        }

        const path = route.url.length > 0 ? route.url[0].path : '';
        const [allowNavigation, newPath] = routes[path](this.isLoggedIn);
        if (newPath) {
            const parentUrl = route.parent.url[0].path;
            this.bypassGuard = true;
            this.router.navigate([`${parentUrl}/${newPath}`]);

        }

        return allowNavigation;
    }
}