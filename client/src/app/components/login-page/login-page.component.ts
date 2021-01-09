import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: [
        './login-page.component.common.scss',
        './login-page.component.desktop.scss',
        './login-page.component.mobile.scss'
    ]
})
export class LoginPageComponent implements OnInit {
    username: string;
    password: string;
    constructor() { }

    ngOnInit(): void {
    }
}