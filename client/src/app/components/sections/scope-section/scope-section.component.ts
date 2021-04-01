import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Output() navigationEmitter = new EventEmitter<string>();

    constructor() { }

    scrollToSection(name: string): void {
        this.navigationEmitter.emit(name);
    }
}