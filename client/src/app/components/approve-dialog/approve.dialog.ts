import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberRow } from '@components/admin-leadership/admin-leadership.component';
import { ApiService } from '@services/api.service';

export interface DialogData {
    message: string;
    members: MemberRow[];
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
        const ids = this.data.members.map(({ _id }) => _id);
        // TODO: Show loader
        this.apiService.removeMembers(ids).subscribe(
            (res: any) => {
                this.dialogRef.close(this.data.members);
            },
            err => {
                console.error(err);
                this.dialogRef.close([]);
            });
    }
}