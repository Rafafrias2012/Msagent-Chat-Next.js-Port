import { 
    MSAgentProtocolMessage, 
    MSAgentProtocolMessageType,
    MSAgentJoinMessage,
    MSAgentTalkMessage 
} from './protocol';

export class WebSocketClient {
    private ws: WebSocket | null = null;
    private messageHandlers: ((msg: MSAgentProtocolMessage) => void)[] = [];

    connect(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(url);
            this.ws.onopen = () => resolve();
            this.ws.onerror = (error) => reject(error);
            this.ws.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data) as MSAgentProtocolMessage;
                    this.messageHandlers.forEach(handler => handler(msg));
                } catch (error) {
                    console.error('Failed to parse message:', error);
                }
            };
        });
    }

    onMessage(handler: (msg: MSAgentProtocolMessage) => void) {
        this.messageHandlers.push(handler);
    }

    join(username: string) {
        const msg: MSAgentJoinMessage = {
            op: MSAgentProtocolMessageType.Join,
            data: { username }
        };
        this.send(msg);
    }

    sendMessage(message: string) {
        const msg: MSAgentTalkMessage = {
            op: MSAgentProtocolMessageType.Talk,
            data: { msg: message }
        };
        this.send(msg);
    }

    private send(msg: MSAgentProtocolMessage) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(msg));
        }
    }

    close() {
        this.ws?.close();
    }
} 
