import { ajv } from '../../config';

const peopleDeletionSchema = {
    required: ['_id', 'data'],
    title: 'delete-people',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: {
            required: ['leadership.people'],
            type: 'object',
            title: 'leadership-people',
            properties: {
                'leadership.people': {
                    type: 'array',
                    minItems: 1,
                    items: { type: 'string', format: 'non-empty-string' }
                }
            }
        }
    }
};

export function validatePeopleDeletion(ids: any) {
    ajv.validate(peopleDeletionSchema, ids);
    return ajv.errors;
}