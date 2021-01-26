import { ajv } from '../../../config';

const skillsCreationSchema = {
    required: ['imageId', 'name'],
    title: 'skills-creation',
    type: 'object',
    properties: {
        imageId: { type: 'string', format: 'non-empty-string' },
        name: { type: 'string', format: 'non-empty-string' }
    }
};

export function validateSkillsCreation(skills: any) {
    ajv.validate({ type: "array", items: skillsCreationSchema }, skills);
    return ajv.errors;
}