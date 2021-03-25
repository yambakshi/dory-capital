import { ajv } from '../../../config';

const memberProfileCreationSchema = {
    required: ['sectionId', 'profilePictureFile', 'hidden'],
    title: 'member-profile-creation',
    type: 'object',
    properties: {
        name: { type: 'string' },
        link: { type: 'string' },
        sectionId: { type: 'string', format: 'non-empty-string' },
        skills: {
            type: 'array',
            minItems: 1,
            maxItems: 12,
            items: { type: "string", format: 'non-empty-string' }
        },
        profilePictureFile: {},
        hidden: { type: "string", format: 'boolean-string' }
    }
};

export function validateMemberProfileCreation(member: any) {
    ajv.validate(memberProfileCreationSchema, member);
    return ajv.errors;
}