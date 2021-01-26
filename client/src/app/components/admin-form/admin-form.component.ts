import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    @Input() _id: string;
    @Input() type: string;
    @Input() data: any;
    @Input() dataRetrieved: boolean = false;
    @ViewChild('formElement', { read: NgForm }) formElement: NgForm;
    submitted: boolean = false;
    disableButtons: boolean = true;
    showLoader: boolean = false;
    dataBackup: string = null;
    submitCallback: Function;

    constructor(private apiService: ApiService) {
        this.submitCallback = (res: any) => {
            this.dataBackup = this.data;
            this.showLoader = false;
        }
    }

    get f() { return this.formElement.controls; }

    ngOnChanges(): void {
        if (this.dataRetrieved) {
            this.dataBackup = this.data;
        }
    }

    async onSubmit(): Promise<void> {
        this.submitted = true;

        if (this.formElement.invalid) {
            return;
        }


        this.disableButtons = true;
        this.showLoader = true;

        await this.timeout(500);

        const update: any = { _id: this._id };
        switch (this.type) {
            case 'section.title':
                update.title = this.data;
                this.apiService.updateSectionTitle(update).subscribe(this.submitCallback)
                break;
            case 'paragraph.title':
                update.title = this.data;
                this.apiService.updateParagraph(update).subscribe(this.submitCallback)
                break;
            case 'paragraph.text':
                update.text = this.data;
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
        this.disableButtons = this.data == this.dataBackup;
    }

    reset(): void {
        this.data = this.dataBackup;
        this.disableButtons = true;
    }
}