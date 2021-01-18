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
    iconSize: number = 30;
    margin: number = 9.6;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        const skillsRows = this.skillsContainer.nativeElement.children;
        for (let i = 0, length = this.skills.length; i < length; i++) {
            const skill = this.skills[i];
            if (i < 4) {
                const div = this.renderer.createElement('div');
                this.renderer.addClass(div, 'skill-icon');
                const img = this.renderer.createElement('img');
                this.renderer.setAttribute(img, 'src', `assets/media/leadership/skills/${this.skillsIcons[skill].img}.svg`)
                this.renderer.setAttribute(img, 'alt', this.skillsIcons[skill].alt);
                this.renderer.appendChild(div, img);
                this.renderer.appendChild(skillsRows[0], div);
            } else {
                const div = this.renderer.createElement('div');
                this.renderer.addClass(div, 'skill-icon');
                const left = 9.6 + ((i % this.maxSkillsPerRow) * (this.iconSize + this.margin));
                const top = 0;
                this.renderer.setStyle(div, 'top', `${top}px`);
                this.renderer.setStyle(div, 'left', `${left}px`);
                const img = this.renderer.createElement('img');
                this.renderer.setAttribute(img, 'src', `assets/media/leadership/skills/${this.skillsIcons[skill].img}.svg`)
                this.renderer.setAttribute(img, 'alt', this.skillsIcons[skill].alt);
                this.renderer.appendChild(div, img);
                this.renderer.appendChild(skillsRows[1], div);
            }
        }
    }
}