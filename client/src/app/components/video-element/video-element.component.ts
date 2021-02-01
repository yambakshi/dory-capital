import { Component, Input } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';


@Component({
    selector: 'video-element',
    templateUrl: './video-element.component.html',
    styleUrls: ['./video-element.component.scss']
})
export class VideoElementComponent {
    @Input() fullSize: boolean = true;
    // readonly videoId: string = 'dory-capital/bg-video_fvwmqy';
    readonly videoId: string = 'https://res.cloudinary.com/dory-capital/video/upload/f_auto/v1612139147/dory-capital/bg-video_fvwmqy.mov';

    constructor(private cloudinary: Cloudinary) { }

    get videoSrc() {
        return this.cloudinary.url(this.videoId, { transformation: [{ fetch_format: "auto" }] });
    }
}