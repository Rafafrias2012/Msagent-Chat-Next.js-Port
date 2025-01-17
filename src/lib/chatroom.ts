import { Client } from './client';
import { MSAgentProtocolMessageType } from './protocol';

export class MSAgentChatRoom {
    private clients: Client[] = [];

    addClient(client: Client) {
        this.clients.push(client);

        client.on('message', (msg) => {
            switch (msg.op) {
                case MSAgentProtocolMessageType.Join:
                    client.username = msg.data.username;
                    this.broadcast({
                        op: MSAgentProtocolMessageType.AddUser,
                        data: { username: msg.data.username }
                    });
                    break;
                case MSAgentProtocolMessageType.Talk:
                    if (client.username) {
                        this.broadcast({
                            op: MSAgentProtocolMessageType.Message,
                            data: { username: client.username, msg: msg.data.msg }
                        });
                    }
                    break;
            }
        });

        client.on('close', () => {
            const index = this.clients.indexOf(client);
            if (index !== -1) {
                this.clients.splice(index, 1);
                if (client.username) {
                    this.broadcast({
                        op: MSAgentProtocolMessageType.RemoveUser,
                        data: { username: client.username }
                    });
                }
            }
        });
    }

    private broadcast(msg: any) {
        const message = JSON.stringify(msg);
        this.clients.forEach(client => {
            client.socket.send(message);
        });
    }
} 
