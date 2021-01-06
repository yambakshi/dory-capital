import { Request, Response } from 'express';
import { updateText } from '../../services';
import { socket } from '../../../config/socket';
import { validateParagraphsUpdate } from '../../validation-schemas';


async function processParagraph(paragraph) {
    const validationErrors = validateParagraphsUpdate([paragraph]);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): paragraphs ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = updateText(paragraph);
    return output;
}

export async function updateParagraph(req: Request, res: Response) {
    try {
        const paragraph = req.body;
        const output = await processParagraph(paragraph);

        socket.nsp.emit('paragraphs-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}