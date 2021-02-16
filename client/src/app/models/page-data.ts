import { Member } from "./member";
import { Section } from "./section";
import { Skill } from "./skill";

export class PageData {
    _id: string;
    sections: Section[];
    skills: Skill[];
    members: Member[];
}