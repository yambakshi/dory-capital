import { Request, Response } from 'express';
import { updateSection } from '../../services';
import { socket } from '../../../config/socket';
import { validateSectionTitleUpdate } from '../../validation-schemas';


async function processSectionTitleUpdate(update: any) {
    const validationErrors = validateSectionTitleUpdate(update);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): update-section-title ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = updateSection(update);
    return output;
}

export async function updateSectionTitle(req: Request, res: Response) {
    try {
        const output = await processSectionTitleUpdate(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
}