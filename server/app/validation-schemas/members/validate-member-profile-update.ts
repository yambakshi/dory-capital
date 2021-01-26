import { ajv } from '../../../config';

const memberProfileUpdateSchema = {
    required: ['_id'],
    title: 'member-profile-update',
    type: 'object',
    properties: {
        name: { type: 'string', format: 'non-empty-string' },
        link: { type: 'string', format: 'non-empty-string' },
        sectionId: { type: 'string', format: 'non-empty-string' },
        skills: {
            type: 'array',
            minItems: 1,
            maxItems: 8,
            items: { type: "string", format: 'non-empty-string' }
        },
        profilePictureFile: {}
    }
};

export function validateMemberProfileUpdate(memberProfileUpdate: any) {
    ajv.validate(memberProfileUpdateSchema, memberProfileUpdate);
    return ajv.errors;
}