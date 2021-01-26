import { Request, Response } from 'express';
import { deleteMembers } from '../../services';
import { socket } from '../../../config/socket';
import { validateMembersProfilesDeletion } from '../../validation-schemas';


async function processMembersProfilesDeletion(query: any) {
    const validationErrors = validateMembersProfilesDeletion(query);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): delete-members-profiles ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = deleteMembers(query);
    return output;
}

export async function deleteMembersProfiles(req: Request, res: Response) {
    try {
        const output = await processMembersProfilesDeletion(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
}