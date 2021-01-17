import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'skills-container',
    templateUrl: './skills-container.component.html',
    styleUrls: ['./skills-container.component.scss']
})
export class SkillsContainerComponent implements AfterViewInit {
    @ViewChild('skillsContainer') skillsContainer: ElementRef;
    @Input() skills: string[];
    @Input() skillsIcons: { skill: { img: string, alt: string, color: string } };
    maxSkillsPerRow: number = 4;
    slotSize: number = 45;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        const skillsIcons = this.skillsContainer.nativeElement.children;
        for (let i = 0, length = skillsIcons.length; i < length; i++) {
            const element = skillsIcons[i];
            const left = ((i % this.maxSkillsPerRow) * this.slotSize);
            const top = (Math.floor(i / this.maxSkillsPerRow) * this.slotSize);
            this.renderer.setStyle(element, 'top', `${top}px`);
            this.renderer.setStyle(element, 'left', `${left}px`);
        }
    }
}