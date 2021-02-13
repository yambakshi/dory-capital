import { Component, Input } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Section } from '@models/section';

@Component({
    selector: 'process-section',
    templateUrl: './process-section.component.html',
    styleUrls: [
        './process-section.component.common.scss',
        './process-section.component.desktop.scss',
        './process-section.component.mobile.scss'
    ]
})
export class ProcessSectionComponent {
    @Input() data: Section;
    iconsIds = {
        work: 'work_ojgkpg',
        approval: 'approval_vb4gd9',
        dd: 'dd_zh7gzc',
        group: 'group_imsxbm',
        team: 'team_wd4r51'
    }

    constructor(private cloudinary: Cloudinary) { }

    imgSrc(key: string) {
        const url = `dory-capital/process/${this.iconsIds[key]}`;
        return this.cloudinary.url(url, { transformation: [{ fetch_format: "auto" }] });
    }
}