import { Request, Response } from 'express';
import { queryPageContent } from '../../services';


export async function getPageContent(req: Request, res: Response) {
    try {
        const pageContent = await queryPageContent();
        res.send(pageContent[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}