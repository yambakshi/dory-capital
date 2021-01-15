import { Request, Response } from 'express';
import { queryParagraphsByIds } from '../../services';


async function processId(paragraphsId: string) {
    const paragraphs = await queryParagraphsByIds([paragraphsId]);
    return Promise.resolve(paragraphs[0]);
}

export async function getParagraphs(req: Request, res: Response) {
    try {
        const paragraphsIds = req.body.id;
        const paragraphs = await processId(paragraphsIds);
        res.send(paragraphs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}