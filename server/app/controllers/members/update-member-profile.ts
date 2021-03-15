import { Request, Response } from 'express';
import { updateMember } from '../../services';
import { socket } from '../../../config/socket';
import { validateMemberProfileUpdate } from '../../validation-schemas';
import { logger } from '../../../config/logger';


async function processMemberProfileUpdate(update: any) {
    if (typeof update.skills === 'string') {
        update.skills = JSON.parse(update.skills);
    }

    const validationErrors = validateMemberProfileUpdate(update);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): update-member-profile ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = updateMember(update);
    return output;
}

export async function updateMemberProfile(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'updateMemberProfile' request", label: 'updateMemberProfile' });
        const output = await processMemberProfileUpdate(req.body);
        socket.nsp.emit('page-data-changed');
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'updateMemberProfile' });
        res.status(500).send({ success: false, message: error.message });
    }
}