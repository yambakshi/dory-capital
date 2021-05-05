import { Component } from "@angular/core";

@Component({
    selector: 'investors-section',
    templateUrl: './investors-section.component.html',
    styleUrls: [
        './investors-section.component.common.scss',
        './investors-section.component.mobile.scss'
    ]
})
export class InvestorsComponent {
    gridId: string = 'dory-capital/scope/grid_dncnuq';
    videoId: string = 'dory-capital/investors/investors-video_d11806';

    constructor() { }

    showLogin(): void {
        // const dialogRef = this.dialog.open(InvestorsLoginDialog, {
        //     panelClass: 'custom-dialog-container'
        // })
    }
}