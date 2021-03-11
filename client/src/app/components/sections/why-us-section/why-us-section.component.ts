import { Component, Input } from '@angular/core';
import { Section } from '@models/section';

@Component({
    selector: 'why-us-section',
    templateUrl: './why-us-section.component.html',
    styleUrls: [
        './why-us-section.component.common.scss',
        './why-us-section.component.mobile.scss'
    ]
})
export class WhyUsSectionComponent {
    @Input() data: Section;

    constructor() { }
}