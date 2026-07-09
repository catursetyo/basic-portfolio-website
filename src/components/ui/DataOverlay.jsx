import { useEffect, useState } from 'react';

export default function DataOverlay() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="pointer-events-none fixed bottom-5 right-5 z-40 hidden text-right md:block">
            <div className="meta">surabaya, id</div>
            <div className="meta">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    )
}
