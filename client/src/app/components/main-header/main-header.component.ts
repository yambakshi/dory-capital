import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@services/login.service';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: [
        './main-header.component.common.scss',
        './main-header.component.mobile.scss'
    ]
})
export class MainHeaderComponent {
    showMenu: boolean = false;
    showOutsideMenu: boolean = false;
    menuItems = [{
        link: '/beta',
        icon: 'home',
        label: 'Home Page'
    },
    {
        link: '/admin',
        icon: 'person',
        label: 'Admin Page'
    },
    {
        link: '/admin/change-password',
        icon: 'password',
        label: 'Change Password'
    }]

    constructor(
        private loginService: LoginService,
        public router: Router) { }

    hideOutsideMenu($event): void {
        $event.stopPropagation();
        this.showMenu = false;
        this.showOutsideMenu = false;
    }

    isSelected(option: string): boolean {
        return this.router.url === option;
    }

    openMenu(): void {
        this.showMenu = !this.showMenu;
        this.showOutsideMenu = this.showMenu;
    }

    logout($event): void {
        $event.stopPropagation();
        this.loginService.logout();
    }
}