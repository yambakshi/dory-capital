import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Skill } from '@models/skill';

@Component({
    selector: 'member-skills',
    templateUrl: './member-skills.component.html',
    styleUrls: ['./member-skills.component.scss']
})
export class MemberSkillsComponent implements AfterViewInit {
    @ViewChild('skillsContainer') skillsContainer: ElementRef;
    @Input() skills: Skill[];
    maxSkillsPerRow: number = 6;
    iconSize: number = 18;
    margin: number;

    constructor(
        private cloudinary: Cloudinary,
        private renderer: Renderer2) {
        this.margin = (168 - (this.maxSkillsPerRow * this.iconSize)) / (this.maxSkillsPerRow + 1);
    }

    ngAfterViewInit(): void {
        const skillsRows = this.skillsContainer.nativeElement.children;
        for (let i = 0, length = this.skills.length; i < length; i++) {
            const { name, imageId } = this.skills[i];
            const imageSource = this.imgSrc(imageId);

            const div = this.renderer.createElement('div');
            this.renderer.addClass(div, 'skill-icon');
            const img = this.renderer.createElement('img');
            this.renderer.setAttribute(img, 'src', imageSource)
            this.renderer.setAttribute(img, 'alt', name);
            this.renderer.setAttribute(img, 'loading', 'lazy');
            this.renderer.appendChild(div, img);

            if (i < this.maxSkillsPerRow) {
                this.renderer.appendChild(skillsRows[0], div);
            } else {
                const left = this.margin + ((i % this.maxSkillsPerRow) * (this.iconSize + this.margin));
                this.renderer.setStyle(div, 'top', '0px');
                this.renderer.setStyle(div, 'left', `${left}px`);
                this.renderer.appendChild(skillsRows[1], div);
            }
        }
    }

    imgSrc(imageId: string) {
        return this.cloudinary.url(imageId);
    }
}