import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: [
        './login-page.component.common.scss',
        './login-page.component.mobile.scss'
    ]
})
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    submitted: boolean = false;
    authError: string = '';
    passwordMinLength: number = 6;
    showLoader: boolean = false;

    constructor(
        private loginService: LoginService,
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
        });
    }

    get f() { return this.loginForm.controls; }

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid || this.authError) {
            return;
        }

        this.showLoader = true;
        await this.timeout(500);
        this.loginService.login({
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        }).subscribe((response: { success: boolean, message: string }) => {
            if (response.success) {
                this.router.navigate(['/admin']);
            } else {
                this.showLoader = false;
                this.showSnackBar(response);
            }
        }, err => {
            this.showLoader = false;
            this.authError = err;
        });
    }

    showSnackBar({ message }) {
        const config = {
            duration: 5000,
            panelClass: ['custom-snackbar', 'fail-snackbar']
        }

        this.snackBar.open(message, 'Dismiss', config);
    }
}