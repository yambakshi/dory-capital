import { SectionContent } from "./section-content";
import { Skill } from "./skill";

export class Member extends SectionContent {
    name: string;
    link: string;
    skills: Skill[];
    imageId: string;
    profilePictureFile?: any;

    constructor(member?: Member) {
        super(member);
        this.name = member.name;
        this.link = member.link;
        this.skills = member.skills;
        this.imageId = member.imageId;
        this.profilePictureFile = member.profilePictureFile;
    }
}