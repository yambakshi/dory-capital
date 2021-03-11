import { Component, Input } from '@angular/core';
import { Section } from '@models/section';

@Component({
    selector: 'contact-section',
    templateUrl: './contact-section.component.html',
    styleUrls: [
        './contact-section.component.common.scss',
        './contact-section.component.mobile.scss'
    ]
})
export class ContactSectionComponent {
    @Input() data: Section;

    constructor() { }
}