import { Request, Response } from 'express';
import { logger } from '../../../config/logger';
import { setPassword } from '../../services';
import { validatePasswordChange } from '../../validation-schemas';


async function processChangePassword({ password }: { password: string }) {
    const validationErrors = validatePasswordChange(password);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): change-password ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = setPassword(password);
    return output;
}

export async function changePassword(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'changePassword' request", label: 'changePassword' });
        const output = await processChangePassword(req.body);
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'changePassword' });
        res.status(500).send({ success: false, message: error.message });
    }
}