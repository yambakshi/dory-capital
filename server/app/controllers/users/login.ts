import { Request, Response } from 'express';
import { validateUserLogin } from '../../validation-schemas';
import { validateUser } from '../../services';
import { User } from '../../models';

async function processLogin(user: any) {
    const validationErrors = validateUserLogin(user);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): user ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = validateUser(new User(user));
    return output;
}

export async function login(req: Request, res: Response) {
    try {
        const user = req.body;
        const output = await processLogin(user);
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}