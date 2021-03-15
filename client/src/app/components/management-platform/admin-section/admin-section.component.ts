import { Component, Input } from '@angular/core';
import { Section } from '@models/section';

@Component({
    selector: 'admin-section',
    templateUrl: './admin-section.component.html',
    styleUrls: [
        './admin-section.component.common.scss',
        './admin-section.component.mobile.scss'
    ]
})
export class AdminSectionComponent {
    @Input() section: Section;

    constructor() { }
}