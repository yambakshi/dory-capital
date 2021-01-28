import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Section } from '@models/section';
import { Member } from '@models/member';
import { PageData } from '@models/page-data';
import { Skill } from '@models/skill';
import { ApiService } from '@services/api.service';

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
    @ViewChild('membersContainer') membersContainer: ElementRef;
    @ViewChild('skillsTypes') skillsTypes: ElementRef;
    section: Section;
    members: Member[] = [];
    skills: Skill[] = [];

    constructor(
        private apiService: ApiService,
        private cloudinary: Cloudinary,
        private renderer: Renderer2) {

        this.apiService.getPageDataObservable().subscribe((pageData: PageData) => {
            this.section = pageData.sections[3];
            this.members = pageData.members;
            this.skills = pageData.skills;
        });
    }

    ngAfterViewInit(): void {
        const membersElements = this.membersContainer.nativeElement.children;
        for (let i = 0, length = this.members.length; i < length; i++) {
            const { width } = this.members[i];
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