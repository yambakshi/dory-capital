import { Skill } from "./skill";

export class Member {
    _id: string;
    sectionId: string;
    name: string;
    link: string;
    skills: Skill[];
    imageId: string;
    profilePictureFile?: File;
    width?: number;

    constructor({ _id, sectionId }: { _id?: string, sectionId?: string }) {
        this._id = _id || undefined;
        this.sectionId = sectionId || undefined;
    }
}