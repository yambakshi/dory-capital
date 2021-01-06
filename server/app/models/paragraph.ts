export class Paragraph {
    name: string;
    date: Date;
    text: string;

    constructor({ name, date, text }: Paragraph) {
        this.name = name;
        this.date = new Date(date);
        this.text = text;
    }
}