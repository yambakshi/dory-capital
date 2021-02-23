import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Member } from '@models/member';
import { Skill } from '@models/skill';
import { LeadershipSection } from '@models/section';

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
    @Input() data: LeadershipSection;
    @Input() members: Member[];
    @Input() skills: Skill[];
    readonly defaultWidths = { skill: 36 };

    constructor(private cloudinary: Cloudinary) { }

    ngOnChanges(): void {
        const membersMap = this.members.reduce((acc, member) => ({ ...acc, [member._id]: member }), {});
        const members = [];
        for (let i = 0, length = this.data.members.length; i < length; i++) {
            const _id = this.data.members[i];
            if (membersMap[_id].hidden) {
                continue;
            }

            members.push(membersMap[_id]);
        }

        this.members = members;
    }

    imgSrc(imageId: string, autoFormat: boolean = true) {
        return autoFormat ?
            this.cloudinary.url(imageId, { transformation: [{ fetch_format: "auto" }] }) :
            this.cloudinary.url(imageId);
    }
}