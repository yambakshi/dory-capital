import { Request, Response } from 'express';


export async function logout(req: Request, res: Response) {
    try {
        res.send({ success: true, message: "User successfully logged out" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}