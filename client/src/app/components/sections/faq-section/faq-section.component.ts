import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
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
export class FaqSectionComponent implements AfterViewInit {
    @Input() data: Section;
    @ViewChild('accordion') accordion: ElementRef;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        const questionElement = this.accordion.nativeElement.firstChild.firstChild;
        this.toggleAccordion(questionElement);
    }

    onAccordionClick($event): void {
        const questionElement = $event.target;
        this.toggleAccordion(questionElement);
    }

    toggleAccordion(questionElement): void {
        questionElement.classList.toggle("active");

        const answerElement = questionElement.nextElementSibling;
        const maxHeight = answerElement.style.maxHeight ? null : `${answerElement.scrollHeight}px`;
        this.renderer.setStyle(answerElement, 'maxHeight', maxHeight);
    }
}