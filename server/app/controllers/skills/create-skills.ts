import { Request, Response } from 'express';
import { insertSkills } from '../../services';
import { validateSkillsCreation } from '../../validation-schemas';
import { logger } from '../../../config/logger';


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
        logger.info({ message: "Received 'createSkills' request", label: 'createSkills' });
        const output = await processSkillsCreation(req.body.skills);
        res.send(output);
    } catch (error) {
        logger.error({ message: error.message, label: 'createSkills' });
        res.status(500).send({ success: false, message: error.message });
    }
}