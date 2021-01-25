import { ajv } from '../../../config';

const userRegistrationSchema = {
    required: ['email', 'password'],
    title: 'user-registration',
    type: 'object',
    properties: {
        email: { type: 'string', format: 'non-empty-string' },
        password: { type: 'string', minLength: 6, format: 'non-empty-string' }
    },
};

export function validateUserRegistration(user: { email: string, password: string }) {
    ajv.validate(userRegistrationSchema, user);
    return ajv.errors;
}