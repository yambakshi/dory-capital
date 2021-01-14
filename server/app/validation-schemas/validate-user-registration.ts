import Ajv from 'ajv';

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
    const ajv = new Ajv({
        formats: {
            'non-empty-string': {
                validate: value => !!value
            }
        }
    });

    ajv.validate(userSchema, user);
    return ajv.errors;
}