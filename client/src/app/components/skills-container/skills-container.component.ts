import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Skill } from '@models/skill';

@Component({
    selector: 'skills-container',
    templateUrl: './skills-container.component.html',
    styleUrls: ['./skills-container.component.scss']
})
export class SkillsContainerComponent implements AfterViewInit {
    @ViewChild('skillsContainer') skillsContainer: ElementRef;
    @Input() skills: Skill[];
    maxSkillsPerRow: number = 4;
    iconSize: number = 20;
    margin: number;

    constructor(
        private cloudinary: Cloudinary,
        private renderer: Renderer2) {
        this.margin = (168 - (4 * this.iconSize)) / 5;
    }

    ngAfterViewInit(): void {
        const skillsRows = this.skillsContainer.nativeElement.children;
        for (let i = 0, length = this.skills.length; i < length; i++) {
            const { name, imageId } = this.skills[i];
            const imageSource = this.imgSrc(imageId);

            if (i < 4) {
                const div = this.renderer.createElement('div');
                this.renderer.addClass(div, 'skill-icon');
                const img = this.renderer.createElement('img');
                this.renderer.setAttribute(img, 'src', imageSource)
                this.renderer.setAttribute(img, 'alt', name);
                this.renderer.appendChild(div, img);
                this.renderer.appendChild(skillsRows[0], div);
            } else {
                const div = this.renderer.createElement('div');
                this.renderer.addClass(div, 'skill-icon');
                const left = this.margin + ((i % this.maxSkillsPerRow) * (this.iconSize + this.margin));
                const top = 0;
                this.renderer.setStyle(div, 'top', `${top}px`);
                this.renderer.setStyle(div, 'left', `${left}px`);
                const img = this.renderer.createElement('img');
                this.renderer.setAttribute(img, 'src', imageSource)
                this.renderer.setAttribute(img, 'alt', name);
                this.renderer.appendChild(div, img);
                this.renderer.appendChild(skillsRows[1], div);
            }
        }
    }

    imgSrc(imageId: string) {
        return this.cloudinary.url(imageId);
    }
}