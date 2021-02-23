import { Request, Response } from 'express';
import { reorderMembers } from '../../services';
import { socket } from '../../../config/socket';
import { validateMembersReorder } from '../../validation-schemas';
import { logger } from '../../../config/logger';


async function processReorderMembersProfiles(query: any) {
    const validationErrors = validateMembersReorder(query);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): reorder-members ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = reorderMembers(query);
    return output;
}

export async function reorderMembersProfiles(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'reorderMembers' request", label: 'reorderMembers' });
        const output = await processReorderMembersProfiles(req.body);
        socket.nsp.emit('page-data-changed');
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'reorderMembers' });
        res.status(500).send({ success: false, message: error.message });
    }
}