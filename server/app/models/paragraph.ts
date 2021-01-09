export class Paragraph {
    section: string;
    name: string;
    text: string;
    lastModified: Date;

    constructor({ section, name, text }: Paragraph) {
        this.section = section;
        this.name = name;
        this.text = text;
        this.lastModified = new Date();
    }
}