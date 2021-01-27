import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
    @ViewChild('openMenuButton') openMenuButton: ElementRef;
    showMenu: boolean = false;
    constructor(
        private _eref: ElementRef,
        private loginService: LoginService,
        public router: Router) { }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event?) {
        console.log(event);
        if (!this._eref.nativeElement.contains(event.target)) {
            this.showMenu = false;
        }
    }

    openMenu(): void {
        this.showMenu = !this.showMenu;
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