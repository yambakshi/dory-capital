import { Server } from 'socket.io';
import { logger } from './logger';


class SocketIO {
    io: any;
    nsp: any;

    initSocket(server: any, path: string): void {
        this.io = new Server(server, {
            path,
            cors: {
                origin: "http://localhost:4200"
            }
        });

        this.io.on('connection', () => {
            logger.info({ message: "Socket connection established", label: 'SocketIO' });
        });
    }

    configNsp(nspName: string): void {
        this.nsp = this.io.of(nspName);
        this.nsp.on('connection', () => {
            logger.info({ message: `Socket connection established on namespace: ${nspName}`, label: 'SocketIO' });
        })
    }
}

export const socket = new SocketIO();