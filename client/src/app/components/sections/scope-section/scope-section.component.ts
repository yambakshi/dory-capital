import { Component, Input } from '@angular/core';
import { Section } from '@models/section';

@Component({
    selector: 'scope-section',
    templateUrl: './scope-section.component.html',
    styleUrls: [
        './scope-section.component.common.scss',
        './scope-section.component.mobile.scss'
    ]
})
export class ScopeSectionComponent {
    @Input() data: Section;

    constructor() { }
}