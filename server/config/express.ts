import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import { router } from './routes'


export function configApp(app, port) {
    app.use(compression({ threshold: 512 }));
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set('port', port)
    app.use(router);
}