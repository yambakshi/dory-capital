import { Component, Input } from '@angular/core';


@Component({
    selector: 'video-element',
    templateUrl: './video-element.component.html',
    styleUrls: ['./video-element.component.scss']
})
export class VideoElementComponent {
    // TODO: Maybe delete
    // @ViewChild('videoElement') videoElement: ElementRef;
    @Input() fullSize: boolean = true;

    constructor() { }
}