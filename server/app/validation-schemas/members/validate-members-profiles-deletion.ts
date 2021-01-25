import { ajv } from '../../../config';

const membersProfilesDeletionSchema = {
    required: ['_id', 'data'],
    title: 'members-profiles-deletion',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: {
            required: ['leadership.members'],
            type: 'object',
            title: 'leadership-members',
            properties: {
                'leadership.members': {
                    type: 'array',
                    minItems: 1,
                    items: {
                        required: ['_id', 'imageId'],
                        type: 'object',
                        properties:  {
                            _id: { type: 'string', format: 'non-empty-string' },
                            imageId: { type: 'string', format: 'non-empty-string' }
                        }
                    }
                }
            }
        }
    }
};

export function validateMembersProfilesDeletion(ids: any) {
    ajv.validate(membersProfilesDeletionSchema, ids);
    return ajv.errors;
}