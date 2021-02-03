import { Component, ElementRef, Input, ViewChild } from '@angular/core';


@Component({
    selector: 'video-element',
    templateUrl: './video-element.component.html',
    styleUrls: ['./video-element.component.scss']
})
export class VideoElementComponent {
    @ViewChild('videoIframe') videoIframe: ElementRef;
    @Input() fullSize: boolean = true;
    iframeSrc: any = '';
    cloudinaryPlayer = {
        url: 'https://player.cloudinary.com/embed/?',
        params: {
            'cloud_name': 'dory-capital',
            'public_id': 'dory-capital/bg-video_fvwmqy',
            'fluid': true,
            'controls': false,
            'autoplay': true,
            'autoplayMode': 'always',
            'muted': true,
            'loop': true,
            'source_types': ['mp4']
        }
    }

    constructor() {
        const { url, params } = this.cloudinaryPlayer;
        const encodedParams = Object.entries(params)
            .map(([param, value]) => {
                if (Array.isArray(value)) {
                    return encodeURIComponent(`${param}[0]`) + `=${value}`;
                } else {
                    return `${param}=${value}`;
                }
            }).join('&')

        this.iframeSrc = `${url}${encodedParams}`;
    }
}