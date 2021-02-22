import { ajv } from '../../../config';

const memberProfileCreationSchema = {
    required: ['name', 'link', 'sectionId', 'skills', 'profilePictureFile'],
    title: 'member-profile-creation',
    type: 'object',
    properties: {
        name: { type: 'string', format: 'non-empty-string' },
        link: { type: 'string', format: 'non-empty-string' },
        sectionId: { type: 'string', format: 'non-empty-string' },
        skills: {
            type: 'array',
            minItems: 1,
            maxItems: 12,
            items: { type: "string", format: 'non-empty-string' }
        },
        profilePictureFile: {}
    }
};

export function validateMemberProfileCreation(member: any) {
    ajv.validate(memberProfileCreationSchema, member);
    return ajv.errors;
}