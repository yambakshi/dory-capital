import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Paragraph } from '@models/paragraph';
import { Section } from '@models/section';
import { ApiService } from '@services/api.service';

@Component({
    selector: 'admin-form',
    templateUrl: './admin-form.component.html',
    styleUrls: [
        './admin-form.component.common.scss',
        './admin-form.component.desktop.scss',
        './admin-form.component.mobile.scss'
    ]
})
export class AdminFormComponent {
    @Input() type: string;
    @Input() data: Section | Paragraph;
    @ViewChild('formElement', { read: NgForm }) formElement: NgForm;
    submitted: boolean = false;
    disableButtons: boolean = true;
    showLoader: boolean = false;
    inputBackup: Section | Paragraph = null;
    submitCallback: Function;

    constructor(private apiService: ApiService) {
        this.submitCallback = (res: any) => {
            this.inputBackup = this.data[this.type];
            this.showLoader = false;
        }
    }

    get f() { return this.formElement.controls; }

    get showParagraphTitle() {
        return !this.isSection(this.data) && this.type == 'title';
    }

    isSection(data: Section | Paragraph): data is Section {
        return (data as Section).paragraphs !== undefined;
    }

    ngOnChanges(): void {
        this.inputBackup = this.data[this.type];
    }

    async onSubmit(): Promise<void> {
        this.submitted = true;

        if (this.formElement.invalid || this.isTextDisabled) {
            return;
        }


        this.disableButtons = true;
        this.showLoader = true;

        await this.timeout(500);

        const update: any = { _id: this.data._id };
        switch (this.type) {
            case 'title':
                update.title = this.data.title;
                this.isSection(this.data) ?
                    this.apiService.updateSectionTitle(update).subscribe(this.submitCallback) :
                    this.apiService.updateParagraph(update).subscribe(this.submitCallback);

                break;
            case 'text':
                update.text = (this.data as Paragraph).text;
                this.apiService.updateParagraph(update).subscribe(this.submitCallback)
                break;
            default:
                break;
        }
    }

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    inputChanged(): void {
        if (this.isTextDisabled) {
            return;
        }

        this.disableButtons = this.data[this.type] == this.inputBackup;
    }

    reset(): void {
        this.data[this.type] = this.inputBackup;
        this.disableButtons = true;
    }

    get isTextDisabled(): boolean {
        return !this.isSection(this.data) && (this.data.disabled && this.type == 'text');
    }
}