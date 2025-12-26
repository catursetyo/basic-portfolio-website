import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

export default function DataOverlay() {
    const [time, setTime] = useState(Date.now());
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 100);

        const handleMouseMove = (e) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            clearInterval(interval);
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-40 pointer-events-none font-mono text-[10px] md:text-xs text-grid flex flex-col gap-1 mix-blend-difference">
            <div>XY: {String(mouse.x).padStart(4, '0')} / {String(mouse.y).padStart(4, '0')}</div>
            <div>TS: {time}</div>
            <div>LOC: SURABAYA, ID</div>
        </div>
    )
}
