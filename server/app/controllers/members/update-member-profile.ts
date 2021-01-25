import { Request, Response } from 'express';
import { updateMember } from '../../services';
import { socket } from '../../../config/socket';
import { validateMemberProfileUpdate } from '../../validation-schemas';


async function processMemberProfileUpdate(update: any) {
    // const validationErrors = validateMemberProfileUpdate(update);
    // if (validationErrors) {
    //     const firstErr = validationErrors[0];
    //     throw new Error(`Invalid request(${firstErr.keyword}): update-member-profile ${firstErr.dataPath} ${firstErr.message}`);
    // }

    const output = updateMember(update);
    return output;
}

export async function updateMemberProfile(req: Request, res: Response) {
    try {
        const output = await processMemberProfileUpdate(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}