import { Request, Response } from 'express';
import { updateText } from '../../services';
import { socket } from '../../../config/socket';
import { validateParagraphUpdate } from '../../validation-schemas';
import { logger } from '../../../config/logger';


async function processParagraphUpdate(paragraphUpdate) {
    const validationErrors = validateParagraphUpdate(paragraphUpdate);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): update-paragraph ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = updateText(paragraphUpdate);
    return output;
}

export async function updateParagraph(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'updateParagraph' request", label: 'updateParagraph' });
        const output = await processParagraphUpdate(req.body);
        socket.nsp.emit('page-data-changed');
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'updateParagraph' });
        res.status(500).send({ success: false, message: error.message });
    }
}