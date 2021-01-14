import { Request, Response } from 'express';


export async function logout(req: Request, res: Response) {
    try {
        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}