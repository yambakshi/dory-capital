import { ajv } from '../../../config';

const sectionTitleUpdateSchema = {
    required: ['section', 'name', 'text'],
    title: 'sections-creation',
    type: 'object',
    properties: {
        section: { type: 'string', format: 'non-empty-string' },
        name: { type: 'string', format: 'non-empty-string' },
        text: { type: 'string', format: 'non-empty-string' }
    },
};

export function validateSectionTitleUpdate(update: any) {
    ajv.validate(sectionTitleUpdateSchema, update);
    return ajv.errors;
}