import { ajv } from '../../../config';

const paragraphUpdateSchema = {
    required: ['_id', 'data'],
    title: 'paragraph-update',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: { type: 'object' }
    },
};

export function validateParagraphUpdate(paragraphUpdate: any) {
    ajv.validate(paragraphUpdateSchema, paragraphUpdate);
    return ajv.errors;
}