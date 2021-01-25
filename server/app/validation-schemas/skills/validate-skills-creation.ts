import { ajv } from '../../../config';

const skillsCreationSchema = {
    required: ['imgUrl', 'name'],
    title: 'skills-creation',
    type: 'object',
    properties: {
        imgUrl: { type: 'string', format: 'non-empty-string' },
        name: { type: 'string', format: 'non-empty-string' }
    }
};

export function validateSkillsCreation(skills: any) {
    ajv.validate({ type: "array", items: skillsCreationSchema }, skills);
    return ajv.errors;
}