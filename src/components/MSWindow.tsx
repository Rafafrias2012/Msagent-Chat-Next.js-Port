'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/MSWindow.module.css';

export interface MSWindowProps {
    title: string;
    width: number;
    height: number;
    hasClose?: boolean;
    children: React.ReactNode;
    onClose?: () => void;
    startPosition?: 'center' | 'topLeft';
}

export default function MSWindow({
    title,
    width,
    height,
    hasClose = false,
    children,
    onClose,
    startPosition = 'center'
}: MSWindowProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (startPosition === 'center' && windowRef.current) {
            const x = (window.innerWidth / 2) - (width / 2);
            const y = (window.innerHeight / 2) - (height / 2);
            setPosition({ x, y });
        }
    }, [width, height, startPosition]);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        
        setPosition(prev => ({
            x: Math.max(0, Math.min(prev.x + e.movementX, window.innerWidth - width)),
            y: Math.max(0, Math.min(prev.y + e.movementY, window.innerHeight - height))
        }));
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div 
            ref={windowRef}
            className={styles.msWindow}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div 
                className={styles.msWindowTitlebar}
                onMouseDown={handleMouseDown}
            >
                {title}
                {hasClose && (
                    <button onClick={onClose}>×</button>
                )}
            </div>
            <div className={styles.msWindowBody}>
                {children}
            </div>
        </div>
    );
} 
