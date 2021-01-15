import { Request, Response } from 'express';
import { insertParagraphs } from '../../services';
import { socket } from '../../../config/socket';
import { validateParagraphsCreation } from '../../validation-schemas';


async function processParagraphs(paragraphs: any[]) {
    // TODO: CERATE CERATION VALIDATION
    // const validationErrors = validateParagraphsCreation(paragraphs);
    // if (validationErrors) {
    //     const firstErr = validationErrors[0];
    //     throw new Error(`Invalid request(${firstErr.keyword}): paragraphs ${firstErr.dataPath} ${firstErr.message}`);
    // }

    const output = insertParagraphs(paragraphs);
    return output;
}

export async function createParagraphs(req: Request, res: Response) {
    try {
        const paragraphs = req.body.data;
        const output = await processParagraphs(paragraphs);

        socket.nsp.emit('paragraphs-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}