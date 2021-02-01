export class Skill {
    name: string;
    imageId: string;
    color: string;
    width?: number;

    constructor(skill: Skill) {
        this.name = skill.name;
        this.imageId = skill.imageId;
        this.color = skill.color;
    }
}