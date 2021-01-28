export class ProfilePictureFile {
    path: string;
    file: File;
    dataUrl: string;
}

export class Skill {
    _id: string;
    imageId: string;
    name: string;
    color: string;
    width?: number;
}

export class Member {
    _id: string;
    sectionId: string;
    imageId: string;
    name: string;
    link: string;
    skills: Skill[];
    profilePictureFile?: File;
    constructor({ _id, sectionId }: { _id?: string, sectionId?: string }) {
        this._id = _id || undefined;
        this.sectionId = sectionId || undefined;
    }
}

export class Paragraph {
    _id: string;
    title?: string;
    text: string;
}

export class TextSection {
    title: string;
    paragraphs: Paragraph[];
}

export class PageContent {
    _id: string;
    scope: TextSection
    aboutUs: TextSection
    whyUs: TextSection
    leadership: { members: Member[] };
    process: TextSection
    faq: TextSection
    contactUs: TextSection
}