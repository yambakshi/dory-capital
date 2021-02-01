import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Member, } from '@models/member';
import { ProfilePictureFile } from '@models/profile-picture-file';
import { Skill } from '@models/skill';
import { Cloudinary } from '@cloudinary/angular-5.x';


export interface DialogData {
    editMode: boolean;
    member: Member;
    skills: Skill[];
}

@Component({
    selector: 'member-dialog',
    templateUrl: 'member.dialog.html',
    styleUrls: [
        './member.dialog.common.scss',
        './member.dialog.mobile.scss'
    ]
})
export class MemberDialog implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    readonly blankImageId: string = 'dory-capital/leadership/blank-profile-picture_djm9y5';
    readonly fileUploadRecommendation: string = 'W: 775px; H: 800px';
    readonly maxSelectedSkills: number = 8;
    submitted: boolean = false;
    memberForm: FormGroup;
    profilePicture: ProfilePictureFile = { path: '', dataUrl: '', file: null };
    fileUploadError: string = '';
    diffValidator:
        { name: boolean, link: boolean, skills: boolean, profilePicture: boolean } =
        { name: false, link: false, skills: false, profilePicture: false };
    diff: boolean = false;
    showLoader: boolean = false;
    maxSkillsExceeded: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<MemberDialog>,
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private cloudinary: Cloudinary,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.diff = !this.data.editMode;
    }

    get imgSrc() {
        return this.profilePicture.dataUrl ||
            this.cloudinary.url(this.data.member.imageId || this.blankImageId, { transformation: [{ fetch_format: "auto" }] });
    }

    ngOnInit(): void {
        const { member } = this.data;
        const name = member.name || '';
        const link = member.link || '';
        const skillsIds = member.skills ? member.skills.map(({ _id }) => _id) : [];
        const fileInputValidators = this.data.editMode ? [] : [Validators.required];
        this.memberForm = this.formBuilder.group({
            name: [name, [Validators.required]],
            link: [link, [Validators.required]],
            skills: [skillsIds, [Validators.required, this.maxOptionsValidator()]],
            profilePicture: ['', fileInputValidators]
        });
    }

    maxOptionsValidator() {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value.length > this.maxSelectedSkills) {
                this.maxSkillsExceeded = true;
                return { 'maxOptionsValidator': true }
            }

            this.maxSkillsExceeded = false;
            return null;
        };
    }

    onFileSelected(): void {
        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();
            const fileInput = this.fileInput.nativeElement;
            const file: File = fileInput.files[0];
            reader.onload = (e: any) => {
                const dataUrl = e.target.result;
                if (!dataUrl) {
                    this.fileUploadError = 'Cannot read file';
                    return;
                }

                const head = 'data:image/png;base64,';
                const imgFileSize = Math.round((dataUrl.length - head.length) * 3 / 4) / 1024;

                // If image file size is over 1000 kilobytes
                if (imgFileSize > 1000) {
                    this.fileUploadError = 'File exceeds the 1MB maximum size';
                    return;
                }

                this.fileUploadError = '';
                this.profilePicture.path = fileInput.value;
                this.profilePicture.file = file;
                this.profilePicture.dataUrl = dataUrl;

                if (this.data.editMode) {
                    this.diffValidator.profilePicture = true;
                    this.sumDiffStatus();
                }
            };

            reader.readAsDataURL(file);
        }
    }

    onInput(field: string): void {
        if (!this.data.editMode) return;
        this.diffValidator[field] = this.memberForm.controls[field].value != this.data[field];
        this.sumDiffStatus();
    }

    onSelectChange(): void {
        if (this.maxSkillsExceeded || !this.data.editMode) return;
        const selectedSkillsIds = this.memberForm.controls.skills.value;
        const memberSkillsIds = this.data.member.skills.map(({ _id }) => _id);

        if (selectedSkillsIds.length !== memberSkillsIds.length) {
            this.diffValidator.skills = true;
        } else {
            let diffStatus: boolean = false;
            for (let i = 0, length = selectedSkillsIds.length; i < length; i++) {
                if (!memberSkillsIds.includes(selectedSkillsIds[i])) {
                    diffStatus = true;
                    break;
                }
            }

            this.diffValidator.skills = diffStatus;
        }

        this.sumDiffStatus();
    }

    sumDiffStatus(): void {
        const statuses = Object.values(this.diffValidator);
        let inputChanged: boolean = false;
        for (let i = 0, length = statuses.length; i < length; i++) {
            if (!statuses[i]) continue;
            inputChanged = true;
            break;
        }

        this.diff = inputChanged;
    }

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async onSubmit() {
        this.submitted = true;

        if (this.memberForm.invalid) {
            return;
        }

        this.showLoader = true;
        await this.timeout(500);
        this.data.editMode ? this.submitEdit() : this.submitAdd();
    }

    submitEdit(): void {
        const { _id } = this.data.member;
        const member = new Member({ _id });
        const modifiedFields = Object.keys(this.diffValidator).filter(key => this.diffValidator[key]);
        modifiedFields.forEach(field => {
            if (field === 'profilePicture') {
                member.imageId = this.data.member.imageId;
                member.profilePictureFile = this.profilePicture.file;
            } else {
                member[field] = this.memberForm.controls[field].value
            }
        });

        this.apiService.updateMember(member).subscribe(
            res => { this.dialogRef.close(res) },
            err => { console.log(err) });
    }

    submitAdd(): void {
        const { sectionId } = this.data.member;
        const member = new Member({ sectionId });
        for (const field in this.memberForm.controls) {
            if (field === 'profilePicture') {
                member.profilePictureFile = this.profilePicture.file;
            } else {
                member[field] = this.memberForm.controls[field].value;
            }
        }

        this.apiService.addMember(member).subscribe(
            res => { this.dialogRef.close(res) },
            err => { console.log(err) });
    }
}