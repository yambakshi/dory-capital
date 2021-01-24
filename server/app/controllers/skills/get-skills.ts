import { Request, Response } from 'express';
import { querySkills } from '../../services';


export async function getSkills(req: Request, res: Response) {
    try {
        const skills = await querySkills([]);
        res.send(skills);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}