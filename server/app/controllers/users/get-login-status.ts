import { Request, Response } from 'express';


export async function getLoginStatus(req: Request, res: Response) {
    try {
        res.send(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}