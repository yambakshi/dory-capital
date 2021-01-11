import * as pkg from '../package.json';
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import expressSession from "express-session";
import passport from "passport";
import cookieParser from 'cookie-parser';
import { router, authenticatedRouter } from './routes';


export function configApp(app, port, socket) {
    app.io = socket;
    app.use(compression({ threshold: 512 }));
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(expressSession({
        secret: pkg.name,
        resave: false,
        saveUninitialized: false,
        maxAge: new Date(Date.now() + 3600000),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, payload) => {
            if (user)
                req.user = user;
            next();
        })(req, res)
    })

    app.set('port', port)
    app.use(router);
    // app.use('/admin', passport.authenticate('jwt', { session: false }), authenticatedRouter);
}