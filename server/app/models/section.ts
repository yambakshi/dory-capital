import { Member } from "./member";
import { Paragraph } from "./paragraph";

export class Section {
    name: string;
    title: string;
    content: Paragraph[] | Member[];

    constructor(section?: Section) {
        this.name = section.name;
        this.title = section.title;
        this.content = section.content;
    }
}