import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from '@models/page-content';
import { ApiService } from '@services/api.service';

export interface DialogData {
    message: string;
    members: Member[];
}

@Component({
    selector: 'approve-dialog',
    templateUrl: 'approve.dialog.html',
})
export class ApproveDialog {
    constructor(
        private apiService: ApiService,
        public dialogRef: MatDialogRef<ApproveDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onRemoveClick(): void {
        const sectionId = this.data.members[0].sectionId;
        const members = this.data.members.map(({ _id, imageId }) => ({ _id, imageId }));
        // TODO: Show loader
        this.apiService.removeMembers(sectionId, members).subscribe(
            res => { this.dialogRef.close(res) },
            err => { this.dialogRef.close() });
    }
}