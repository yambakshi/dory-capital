import { Request, Response } from 'express';
import { logger } from '../../../config/logger';
import { querySkills } from '../../services';


export async function getSkills(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'getSkills' request", label: 'getSkills' });
        const skills = await querySkills([]);
        res.send(skills);
    } catch (error) {
        logger.error({ message: error.message, label: 'getSkills' });
        res.status(500).send({ success: false, message: error.message });
    }
}