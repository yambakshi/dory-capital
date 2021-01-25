import { SectionContent } from "./section-content";

export class Paragraph extends SectionContent {
    title: string;
    text: string;

    constructor(paragraph?: Paragraph) {
        super(paragraph);
        this.title = paragraph.title;
        this.text = paragraph.text;
    }
}