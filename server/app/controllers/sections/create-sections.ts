import { Request, Response } from 'express';
import { insertSections } from '../../services';
import { socket } from '../../../config/socket';
import { validateSectionsCreation } from '../../validation-schemas';
import { logger } from '../../../config/logger';


async function processSectionCreation(sections: any[]) {
    const validationErrors = validateSectionsCreation(sections);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): create-sections ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = insertSections(sections);
    return output;
}

export async function createSections(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'createSections' request", label: 'createSections' });
        const output = await processSectionCreation(req.body.sections);
        socket.nsp.emit('page-data-changed');
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'createSections' });
        res.status(500).send({ success: false, message: error.message });
    }
}