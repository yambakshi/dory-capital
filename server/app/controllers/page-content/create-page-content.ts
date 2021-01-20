import { Request, Response } from 'express';
import { insertPageContent } from '../../services';
import { socket } from '../../../config/socket';
import { validatePageContentCreation } from '../../validation-schemas';


async function processPageContent(pageContent: any[]) {
    // TODO: CERATE VALIDATION
    // const validationErrors = validateParagraphsCreation(pageContent);
    // if (validationErrors) {
    //     const firstErr = validationErrors[0];
    //     throw new Error(`Invalid request(${firstErr.keyword}): page-content ${firstErr.dataPath} ${firstErr.message}`);
    // }

    const output = insertPageContent(pageContent);
    return output;
}

export async function createPageContent(req: Request, res: Response) {
    try {
        const output = await processPageContent(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}