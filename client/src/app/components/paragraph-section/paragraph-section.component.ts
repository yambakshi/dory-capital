import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '@services/api.service';

@Component({
    selector: 'paragraph-section',
    templateUrl: './paragraph-section.component.html',
    styleUrls: [
        './paragraph-section.component.common.scss',
        './paragraph-section.component.desktop.scss',
        './paragraph-section.component.mobile.scss'
    ]
})
export class ParagraphSectionComponent {
    @Input() _id: string;
    @Input() name: string;
    @Input() data: {
        title: string,
        paragraphs: { text: string }[]
    };
    @Input() dataRetrieved: boolean = false;
    @ViewChild('formElement', { read: NgForm }) formElement: NgForm;
    collapsed: boolean = false;
    dataBackup: any = null;
    submitted: boolean = false;
    disableButtons: boolean = true;

    constructor(private apiService: ApiService) { }

    get f() { return this.formElement.controls; }

    ngOnChanges(): void {
        if (this.dataRetrieved) {
            this.dataBackup = JSON.parse(JSON.stringify(this.data));
        }
    }

    onSubmit($event, pathParts: any[]): void {
        this.submitted = true;

        if (this.formElement.invalid) {
            return;
        }

        const { _id } = this;
        const name = this.toCamelCase(this.name);
        const path = `${name}.${pathParts.join('.')}`;
        const text = $event.target['value'].value;
        this.apiService.updateParagraph({ _id, path, text }).subscribe((res: any) => {
            this.dataBackup = JSON.parse(JSON.stringify(this.data));
        })
    }

    toCamelCase(str: string): string {
        let camelCaseStr = str.toLowerCase().split(' ');
        const firstWord = camelCaseStr.shift();
        camelCaseStr = camelCaseStr.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        return `${firstWord}${camelCaseStr.join()}`;
    }

    inputChanged(pathParts: any[]): void {
        const [type, i, subtype] = pathParts;
        const comparer = {
            'title': ({ type }) => this.data[type] == this.dataBackup[type],
            'paragraphs': ({ type, i, subtype }) => this.data[type][i][subtype] == this.dataBackup[type][i][subtype]
        }

        const valueChanged = comparer[type]({ type, i, subtype });
        this.disableButtons = valueChanged;
        console.log(valueChanged);
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
    }

    reset(pathParts: any[]): void {
        const [type, i, subtype] = pathParts;
        const resetter = {
            'title': ({ type }) => this.data[type] = this.dataBackup[type],
            'paragraphs': ({ type, i, subtype }) => this.data[type][i][subtype] = this.dataBackup[type][i][subtype]
        }

        resetter[type]({ type, i, subtype });
        this.disableButtons = true;
    }
}