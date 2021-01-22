import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CloudinaryService } from '@services/cloudinary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Skill } from '@models/page-content';


export interface DialogData {
    name: string;
    imgUrl: string;
    link: string;
    skills: Skill[];
}

@Component({
    selector: 'member-dialog',
    templateUrl: 'member.dialog.html',
    styleUrls: ['./member.dialog.scss']
})
export class MemberDialog {
    @ViewChild('fileInput') fileInput: ElementRef;
    submitted: boolean = false;
    memberForm: FormGroup;
    profilePicture: { path: string, file: any } = { path: '', file: null };
    megabyteLength: number = 2**20; // For DOM string comparison
    blankProfilePictureUrl: string = 'v1611307800/dory-capital/leadership/blank-profile-picture_xiyjyk.jpg';
    fileUploadRecommendation: string = 'W: 775px; H: 800px';
    fileUploadError: string = '';
    skillsList: Skill[] = [];
    editMode: boolean = false;
    diffValidator: { name: boolean, link: boolean, skills: boolean, imgUrl: boolean }
        = { name: false, link: false, skills: false, imgUrl: false };
    diff: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<MemberDialog>,
        private cloudinaryService: CloudinaryService,
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.editMode = !!Object.keys(data).length;
        this.diff = !this.editMode;
        this.apiService.getSkills().subscribe(skillsList => {
            this.skillsList = skillsList;
        });
    }

    get imgUrl() {
        if (this.profilePicture.path) {
            return this.profilePicture.file;
        } else {
            return `${this.cloudinaryService.prefix}${this.data.imgUrl || this.blankProfilePictureUrl}`;
        }
    }

    ngOnInit(): void {
        const name = this.data.name || '';
        const link = this.data.link || '';
        const skillsIds = this.data.skills ? this.data.skills.map(({ _id }) => _id) : [];
        const fileInputValidators = this.editMode ? [] : [Validators.required];
        this.memberForm = this.formBuilder.group({
            name: [name, [Validators.required]],
            link: [link, [Validators.required]],
            skills: [skillsIds, [Validators.required]],
            filePath: ['', fileInputValidators]
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onFileSelected(): void {
        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();
            const fileInput = this.fileInput.nativeElement;
            reader.onload = (e: any) => {
                const file = e.target.result;
                if (!file) {
                    this.fileUploadError = 'Cannot read file';
                    return;
                }

                if (file.length * 2 > this.megabyteLength) {
                    this.fileUploadError = 'File exceeds the 1MB maximum size';
                    return;
                }

                this.fileUploadError = '';
                this.profilePicture.path = fileInput.value;
                this.profilePicture.file = file;

                if (this.editMode) {
                    this.diffValidator.imgUrl = true;
                    this.sumDiffStatus();
                }
            };

            reader.readAsDataURL(this.fileInput.nativeElement.files[0]);
        }
    }

    onInput(field: string): void {
        if (!this.editMode) return;
        this.diffValidator[field] = this.memberForm.controls[field].value != this.data[field];
        this.sumDiffStatus();
    }

    onSelectChange(): void {
        if (!this.editMode) return;
        const selectedSkillsIds = this.memberForm.controls.skills.value;
        const memberSkillsIds = this.data.skills.map(({ _id }) => _id);

        if (selectedSkillsIds.length !== memberSkillsIds.length) {
            this.diffValidator.skills = true;
        } else {
            let skillsDiff: boolean = false;
            for (let i = 0, length = selectedSkillsIds.length; i < length; i++) {
                if (!memberSkillsIds.includes(selectedSkillsIds[i])) {
                    skillsDiff = true;
                    break;
                }
            }

            this.diffValidator.skills = skillsDiff;
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

    onSubmit(): void {
        this.submitted = true;

        if (this.memberForm.invalid) {
            return;
        }

        // this.apiService.addMember({
        //     name: this.memberForm.controls.name.value,
        //     link: this.memberForm.controls.link.value,
        //     skills: this.memberForm.controls.skills.value,
        //     imgUrl: this.memberForm.controls.imgUrl.value,
        // }).subscribe(
        //     res => {
        //     },
        //     err => {
        //     });
    }
}