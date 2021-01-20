import { ajv } from '../../config';

const pageContentSchema = {
    required: ['_id', 'data'],
    title: 'update-page-content',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: { type: 'object' }
    },
};

export function validatePageContentUpdate(pageContentUpdate: any) {
    ajv.validate(pageContentSchema, pageContentUpdate);
    return ajv.errors;
}