import { ajv } from '../../../config';

const memberProfileCreationSchema = {
    required: ['_id', 'data'],
    title: 'member-profile-creation',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: {
            required: ['leadership.member'],
            type: 'object',
            title: 'leadership-member',
            properties: {
                'leadership.member': {
                    type: 'array',
                    minItems: 1,
                    items: {
                        title: 'member',
                        required: ['imgUrl', 'name', 'link', 'skills'],
                        type: 'object',
                        properties: {
                            imgUrl: { type: 'string', format: 'non-empty-string' },
                            name: { type: 'string', format: 'non-empty-string' },
                            link: { type: 'string', format: 'non-empty-string' },
                            skills: {
                                type: 'array',
                                minItems: 1,
                                maxItems: 8,
                                items: { type: "string", format: 'non-empty-string' }
                            }
                        }
                    }
                }
            }
        }
    }
};

export function validateMemberProfileCreation(member: any) {
    ajv.validate(memberProfileCreationSchema, member);
    return ajv.errors;
}