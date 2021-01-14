import { Request, Response } from 'express';


export async function getLoginStatus(req: Request, res: Response) {
    try {
        res.send({ status: true, message: "User is logged in" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}