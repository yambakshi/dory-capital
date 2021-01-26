import { ajv } from '../../../config';

const membersProfilesDeletionSchema = {
    required: ['sectionId', 'members'],
    title: 'members-profiles-deletion',
    type: 'object',
    properties: {
        sectionId: { type: 'string', format: 'non-empty-string' },
        members: {
            type: 'array',
            items: {
                required: ['_id', 'imageId'],
                title: 'member',
                type: 'object',
                properties: {
                    _id: { type: 'string', format: 'non-empty-string' },
                    imageId: { type: 'string', format: 'non-empty-string' }
                }
            }
        }
    }
};

export function validateMembersProfilesDeletion(ids: any) {
    ajv.validate(membersProfilesDeletionSchema, ids);
    return ajv.errors;
}