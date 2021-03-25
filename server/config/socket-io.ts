import { Server } from 'socket.io';
import { logger } from './logger';
import { env } from './env';


class SocketIO {
    io: any;
    private nsp: any;
    private readonly eventName: string = 'page-data-changed';

    initSocket(server: any, path: string): void {
        this.io = new Server(server, {
            path,
            cors: {
                origin: env.cors.origin
            }
        });

        this.io.on('connection', () => {
            logger.info({ message: "Socket connection established", label: 'SocketIO' });
        });
    }

    configNsp(nspName: string): void {
        this.nsp = this.io.of(nspName);
        this.nsp.on('connection', socket => {
            logger.info({ message: `Socket connection established on namespace: '${nspName}'`, label: 'SocketIO' });

            socket.on(this.eventName, () => {
                logger.info({ message: `Recieved event: '${this.eventName}'`, label: 'SocketIO' });
                socket.broadcast.emit(this.eventName);
            })
        })
    }
}

export const socketIo = new SocketIO();