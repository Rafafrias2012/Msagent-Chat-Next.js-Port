'use client';

import { useState } from 'react';
import LogonWindow from '@/components/LogonWindow';
import ChatView from '@/components/ChatView';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (username: string) => {
        setUsername(username);
        setIsLoggedIn(true);
    };

    return (
        <main>
            {!isLoggedIn ? (
                <LogonWindow onLogin={handleLogin} />
            ) : (
                <ChatView username={username} />
            )}
        </main>
    );
} 
