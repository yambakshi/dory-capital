import { Request, Response } from 'express';
import { logger } from '../../../config/logger';


export async function logout(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'logout' request", label: 'logout' });
        res.send({ success: true, message: "User successfully logged out" });
    } catch (error) {
        logger.error({ message: error.message, label: 'logout' });
        res.status(500).send({ success: false, message: error.message });
    }
}