import { Request, Response } from 'express';
import { createPeopleProfiles } from '../../services';
import { socket } from '../../../config/socket';
import { validatePeopleAddition } from '../../validation-schemas';


async function processMembers(people: any) {
    const validationErrors = validatePeopleAddition(people);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): add-people ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = createPeopleProfiles(people);
    return output;
}

export async function addMembers(req: Request, res: Response) {
    try {
        const output = await processMembers(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}