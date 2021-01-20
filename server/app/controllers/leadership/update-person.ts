import { Request, Response } from 'express';
import { updatePersonProfile } from '../../services';
import { socket } from '../../../config/socket';
import { validatePersonUpdate } from '../../validation-schemas';


async function processUpdatePerson(update: any) {
    const validationErrors = validatePersonUpdate(update);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): update-person ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = updatePersonProfile(update);
    return output;
}

export async function updatePerson(req: Request, res: Response) {
    try {
        const output = await processUpdatePerson(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}