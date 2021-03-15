import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from '@models/member';
import { ApiService } from '@services/api.service';

export interface DialogData {
    message: string;
    members: Member[];
}

@Component({
    selector: 'approve-dialog',
    templateUrl: 'approve.dialog.html',
    styleUrls: [
        './approve.dialog.common.scss',
        './approve.dialog.mobile.scss'
    ]
})
export class ApproveDialog {
    showLoader: boolean = false;

    constructor(
        private apiService: ApiService,
        public dialogRef: MatDialogRef<ApproveDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async onRemoveClick() {
        const sectionId = this.data.members[0].sectionId;
        const members = this.data.members.map(({ _id, imageId }) => ({ _id, imageId }));
        this.showLoader = true;
        await this.timeout(500);
        this.apiService.removeMembers(sectionId, members).subscribe(
            res => { this.dialogRef.close(res) },
            err => { this.dialogRef.close() });
    }
}