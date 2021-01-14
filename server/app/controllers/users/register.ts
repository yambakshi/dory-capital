import { Request, Response } from 'express';
import { insertUser } from '../../services';
import { validateUserRegistration } from '../../validation-schemas';


async function processRegistration(user: any) {
    const validationErrors = validateUserRegistration(user);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): user ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = insertUser(user);
    return output;
}

export async function register(req: Request, res: Response) {
    try {
        const user = req.body;
        const output = await processRegistration(user);
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}