import * as Ajv from 'ajv';

const paragraphSchema = {
    required: ['section', 'name', 'text'],
    title: 'paragraph',
    type: 'object',
    properties: {
        section: { type: 'string', format: 'non-empty-string' },
        name: { type: 'string', format: 'non-empty-string' },
        text: { type: 'string', format: 'non-empty-string' }
    },
};

export function validateParagraphsCreation(paragraphs: any[]) {
    const ajv = new Ajv({
        formats: {
            'non-empty-string': {
                validate: value => !!value
            }
        }
    });

    ajv.validate({ type: 'array', items: paragraphSchema }, paragraphs);
    return ajv.errors;
}