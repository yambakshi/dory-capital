import { Skill } from "./skill";

export class Member {
    _id: string;
    sectionId: string;
    name: string;
    link: string;
    skills: Skill[];
    imageId: string;
    profilePictureFile?: any;
    hidden: boolean = false;

    constructor(member?: Member) {
        if (!member) return;
        this.name = member.name;
        this.link = member.link;
        this.skills = member.skills;
        this.imageId = member.imageId;
        this.profilePictureFile = member.profilePictureFile;
        this.hidden = member.hidden;
    }
}