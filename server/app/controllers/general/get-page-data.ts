import { Request, Response } from 'express';
import { queryPageData } from '../../services';


export async function getPageData(req: Request, res: Response) {
    try {
        const pageData = await queryPageData();
        res.send(pageData);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}