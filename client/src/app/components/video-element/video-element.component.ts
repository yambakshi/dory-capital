import { Component } from '@angular/core';


@Component({
    selector: 'video-element',
    templateUrl: './video-element.component.html',
    styleUrls: [
        './video-element.component.common.scss',
        './video-element.component.mobile.scss'
    ]
})
export class VideoElementComponent {
    iframeSrc: string = '';
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
            .map(([param, value]) =>
                Array.isArray(value) ? encodeURIComponent(`${param}[0]`) + `=${value}` : `${param}=${value}`
            ).join('&')

        this.iframeSrc = `${url}${encodedParams}`;
    }
}