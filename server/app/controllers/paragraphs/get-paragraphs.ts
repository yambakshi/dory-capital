import { Request, Response } from 'express';
import { queryParagraphsByIds } from '../../services';


async function processIds(paragraphsIds: string[]) {
    const rawParagraphs = await queryParagraphsByIds(paragraphsIds);
    const paragraphs = {};
    rawParagraphs.forEach(({ _id, text, name, section }) => {
        if (!paragraphs[section])
            paragraphs[section] = {};

        paragraphs[section][name] = { _id: _id.toString(), text };
    });

    return Promise.resolve(paragraphs);
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