import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Section } from '@models/section';
import { Member } from '@models/member';
import { Skill } from '@models/skill';

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
    @Input() data: Section;
    @Input() members: Member[];
    @Input() skills: Skill[];
    readonly defaultWidths = { member: 150, skill: 36 };

    constructor(private cloudinary: Cloudinary) { }

    imgSrc(imageId: string, autoFormat: boolean = true) {
        return autoFormat ?
            this.cloudinary.url(imageId, { transformation: [{ fetch_format: "auto" }] }) :
            this.cloudinary.url(imageId);
    }
}