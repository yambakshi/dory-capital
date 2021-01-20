import { ajv } from '../../config';

const pageContentCreationSchema = {
    required: ['section', 'name', 'text'],
    title: 'create-page-content',
    type: 'object',
    properties: {
        section: { type: 'string', format: 'non-empty-string' },
        name: { type: 'string', format: 'non-empty-string' },
        text: { type: 'string', format: 'non-empty-string' }
    },
};

export function validatePageContentCreation(pageContent: any) {
    ajv.validate(pageContentCreationSchema, pageContent);
    return ajv.errors;
}