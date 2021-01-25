import { ajv } from '../../../config';

const memberProfileUpdateSchema = {
    required: ['_id', 'data'],
    title: 'member-profile-update',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: {
            title: 'member',
            type: 'object',
            properties: {
                imgUrl: { type: 'string', format: 'non-empty-string' },
                name: { type: 'string', format: 'non-empty-string' },
                link: { type: 'string', format: 'non-empty-string' },
                skills: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 8,
                    items: { type: 'string', format: 'non-empty-string' }
                }
            }
        },
    }
};

export function validateMemberProfileUpdate(memberProfileUpdate: any) {
    ajv.validate(memberProfileUpdateSchema, memberProfileUpdate);
    return ajv.errors;
}