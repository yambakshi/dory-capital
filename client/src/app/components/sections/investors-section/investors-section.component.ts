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
    iframeSrc: string = '';
    videoSrc: string = 'https://res.cloudinary.com/dory-capital/video/upload/v1614558112/dory-capital/investors/investors-video_d11806.mov';
    videoId: string = 'dory-capital/investors/investors-video_d11806';
    cloudinaryPlayer = {
        url: 'https://player.cloudinary.com/embed/?',
        params: {
            'videoId': 'dory-capital',
            'public_id': 'dory-capital/investors/investors-video_d11806',
            'fluid': true,
            'controls': false,
            'autoplay': true,
            'autoplayMode': 'always',
            'muted': true,
            'loop': true,
            'hideContextMenu': false,
            'source_types': ['mp4']
        }
    }

    constructor(
        private cloudinary: Cloudinary) {
        const { url, params } = this.cloudinaryPlayer;
        const encodedParams = Object.entries(params)
            .map(([param, value]) =>
                Array.isArray(value) ? encodeURIComponent(`${param}[0]`) + `=${value}` : `${param}=${value}`
            ).join('&')

        this.iframeSrc = `${url}${encodedParams}`;
    }

    imgSrc(imageId: string, autoFormat: boolean = true) {
        return autoFormat ?
            this.cloudinary.url(imageId, { transformation: [{ fetch_format: "auto" }] }) :
            this.cloudinary.url(imageId);
    }
}