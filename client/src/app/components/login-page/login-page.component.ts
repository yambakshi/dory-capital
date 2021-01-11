import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    email: string;
    password: string;
    submitted = false;

    constructor(
        private loginService: LoginService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit(): void {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loginService.login({ email: this.email, password: this.password }).subscribe((res: any) => {
            console.log(res);
        });
    }

    onReset() {
        this.submitted = false;
        this.loginForm.reset();
    }
}