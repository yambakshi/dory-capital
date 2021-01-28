import { Paragraph } from "./paragraph";

export class Section {
    name: string;
    title: string;
    paragraphs: Paragraph[];

    constructor(section?: Section) {
        this.name = section.name;
        this.title = section.title;
        this.paragraphs = section.paragraphs;
    }
}