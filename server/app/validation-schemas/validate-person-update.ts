import { ajv } from '../../config';

const personUpdateSchema = {
    required: ['_id', 'data'],
    title: 'update-person',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: {
            title: 'person',
            type: 'object',
            properties: {
                imgUrl: { type: 'string', format: 'non-empty-string' },
                name: { type: 'string', format: 'non-empty-string' },
                link: { type: 'string', format: 'non-empty-string' },
                skills: {
                    type: 'array',
                    minItems: 1,
                    items: { type: 'string', format: 'non-empty-string' }
                }
            }
        },
    }
};

export function validatePersonUpdate(personUpdate: any) {
    ajv.validate(personUpdateSchema, personUpdate);
    return ajv.errors;
}