import { Request, Response } from 'express';
import { createSkills } from '../../services';
import { socket } from '../../../config/socket';
import { validateSkillsAddition } from '../../validation-schemas';


async function processSkills(skills: any) {
    const validationErrors = validateSkillsAddition(skills);
    if (validationErrors) {
        const firstErr = validationErrors[0];
        throw new Error(`Invalid request(${firstErr.keyword}): add-skills ${firstErr.dataPath} ${firstErr.message}`);
    }

    const output = createSkills(skills);
    return output;
}

export async function addSkills(req: Request, res: Response) {
    try {
        const output = await processSkills(req.body.skills);
        socket.nsp.emit('page-content-changed');
        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}