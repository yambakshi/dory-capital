import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Member } from '@models/member';

export interface DialogData {
    message: string;
    members: Member[];
}

@Component({
    selector: 'investors-login-dialog',
    templateUrl: 'investors-login.dialog.html',
    styleUrls: [
        './investors-login.dialog.common.scss',
        './investors-login.dialog.mobile.scss'
    ]
})
export class InvestorsLoginDialog {
    loginId: string = 'dory-capital/investors/login-popup_dtnwa8';

    constructor(
        private cloudinary: Cloudinary,
        public dialogRef: MatDialogRef<InvestorsLoginDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    get loginImgSrc(): string {
        return this.cloudinary.url(this.loginId, { transformation: [{ fetch_format: "auto" }] });
    }
}