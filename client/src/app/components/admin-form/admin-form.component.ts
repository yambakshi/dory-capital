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
    @Input() data: string;
    @Input() path: string;
    @Input() formTitle: string;
    @Input() dataRetrieved: boolean = false;
    @ViewChild('formElement', { read: NgForm }) formElement: NgForm;
    submitted: boolean = false;
    disableButtons: boolean = true;
    dataBackup: string = null;

    constructor(private apiService: ApiService) { }

    get f() { return this.formElement.controls; }

    ngOnChanges(): void {
        if (this.dataRetrieved) {
            this.dataBackup = this.data;
        }
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.formElement.invalid) {
            return;
        }

        const update = {
            _id: this._id,
            path: this.path,
            text: this.data
        }
        this.disableButtons = true;
        this.apiService.updateParagraph(update).subscribe((res: any) => {
            this.dataBackup = this.data;
        })
    }

    inputChanged(): void {
        this.disableButtons = this.data == this.dataBackup;
    }

    reset(): void {
        this.data = this.dataBackup;
        this.disableButtons = true;
    }
}