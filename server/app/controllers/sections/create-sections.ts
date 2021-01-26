import { Request, Response } from 'express';
import { insertSections } from '../../services';
import { socket } from '../../../config/socket';
import { validateSectionsCreation } from '../../validation-schemas';


async function processSectionCreation(sections: any[]) {
    // const validationErrors = validateSectionsCreation(sections);
    // if (validationErrors) {
    //     const firstErr = validationErrors[0];
    //     throw new Error(`Invalid request(${firstErr.keyword}): create-sections ${firstErr.dataPath} ${firstErr.message}`);
    // }

    const output = insertSections(sections);
    return output;
}

export async function createSections(req: Request, res: Response) {
    try {
        const output = await processSectionCreation(req.body.sections);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}