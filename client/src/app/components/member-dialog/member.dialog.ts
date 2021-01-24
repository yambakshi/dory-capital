import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Member, ProfilePictureFile, Skill } from '@models/page-content';
import { Cloudinary } from '@cloudinary/angular-5.x';


export interface DialogData {
    _id: string;
    name: string;
    imageId: string;
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
    profilePicture: ProfilePictureFile = { path: '', dataUrl: '', file: null };
    blankImageId: string = 'dory-capital/leadership/blank-profile-picture_xiyjyk';
    fileUploadRecommendation: string = 'W: 775px; H: 800px';
    fileUploadError: string = '';
    skillsList: Skill[] = [];
    editMode: boolean = false;
    diffValidator:
        { name: boolean, link: boolean, skills: boolean, imgUrl: boolean } =
        { name: false, link: false, skills: false, imgUrl: false };
    diff: boolean = false;
    submitMethod: Function;

    constructor(
        public dialogRef: MatDialogRef<MemberDialog>,
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private cloudinary: Cloudinary,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.editMode = !!Object.keys(data).length;
        this.diff = !this.editMode;
        this.apiService.getSkills().subscribe(skillsList => {
            this.skillsList = skillsList;
        });
    }

    get imgUrl() {
        return this.profilePicture.dataUrl ||
            this.cloudinary.url(this.data.imageId || this.blankImageId, { transformation: [{ fetch_format: "auto" }] });
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
            imgUrl: ['', fileInputValidators]
        });
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

                if (this.editMode) {
                    this.diffValidator.imgUrl = true;
                    this.sumDiffStatus();
                }
            };

            reader.readAsDataURL(file);
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

    onSubmit(): void {
        this.submitted = true;

        if (this.memberForm.invalid) {
            return;
        }

        this.editMode ? this.submitEdit() : this.submitAdd();
    }

    submitEdit(): void {
        const member = new Member();
        const modifiedFields = Object.keys(this.diffValidator).filter(key => this.diffValidator[key]);
        modifiedFields.forEach(field => member[field] = this.memberForm.controls[field].value);
        if (this.profilePicture.file)
            member.profilePictureFile = this.profilePicture;

        this.apiService.updateMember(this.data._id, member).subscribe(
            res => { this.dialogRef.close(res) },
            err => { console.log(err) });
    }

    submitAdd(): void {
        const member = new Member();
        for (const field in this.memberForm.controls) {
            member[field] = this.memberForm.controls[field].value;
        }

        member.profilePictureFile = this.profilePicture;
        this.apiService.addMember(member).subscribe(
            res => { this.dialogRef.close(res) },
            err => { console.log(err) });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}