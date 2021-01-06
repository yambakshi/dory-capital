import * as socketIo from 'socket.io';


class SocketIO {
    io: any;
    nsp: any;

    initSocket(server: any, path: string): void {
        this.io = socketIo(server, { path });
        this.io.on('connection', () => {
            console.log('Socket connection established');
        });
    }

    configNsp(nspName: string): void {
        this.nsp = this.io.of(nspName);
        this.nsp.on('connection', () => {
            console.log(`Socket connection established on namespace: ${nspName}`);
        })
    }
}

export const socket = new SocketIO();