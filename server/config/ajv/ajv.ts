import Ajv from 'ajv';

export const ajv = new Ajv({
    formats: {
        'non-empty-string': {
            validate: value => !!value
        }
    }
});