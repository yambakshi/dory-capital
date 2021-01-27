import { Component, Input } from '@angular/core';

@Component({
    selector: 'admin-section',
    templateUrl: './admin-section.component.html',
    styleUrls: [
        './admin-section.component.common.scss',
        './admin-section.component.desktop.scss',
        './admin-section.component.mobile.scss'
    ]
})
export class ParagraphSectionComponent {
    @Input() data: any;
    @Input() dataRetrieved: boolean = false;

    constructor() { }
}