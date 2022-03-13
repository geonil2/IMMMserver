"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
class Socket {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: '*',
            },
        });
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }
            jsonwebtoken_1.default.verify(token, config_js_1.config.jwt.secretKey, (error, decoded) => {
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
let socket;
function initSocket(server) {
    if (!socket) {
        socket = new Socket(server);
    }
}
exports.initSocket = initSocket;
function getSocketIO() {
    if (!socket) {
        throw new Error('Please call init first');
    }
    return socket.io;
}
exports.getSocketIO = getSocketIO;
//# sourceMappingURL=socket.js.map