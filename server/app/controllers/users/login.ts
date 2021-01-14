import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../../config';


export async function login(req: Request, res: Response) {
    try {
        const _id = (req.user as any)._id;
        const payload = { _id };

        const jwtOptions = {
            audience: env.jwt.audience,
            issuer: env.jwt.issuer,
            expiresIn: env.jwt.expiresIn
        };

        const token = jwt.sign(payload, env.jwt.secret, jwtOptions);
        res.send({ success: true, user: _id, token });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}