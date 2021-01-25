import { Request, Response } from 'express';
import { updateText } from '../../services';
import { socket } from '../../../config/socket';
import { validateParagraphUpdate } from '../../validation-schemas';


async function processParagraphUpdate(paragraphUpdate) {
    // const validationErrors = validateParagraphUpdate(paragraphUpdate);
    // if (validationErrors) {
    //     const firstErr = validationErrors[0];
    //     throw new Error(`Invalid request(${firstErr.keyword}): update-paragraph ${firstErr.dataPath} ${firstErr.message}`);
    // }

    const output = updateText(paragraphUpdate);
    return output;
}

export async function updateParagraph(req: Request, res: Response) {
    try {
        const output = await processParagraphUpdate(req.body);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}