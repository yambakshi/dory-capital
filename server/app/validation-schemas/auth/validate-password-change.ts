import { ajv } from '../../../config';

const passwordChangeSchema = { type: 'string', minLength: 6, format: 'non-empty-string' };

export function validatePasswordChange(password: string) {
    ajv.validate(passwordChangeSchema, password);
    return ajv.errors;
}