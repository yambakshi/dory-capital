import { Request, Response } from 'express';
import { User } from '../../models';
import { insertUser } from '../../services';
import { validateUserLogin } from '../../validation-schemas';


async function processUser(user: any) {
    const validationErrors = validateUserLogin(user);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): user ${firstErr.dataPath} ${firstErr.message}`);
    }
    
    const output = insertUser(new User(user));
    return output;
}

export async function registerUser(req: Request, res: Response) {
    try {
        const user = req.body;
        const output = await processUser(user);
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}