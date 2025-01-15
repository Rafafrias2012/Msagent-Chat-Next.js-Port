'use client';

import { useState, FormEvent } from 'react';
import styles from '@/styles/ChatView.module.css';

interface ChatViewProps {
    username: string;
}

export default function ChatView({ username }: ChatViewProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            // TODO: Send message via WebSocket
            setMessage('');
        }
    };

    return (
        <div className={styles.chatView}>
            <div className={styles.chatMessages}>
                {/* Messages will be displayed here */}
            </div>
            <form onSubmit={handleSubmit} className={styles.chatBar}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
} 
