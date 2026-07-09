import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
    const [text, setText] = useState('');
    const fullText = 'caur.';

    useEffect(() => {
        // Typing effect
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 90);

        const timer = setTimeout(() => {
            onComplete();
        }, 900);

        return () => {
            clearInterval(typingInterval);
            clearTimeout(timer);
        }
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] flex cursor-none items-center justify-center bg-background text-foreground pointer-events-auto">
            <h1 className="text-5xl font-bold md:text-8xl">
                {text}
            </h1>

            <div className="meta absolute bottom-8 left-8">
                loading archive
            </div>
        </div>
    );
}
