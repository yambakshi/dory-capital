import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    name: string;
}

@Component({
    selector: 'approve-dialog',
    templateUrl: 'approve.dialog.html',
})
export class ApproveDialog {
    constructor(
        public dialogRef: MatDialogRef<ApproveDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}