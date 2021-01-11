import Ajv from 'ajv';

const paragraphSchema = {
    required: ['_id', 'text'],
    title: 'paragraph',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        text: { type: 'string', format: 'non-empty-string' }
    },
};

export function validateParagraphsUpdate(paragraphs: any[]) {
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