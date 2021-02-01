import { ajv } from '../../../config';

const skillsCreationSchema = {
    required: ['imageId', 'name', 'color'],
    title: 'skills-creation',
    type: 'object',
    properties: {
        imageId: { type: 'string', format: 'non-empty-string' },
        name: { type: 'string', format: 'non-empty-string' },
        color: { type: 'string', format: 'non-empty-string' },
        width: { type: 'number' }
    }
};

export function validateSkillsCreation(skills: any) {
    ajv.validate({ type: 'array', items: skillsCreationSchema }, skills);
    return ajv.errors;
}