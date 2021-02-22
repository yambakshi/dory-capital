import { Paragraph } from "./paragraph";

export class Section {
    _id: string;
    name: string;
    title: string;
    paragraphs: Paragraph[];
}

export interface LeadershipSection extends Section {
    members: string[];
}