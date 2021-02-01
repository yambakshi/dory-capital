import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@services/login.service';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: [
        './main-header.component.common.scss',
        './main-header.component.desktop.scss',
        './main-header.component.mobile.scss'
    ]
})
export class MainHeaderComponent {
    showMenu: boolean = false;
    showOutsideMenu: boolean = false;

    constructor(
        private loginService: LoginService,
        public router: Router) { }

    hideOutsideMenu($event): void {
        $event.stopPropagation();
        this.showMenu = false;
        this.showOutsideMenu = false;
    }

    openMenu(): void {
        this.showMenu = !this.showMenu;
        this.showOutsideMenu = this.showMenu;
    }

    goTo($event, path: string): void {
        $event.stopPropagation();
        this.router.navigate([path]);
    }

    logout($event): void {
        $event.stopPropagation();
        this.loginService.logout();
    }
}