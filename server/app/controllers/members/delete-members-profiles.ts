import { Request, Response } from 'express';
import { deleteMembers } from '../../services';
import { validateMembersProfilesDeletion } from '../../validation-schemas';
import { logger } from '../../../config/logger';


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
        logger.info({ message: "Received 'deleteMembersProfiles' request", label: 'deleteMembersProfiles' });
        const output = await processMembersProfilesDeletion(req.body);
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'deleteMembersProfiles' });
        res.status(500).send({ success: false, message: error.message });
    }
}