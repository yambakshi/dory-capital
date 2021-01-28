export class Paragraph {
    _id: string;
    sectionId: string;
    title: string;
    text: string;

    constructor(paragraph?: Paragraph) {
        if (!paragraph) return;
        this.title = paragraph.title;
        this.text = paragraph.text;
    }
}