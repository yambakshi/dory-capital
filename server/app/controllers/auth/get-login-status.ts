import { Request, Response } from 'express';
import { logger } from '../../../config/logger';


export async function getLoginStatus(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'getLoginStatus' request", label: 'getLoginStatus' });
        res.send({ status: true, message: "User is logged in" });
    } catch (error) {
        logger.error({ message: error.message, label: 'getLoginStatus' });
        res.status(500).send({ success: false, message: error.message });
    }
}