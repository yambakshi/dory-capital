import { Request, Response } from 'express';
import { insertMember } from '../../services';
import { socket } from '../../../config/socket';
import { validateMemberProfileCreation } from '../../validation-schemas';
import { logger } from '../../../config/logger';


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
        logger.info({ message: "Received 'createMemberProfile' request", label: 'createMemberProfile' });
        const output = await processMemberProfile(req.body);
        socket.nsp.emit('page-data-changed');
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'createMemberProfile' });
        res.status(500).send({ success: false, message: error.message });
    }
}