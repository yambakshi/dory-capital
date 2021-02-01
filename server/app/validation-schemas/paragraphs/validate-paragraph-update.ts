import { ajv } from '../../../config';

const paragraphUpdateSchema = {
    required: ['_id'],
    title: 'paragraph-update',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        title: { type: 'string', format: 'non-empty-string' },
        text: { type: 'string', format: 'non-empty-string' }
    },
};

export function validateParagraphUpdate(paragraphUpdate: any) {
    ajv.validate(paragraphUpdateSchema, paragraphUpdate);
    return ajv.errors;
}