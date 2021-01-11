import { Component } from '@angular/core';
import { LoginService } from '@services/login.service';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: [
        './login-page.component.common.scss',
        './login-page.component.desktop.scss',
        './login-page.component.mobile.scss'
    ]
})
export class LoginPageComponent {
    email: string;
    password: string;

    constructor(private loginService: LoginService) { }

    submit(): void {
        this.loginService.login({ email: this.email, password: this.password }).subscribe((res: any) => { });
    }
}