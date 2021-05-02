import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { isPlatformBrowser } from '@angular/common';
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
        @Inject(PLATFORM_ID) private platformId: any,
        private cloudinary: Cloudinary,
        private renderer: Renderer2) {
        this.margin = (168 - (this.maxSkillsPerRow * this.iconSize)) / (this.maxSkillsPerRow + 1);
    }

    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        const skillsRows = this.skillsContainer.nativeElement.children;
        const stringToHTML = (str) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(str, 'text/html');
            return doc.body;
        };

        for (let i = 0, length = this.skills.length; i < length; i++) {
            const { name, imageId } = this.skills[i];
            const div = this.renderer.createElement('div');
            const imgElementStr = this.cloudinary.imageTag(imageId, { secure: true, alt: name, loading: 'lazy' }).toHtml();
            var imgElement = stringToHTML(imgElementStr).firstChild;

            this.renderer.addClass(div, 'skill-icon');
            this.renderer.appendChild(div, imgElement);

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
}