import { Request, Response } from 'express';
import { updateContent } from '../../services';
import { socket } from '../../../config/socket';
import { validatePageContentUpdate } from '../../validation-schemas';


async function processPageContent(pageContentUpdate) {
    const validationErrors = validatePageContentUpdate(pageContentUpdate);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): page-content ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = updateContent(pageContentUpdate);
    return output;
}

export async function updatePageContent(req: Request, res: Response) {
    try {
        const output = await processPageContent(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}