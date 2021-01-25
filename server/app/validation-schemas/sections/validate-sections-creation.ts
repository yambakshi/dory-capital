import { ajv } from '../../../config';

const sectionsCreationSchema = {
    required: ['section', 'name', 'text'],
    title: 'sections-creation',
    type: 'object',
    properties: {
        section: { type: 'string', format: 'non-empty-string' },
        name: { type: 'string', format: 'non-empty-string' },
        text: { type: 'string', format: 'non-empty-string' }
    },
};

export function validateSectionsCreation(sections: any) {
    ajv.validate(sectionsCreationSchema, sections);
    return ajv.errors;
}