import { Request, Response } from 'express';
import { queryParagraphsByIds } from '../../services';


async function processIds(paragraphsIds: string[]) {
    const paragraphs = await queryParagraphsByIds(paragraphsIds);
    return Promise.resolve(paragraphs[0]);
}

export async function getParagraphs(req: Request, res: Response) {
    try {
        const paragraphsIds = req.body.ids || [];
        const paragraphs = await processIds(paragraphsIds);
        res.send(paragraphs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}