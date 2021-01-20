import { ajv } from '../../config';

const userSchema = {
    required: ['email', 'password'],
    title: 'paragraph',
    type: 'object',
    properties: {
        email: { type: 'string', format: 'non-empty-string' },
        password: { type: 'string', minLength: 6, format: 'non-empty-string' }
    },
};

export function validateUserRegistration(user: { email: string, password: string }) {
    ajv.validate(userSchema, user);
    return ajv.errors;
}