import { Component } from "@angular/core";
import { Cloudinary } from "@cloudinary/angular-5.x";

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
    videoSrc: string = 'https://res.cloudinary.com/dory-capital/video/upload/v1614558112/dory-capital/investors/investors-video_d11806.mov';

    constructor(private cloudinary: Cloudinary) { }

    imgSrc(imageId: string, autoFormat: boolean = true) {
        return autoFormat ?
            this.cloudinary.url(imageId, { transformation: [{ fetch_format: "auto" }] }) :
            this.cloudinary.url(imageId);
    }
}