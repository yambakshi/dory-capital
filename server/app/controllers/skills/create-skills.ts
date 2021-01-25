import { Request, Response } from 'express';
import { insertSkills } from '../../services';
import { socket } from '../../../config/socket';
import { validateSkillsCreation } from '../../validation-schemas';


async function processSkillsCreation(skills: any) {
    const validationErrors = validateSkillsCreation(skills);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): create-skills ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = insertSkills(skills);
    return output;
}

export async function createSkills(req: Request, res: Response) {
    try {
        const output = await processSkillsCreation(req.body.skills);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}