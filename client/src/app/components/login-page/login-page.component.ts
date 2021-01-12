import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    submitted = false;

    constructor(
        private loginService: LoginService,
        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit(): void {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loginService.login({
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        }).subscribe((res: any) => {
            this.router.navigate(['/admin']);
        });
    }

    onReset() {
        this.submitted = false;
        this.loginForm.reset();
    }
}