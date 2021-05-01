import { Component, Input } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Section } from '@models/section';

@Component({
    selector: 'process-section',
    templateUrl: './process-section.component.html',
    styleUrls: [
        './process-section.component.common.scss',
        './process-section.component.mobile.scss'
    ]
})
export class ProcessSectionComponent {
    @Input() data: Section;
    cloudinaryFolder: string = 'dory-capital/process/';
    onePagerExampleId: string = 'one-pager-example_vlohka';
    iconsIds = {
        work: 'work_ojgkpg',
        approval: 'approval_vb4gd9',
        dd: 'dd_zh7gzc',
        group: 'group_imsxbm',
        team: 'team_wd4r51'
    }

    constructor(private cloudinary: Cloudinary) { }

    publicId(key: string): string {
        return `${this.cloudinaryFolder}${this.iconsIds[key]}`;
    }

    pdfSrc(): string {
        const url = `${this.cloudinaryFolder}${this.onePagerExampleId}`
        return this.cloudinary.url(url);
    }
}