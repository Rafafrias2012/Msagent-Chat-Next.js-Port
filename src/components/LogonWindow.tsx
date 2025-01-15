'use client';

import { FormEvent, useState } from 'react';
import MSWindow from './MSWindow';
import styles from '@/styles/LogonWindow.module.css';

interface LogonWindowProps {
    onLogin: (username: string) => void;
}

export default function LogonWindow({ onLogin }: LogonWindowProps) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onLogin(username.trim());
        }
    };

    return (
        <MSWindow
            title="Log on to MSAgent Chat"
            width={500}
            height={275}
            startPosition="center"
        >
            <div className={styles.logonWindowLogo}>
                <h1>MSAgent Chat</h1>
            </div>
            <form onSubmit={handleSubmit} className={styles.logonForm}>
                <div>
                    <label htmlFor="username">User name:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log on</button>
            </form>
        </MSWindow>
    );
} 
