import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import passport from "passport";
import cookieParser from 'cookie-parser';
import { router } from './routes';


export function configApp(app, port, socket) {
    app.io = socket;
    app.use(compression({ threshold: 512 }));
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.set('port', port);
    app.use(router);
}