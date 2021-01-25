export class Skill {
    name: string;
    imageId: string;

    constructor(skill: Skill) {
        this.name = skill.name;
        this.imageId = skill.imageId;
    }
}