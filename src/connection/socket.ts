import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class Socket {
    io: Server<DefaultEventsMap, any>;
    constructor(server: any) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
            },
        });

        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }
            jwt.verify(token, config.jwt.secretKey, (error: any, decoded: any) => {
                if (error) {
                    return next(new Error('Authentication error'));
                }
                next();
            });
        });
    
        this.io.on('connection', (socket) => {
            console.log('Socket client connected');
        });
    }
}

let socket: Socket;
export function initSocket(server: any) {
    if (!socket) {
        socket = new Socket(server);
    }
}
export function getSocketIO() {
    if (!socket) {
        throw new Error('Please call init first');
    }
    return socket.io;
}