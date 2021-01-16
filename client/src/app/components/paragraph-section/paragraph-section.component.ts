import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'paragraph-section',
    templateUrl: './paragraph-section.component.html',
    styleUrls: [
        './paragraph-section.component.common.scss',
        './paragraph-section.component.desktop.scss',
        './paragraph-section.component.mobile.scss'
    ]
})
export class ParagraphSectionComponent implements OnInit {
    @Input() _id: string;
    @Input() name: string;
    @Input() data: {
        title: string,
        paragraphs: { text: string }[]
    };
    @Input() dataRetrieved: boolean = false;
    collapsed: boolean = false;
    nameKey: string = ''

    constructor() { }

    ngOnInit(): void {
        this.nameKey = this.toCamelCase(this.name);
    }

    toCamelCase(str: string): string {
        let camelCaseStr = str.toLowerCase().split(' ');
        const firstWord = camelCaseStr.shift();
        camelCaseStr = camelCaseStr.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        return `${firstWord}${camelCaseStr.join()}`;
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
    }
}