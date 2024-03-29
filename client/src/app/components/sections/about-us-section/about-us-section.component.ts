import { Component, Input, ViewChild } from '@angular/core';
import { Section } from '@models/section';

@Component({
    selector: 'about-us-section',
    templateUrl: './about-us-section.component.html',
    styleUrls: [
        './about-us-section.component.common.scss',
        './about-us-section.component.mobile.scss'
    ]
})
export class AboutUsSectionComponent {
    @Input() data: Section;
    @ViewChild('videoElement') videoElement: any;
    playVideo: boolean = false;
    videoPlayerVisible: boolean = false;
    videoSrc: string = 'https://res.cloudinary.com/dory-capital/video/upload/f_auto,q_auto/v1612457064/dory-capital/about-us/pr-video_ih7dg6.mp4';
    playIconId: string = 'dory-capital/about-us/play_qojytb';
    thumbnailId: string = 'dory-capital/about-us/pr-video-thumbnail_lsenx5';

    constructor() { }

    showVideoPlayer(): void {
        this.videoPlayerVisible = true;
        this.playVideo = true;
        this.videoElement.nativeElement.play();
    }

    hideVideoPlayer(): void {
        this.playVideo = false;
    }

    togglePlayVideo(): void {
        this.playVideo = !this.playVideo;
        this.playVideo ?
            this.videoElement.nativeElement.play() :
            this.videoElement.nativeElement.pause();
    }
}