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
    readonly bgVideoId: string = 'dory-capital/bg-video_fvwmqy';

    constructor() { }
}