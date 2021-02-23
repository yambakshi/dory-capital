import { ajv } from '../../../config';

const memberReorderSchema = {
    required: ['sectionId', 'membersIds'],
    title: 'members-reorder',
    type: 'object',
    properties: {
        sectionId: { type: 'string', format: 'non-empty-string' },
        members: {
            type: 'array',
            items: {
                required: ['_id'],
                title: 'member',
                type: 'object',
                properties: {
                    _id: { type: 'string', format: 'non-empty-string' }
                }
            }
        }
    }
};

export function validateMembersReorder(membersIds: any) {
    ajv.validate(memberReorderSchema, membersIds);
    return ajv.errors;
}