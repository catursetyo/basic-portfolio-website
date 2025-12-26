import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [show, setShow] = useState(true);
    const [text, setText] = useState('');
    const fullText = 'hi!';

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
        }, 200);

        // Fade out/Slide up after delay
        const timer = setTimeout(() => {
            setShow(false);
        }, 2500);

        return () => {
            clearInterval(typingInterval);
            clearTimeout(timer);
        }
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[100] bg-background flex items-center justify-center text-foreground cursor-none"
                >
                    <motion.h1
                        className="text-6xl md:text-9xl font-bold tracking-tighter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {text}
                    </motion.h1>

                    {/* Optional: Coordinates decoration inside preloader too */}
                    <div className="absolute bottom-10 left-10 font-mono text-xs opacity-50">
                        INITIALIZING SEQUENCE...
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
