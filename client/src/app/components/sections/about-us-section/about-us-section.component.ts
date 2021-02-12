import { Component, Input } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Section } from '@models/section';

@Component({
    selector: 'about-us-section',
    templateUrl: './about-us-section.component.html',
    styleUrls: [
        './about-us-section.component.common.scss',
        './about-us-section.component.desktop.scss',
        './about-us-section.component.mobile.scss'
    ]
})
export class AboutUsSectionComponent {
    @Input() data: Section;
    playVideo: boolean = false;
    iframeSrc: any = '';
    thumbnailId: string = 'dory-capital/about-us/pr-video-thumbnail_lsenx5';
    cloudinaryPlayer = {
        url: 'https://player.cloudinary.com/embed/?',
        params: {
            'cloud_name': 'dory-capital',
            'public_id': 'dory-capital/about-us/pr-video_ih7dg6',
            'fluid': true,
            'controls': true,
            'hide_context_menu': true,
            'show_logo': false,
            'source_types': ['mp4']
        }
    }

    constructor(private cloudinary: Cloudinary) {
        const { url, params } = this.cloudinaryPlayer;
        const encodedParams = Object.entries(params)
            .map(([param, value]) =>
                Array.isArray(value) ? encodeURIComponent(`${param}[0]`) + `=${value}` : `${param}=${value}`
            ).join('&')

        this.iframeSrc = `${url}${encodedParams}`;
    }

    togglePlayVideo(): void {
        this.playVideo = !this.playVideo;
    }

    get thumbnailUrl() {
        return this.cloudinary.url(this.thumbnailId, { transformation: [{ fetch_format: "auto" }] });
    }
}