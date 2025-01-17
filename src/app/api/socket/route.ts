import type { WebSocket } from 'ws';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { MSAgentChatRoom } from '@/lib/chatroom';
import { Client } from '@/lib/client';

const wss = new (require('ws').WebSocketServer)({ noServer: true });
const chatRoom = new MSAgentChatRoom();

wss.on('connection', (ws: WebSocket) => {
    const client = new Client(ws);
    chatRoom.addClient(client);
});

export function GET(req: NextRequest) {
    if (!req.headers.get('upgrade')?.includes('websocket')) {
        return new NextResponse('Expected Websocket', { status: 400 });
    }

    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
        wss.emit('connection', ws, req);
    });

    return new NextResponse(null);
} 
