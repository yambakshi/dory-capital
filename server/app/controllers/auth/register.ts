import { Request, Response } from 'express';
import { logger } from '../../../config/logger';
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
        logger.info({ message: "Received 'regiter' request", label: 'regiter' });
        const output = await processRegistration(req.body);
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'regiter' });
        res.status(500).send({ success: false, message: error.message });
    }
}