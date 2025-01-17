import { WebSocket } from 'ws';
import { EventEmitter } from 'events';
import { MSAgentProtocolMessage } from './protocol';

export class Client extends EventEmitter {
    username: string | null;
    socket: WebSocket;

    constructor(socket: WebSocket) {
        super();
        this.socket = socket;
        this.username = null;

        this.socket.on('message', (msg: Buffer, isBinary: boolean) => {
            if (isBinary) {
                this.socket.close();
                return;
            }
            this.parseMessage(msg.toString('utf-8'));
        });

        this.socket.on('error', () => {});
        this.socket.on('close', () => {
            this.emit('close');
        });
    }

    private parseMessage(msg: string) {
        try {
            const parsed = JSON.parse(msg) as MSAgentProtocolMessage;
            this.emit('message', parsed);
        } catch (error) {
            console.error('Failed to parse message:', error);
            this.socket.close();
        }
    }

    send(msg: MSAgentProtocolMessage) {
        this.socket.send(JSON.stringify(msg));
    }
} 
