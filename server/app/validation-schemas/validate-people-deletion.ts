import { ajv } from '../../config';

const peopleDeletionSchema = {
    required: ['_id', 'data'],
    title: 'delete-people',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: { type: 'object' }
    }
};

export function validatePeopleDeletion(ids: any) {
    ajv.validate(peopleDeletionSchema, ids);
    return ajv.errors;
}