import { ajv } from '../../config';

const skillsAdditionSchema = {
    required: ['imgUrl', 'name'],
    title: 'add-skills',
    type: 'object',
    properties: {
        imgUrl: { type: 'string', format: 'non-empty-string' },
        name: { type: 'string', format: 'non-empty-string' }
    }
};

export function validateSkillsAddition(skills: any) {
    ajv.validate({ type: "array", items: skillsAdditionSchema }, skills);
    return ajv.errors;
}