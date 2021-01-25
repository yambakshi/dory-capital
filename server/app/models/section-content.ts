import { Member } from "./member";
import { Paragraph } from "./paragraph";


export class SectionContent {
    _id: string;
    sectionId: string;

    constructor(content: Paragraph | Member) {
        this.sectionId = content.sectionId;
    }
}