import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    name: string;
    imgUrl: string;
    link: string;
    skills: string[];
}

@Component({
    selector: 'add-member-dialog',
    templateUrl: 'add-member-dialog.component.html',
    styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialog {
    @ViewChild('fileInput') fileInput: ElementRef;
    profilePicture: { path: string, file: any } = { path: '', file: null };
    megabyteLength: number = 1000 * 1000;
    fileUploadError: string = '';

    constructor(
        public dialogRef: MatDialogRef<AddMemberDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onFileSelected() {
        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();
            const fileInput = this.fileInput.nativeElement;
            reader.onload = (e: any) => {
                const file = e.target.result;
                if (!file) {
                    this.fileUploadError = 'Cannot read file';
                    return;
                }

                if (file.byteLength > this.megabyteLength) {
                    this.fileUploadError = 'File exceeds the 1MB maximum size';
                    return;
                }

                this.fileUploadError = '';
                this.profilePicture.path = fileInput.value;
                this.profilePicture.file = file;
            };

            reader.readAsArrayBuffer(this.fileInput.nativeElement.files[0]);
        }
    }
}