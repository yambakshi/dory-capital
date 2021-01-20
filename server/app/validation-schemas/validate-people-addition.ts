import { ajv } from '../../config';

const peopleAdditionSchema = {
    required: ['_id', 'data'],
    title: 'add-people',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: {
            required: ['leadership.people'],
            type: 'object',
            title: 'leadership-people',
            properties: {
                'leadership.people': {
                    type: 'array',
                    minItems: 1,
                    items: {
                        title: 'people',
                        required: ['imgUrl', 'name', 'link', 'skills'],
                        type: 'object',
                        properties: {
                            imgUrl: { type: 'string', format: 'non-empty-string' },
                            name: { type: 'string', format: 'non-empty-string' },
                            link: { type: 'string', format: 'non-empty-string' },
                            skills: {
                                type: 'array',
                                minItems: 1,
                                items: { type: "string", format: 'non-empty-string' }
                            }
                        }
                    }
                }
            }
        }
    }
};

export function validatePeopleAddition(people: any) {
    ajv.validate(peopleAdditionSchema, people);
    return ajv.errors;
}