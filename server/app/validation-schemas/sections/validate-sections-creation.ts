import { ajv } from '../../../config';

const sectionsCreationSchema = {
    required: ['sections'],
    type: 'array',
    items: {
        required: ['name', 'title', 'paragraphs'],
        type: 'object',
        title: 'section',
        properties: {
            name: { type: 'string', format: 'non-empty-string' },
            title: { type: 'string', format: 'non-empty-string' },
            paragraphs: {
                type: 'array',
                items: {
                    type: 'object',
                    title: 'paragraphs',
                    properties: {
                        title: { type: 'string', format: 'non-empty-string' },
                        text: { type: 'string', format: 'non-empty-string' },
                    }
                }
            }
        }
    },
};

export function validateSectionsCreation(sections: any) {
    ajv.validate(sectionsCreationSchema, sections);
    return ajv.errors;
}