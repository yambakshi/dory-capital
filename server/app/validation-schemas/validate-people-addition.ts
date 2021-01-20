import { ajv } from '../../config';

const peopleAdditionSchema = {
    required: ['_id', 'data'],
    title: 'add-people',
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'non-empty-string' },
        data: { type: 'object' }
    }
};

export function validatePeopleAddition(people: any) {
    ajv.validate(peopleAdditionSchema, people);
    return ajv.errors;
}