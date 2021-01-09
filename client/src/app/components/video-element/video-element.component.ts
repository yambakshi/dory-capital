import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
    selector: 'video-element',
    templateUrl: './video-element.component.html',
    styleUrls: ['./video-element.component.scss']
})
export class VideoElementComponent {
    @ViewChild('videoElement') videoElement: ElementRef;

    constructor() { }
}