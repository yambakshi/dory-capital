import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
    socket;
    readonly uri: string = `${environment.apiUrl}/paragraphs`;
    readonly path: string = '/page-content/socket.io';
    constructor() { }

    connect() {
        this.socket = io(this.uri, { path: this.path });
    }

    listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data);
            })
        })
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}