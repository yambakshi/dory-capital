import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Skill } from '@models/page-content';

@Component({
    selector: 'leadership-section',
    templateUrl: './leadership-section.component.html',
    styleUrls: [
        './leadership-section.component.common.scss',
        './leadership-section.component.desktop.scss',
        './leadership-section.component.mobile.scss'
    ]
})
export class LeadershipSectionComponent implements AfterViewInit {
    @ViewChild('members') members: ElementRef;
    @ViewChild('skillsTypes') skillsTypes: ElementRef;
    data: any;
    skills: Skill[] = [];

    constructor(
        private route: ActivatedRoute,
        private cloudinary: Cloudinary,
        private renderer: Renderer2) {
        this.route.data.subscribe(data => {
            if (!data['pageData']) {
                this.data = [];
                return;
            }

            this.data = data['pageData'].sections[3];
            this.skills = data['pageData'].skills;
        });
    }

    ngAfterViewInit(): void {
        const membersElements = this.members.nativeElement.children;
        for (let i = 0, length = this.data.content.length; i < length; i++) {
            const { width } = this.data.content[i];
            if (width) {
                this.renderer.setStyle(membersElements[i].firstChild.children[1], 'width', `${width}px`);
            }
        }

        const skills = this.skillsTypes.nativeElement.children;
        for (let i = 0, length = this.skills.length; i < length; i++) {
            const { width } = this.skills[i];
            if (width) {
                this.renderer.setStyle(skills[i].firstChild, 'width', `${width}px`);
            }
        }
    }

    imgSrc(imageId: string) {
        return this.cloudinary.url(imageId, { transformation: [{ fetch_format: "auto" }] });
    }
}