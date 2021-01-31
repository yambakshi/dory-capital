import { Component, Input } from '@angular/core';


@Component({
    selector: 'video-element',
    templateUrl: './video-element.component.html',
    styleUrls: ['./video-element.component.scss']
})
export class VideoElementComponent {
    @Input() fullSize: boolean = true;

    constructor() { }
}