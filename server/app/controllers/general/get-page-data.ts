import { Request, Response } from 'express';
import { logger } from '../../../config/logger';
import { queryPageData } from '../../services';


export async function getPageData(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'getPageData' request", label: 'getPageData' });
        const pageData = await queryPageData();
        res.send(pageData);
    } catch (error) {
        logger.error({ message: error.message, label: 'getPageData' });
        res.status(500).send({ success: false, message: error.message });
    }
}