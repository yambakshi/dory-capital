import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from '@services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
        const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

        return invalidCtrl || invalidParent;
    }
}

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: [
        './change-password.component.common.scss',
        './change-password.component.mobile.scss'
    ]
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    submitted: boolean = false;
    passwordMinLength: number = 6;
    passwordsMatch: boolean = false;
    showLoader: boolean = false;
    matcher = new MyErrorStateMatcher();

    constructor(
        private loginService: LoginService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.changePasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
            confirmPassword: ['']
        }, { validators: this.comparePasswords });
    }

    get f() { return this.changePasswordForm.controls; }

    comparePasswords(group: FormGroup): { notSame: boolean } {
        const password = group.get('password').value;
        const confirmPassword = group.get('confirmPassword').value;

        return password === confirmPassword ? null : { notSame: true }
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.changePasswordForm.invalid) {
            return;
        }

        this.showLoader = true;
        const password = this.changePasswordForm.controls.password.value;
        this.loginService.changePassword(password)
            .subscribe((response: { success: boolean, message: string }) => {
                this.showLoader = false;
                this.submitted = false;
                this.showSnackBar(response);
                this.changePasswordForm.reset();
            }, err => {
                this.showLoader = false;
            });
    }

    showSnackBar({ success, message }) {
        const config = {
            duration: 5000,
            panelClass: ['custom-snackbar']
        }

        config.panelClass.push(`${success ? 'success' : 'fail'}-snackbar`);
        this.snackBar.open(message, 'Dismiss', config);
    }
}