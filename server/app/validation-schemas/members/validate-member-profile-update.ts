import { ajv } from '../../../config';

const memberProfileUpdateSchema = {
    required: ['_id'],
    title: 'member-profile-update',
    type: 'object',
    properties: {
        name: { type: 'string' },
        link: { type: 'string' },
        sectionId: { type: 'string', format: 'non-empty-string' },
        skills: {
            type: 'array',
            minItems: 0,
            maxItems: 12,
            items: { type: "string", format: 'non-empty-string' }
        },
        profilePictureFile: {},
        hidden: { type: "string", format: 'boolean-string' }
    }
};

export function validateMemberProfileUpdate(memberProfileUpdate: any) {
    ajv.validate(memberProfileUpdateSchema, memberProfileUpdate);
    return ajv.errors;
}