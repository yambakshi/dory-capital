import { Component, Input } from '@angular/core';
import { Section } from '@models/section';

@Component({
    selector: 'faq-section',
    templateUrl: './faq-section.component.html',
    styleUrls: [
        './faq-section.component.common.scss',
        './faq-section.component.desktop.scss',
        './faq-section.component.mobile.scss'
    ]
})
export class FaqSectionComponent {
    @Input() data: Section;

    constructor() { }
}