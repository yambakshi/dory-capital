import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class LeadershipSectionComponent {
    @ViewChild('membersContainer') membersContainer: ElementRef;
    @ViewChild('skillsTypes') skillsTypes: ElementRef;
    section: Section;
    members: Member[] = [];
    skills: Skill[] = [];
    readonly defaultWidths = { member: 150, skill: 36 };

    constructor(
        private apiService: ApiService,
        private cloudinary: Cloudinary) {

        this.apiService.getPageDataObservable().subscribe((pageData: PageData) => {
            this.section = pageData.sections[3];
            this.members = pageData.members;
            this.skills = pageData.skills;
        });
    }

    imgSrc(imageId: string, autoFormat: boolean = true) {
        return autoFormat ?
            this.cloudinary.url(imageId, { transformation: [{ fetch_format: "auto" }] }) :
            this.cloudinary.url(imageId);
    }
}