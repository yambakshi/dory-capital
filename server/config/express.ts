import cors from "cors";
import compression from "compression";
import passport from "passport";
import cookieParser from 'cookie-parser';
import { json, urlencoded } from "body-parser";
import { router, authRouter } from './routes';
import { authMiddleware } from "./middlewares";


export function configApp(app, port, socket) {
    app.io = socket;
    app.use(compression({ threshold: 512 }));
    app.use(cors({ origin: '*' }));
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.set('port', port);
    app.use(router);
    app.use(authMiddleware, authRouter);
}