import { Component, Input } from '@angular/core';
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

    collapsed: boolean = false;

    constructor(private apiService: ApiService) { }

    onSubmit($event, pathParts: any[]): void {
        const { _id } = this;
        const name = this.formatName();
        const path = `${name}.${pathParts.join('.')}`;
        const text = $event.target['value'].value;
        this.apiService.updateParagraph({ _id, path, text }).subscribe((res: any) => { })
    }

    formatName(): string {
        let formattedName = this.name.toLowerCase().split(' ');
        let firstWord = formattedName.shift();
        formattedName = formattedName.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        return `${firstWord}${formattedName.join()}`
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
    }

    reset(): void {

    }
}