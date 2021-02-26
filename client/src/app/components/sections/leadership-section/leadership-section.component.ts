import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Skill } from '@models/skill';
import { LeadershipSection } from '@models/section';

@Component({
    selector: 'leadership-section',
    templateUrl: './leadership-section.component.html',
    styleUrls: [
        './leadership-section.component.common.scss',
        './leadership-section.component.mobile.scss'
    ]
})
export class LeadershipSectionComponent {
    @ViewChild('membersContainer') membersContainer: ElementRef;
    @ViewChild('skillsTypes') skillsTypes: ElementRef;
    @Input() data: LeadershipSection;
    @Input() skills: Skill[];
    readonly defaultWidths = { skill: 36 };

    constructor(private cloudinary: Cloudinary) { }

    ngOnChanges(): void {
        this.data.members = this.data.members.filter(({ hidden }) => !hidden);
    }

    imgSrc(imageId: string, autoFormat: boolean = true) {
        return autoFormat ?
            this.cloudinary.url(imageId, { transformation: [{ fetch_format: "auto" }] }) :
            this.cloudinary.url(imageId);
    }
}