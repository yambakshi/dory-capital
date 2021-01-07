import * as express from "express";
import * as http from "http";
import { configApp, socket } from './config';
import { mongoDb } from './app/dal';


const port = 3000;
const app = express();
const server = http.createServer(app);
socket.initSocket(server, '/page-content/socket.io');
socket.configNsp('/paragraphs');

configApp(app, port, socket.io);

mongoDb.connect().then(() => {
    server.listen(port);
    server.on("error", onError);
    server.on('listening', onListening);
}).catch(error => console.error(error));

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}