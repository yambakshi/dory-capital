export class ProfilePictureFile {
    path: string;
    file: File;
    dataUrl: string;
}

export class Skill {
    _id: string;
    imgUrl: string;
    name: string;
}

export class Member {
    _id: string;
    imgUrl: string;
    name: string;
    link: string;
    skills: Skill[];
    profilePictureFile?: ProfilePictureFile;
}

export class Paragraph {
    title: string;
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