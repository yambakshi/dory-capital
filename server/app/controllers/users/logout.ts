import { Request, Response } from 'express';
import { env } from '../../../config';


export async function logout(req: Request, res: Response) {
    try {
        const jwtKey = `${env.cookiesPrefix}token`;
        if (req.cookies[jwtKey]) {
            res
                .clearCookie(jwtKey)
                .status(200)
                .json({ message: 'You have logged out' });
        } else {
            res.status(401).json({ error: 'Invalid jwt' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}