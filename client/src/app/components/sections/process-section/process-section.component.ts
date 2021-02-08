import { Component, Input } from '@angular/core';
import { Section } from '@models/section';

@Component({
    selector: 'process-section',
    templateUrl: './process-section.component.html',
    styleUrls: [
        './process-section.component.common.scss',
        './process-section.component.desktop.scss',
        './process-section.component.mobile.scss'
    ]
})
export class ProcessSectionComponent {
    @Input() data: Section;

    constructor() { }
}