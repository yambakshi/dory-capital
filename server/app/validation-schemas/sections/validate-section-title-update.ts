import { ajv } from '../../../config';

const sectionTitleUpdateSchema = {
    required: ['_id', 'title'],
    title: 'section-title-update',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        title: { type: 'string', format: 'non-empty-string' }
    },
};

export function validateSectionTitleUpdate(update: any) {
    ajv.validate(sectionTitleUpdateSchema, update);
    return ajv.errors;
}