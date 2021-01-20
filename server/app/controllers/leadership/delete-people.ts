import { Request, Response } from 'express';
import { deletePeopleProfiles } from '../../services';
import { socket } from '../../../config/socket';
import { validatePeopleDeletion } from '../../validation-schemas';


async function processDeletePeople(query: any) {
    const validationErrors = validatePeopleDeletion(query);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): delete-people ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = deletePeopleProfiles(query);
    return output;
}

export async function deletePeople(req: Request, res: Response) {
    try {
        const output = await processDeletePeople(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}