import { Request, Response } from 'express';
import { insertMember } from '../../services';
import { socket } from '../../../config/socket';
import { validateMemberProfileCreation } from '../../validation-schemas';


async function processMemberProfile(member: any) {
    const validationErrors = validateMemberProfileCreation(member);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): create-member-profile ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = insertMember(member);
    return output;
}

export async function createMemberProfile(req: Request, res: Response) {
    try {
        const output = await processMemberProfile(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}