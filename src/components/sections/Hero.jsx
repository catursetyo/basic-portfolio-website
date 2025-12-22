import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../layout/Container';
import { ArrowDown } from 'lucide-react';

const greetings = ["hello, i'm", "bonjour, i'm", "hola, i'm", "konnichiwa, i'm", "sugeng rawuh, i'm"];

export default function Hero() {
    const [displayText, setDisplayText] = useState('');
    const [greetingIndex, setGreetingIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [delta, setDelta] = useState(150);

    // Typewriter Effect Logic
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [displayText, isDeleting, greetingIndex, delta]);

    const tick = () => {
        let i = greetingIndex % greetings.length;
        let fullText = greetings[i];
        let updatedText = isDeleting
            ? fullText.substring(0, displayText.length - 1)
            : fullText.substring(0, displayText.length + 1);

        setDisplayText(updatedText);

        if (isDeleting) {
            setDelta(50);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(2000); // Wait before deleting
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setGreetingIndex(greetingIndex + 1);
            setDelta(150);
        } else if (!isDeleting && updatedText !== fullText) {
            setDelta(150);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9]
            }
        }
    };

    return (
        <section id="home" className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden bg-background">

            <Container className="relative z-10 pointer-events-none flex justify-center">
                <div className="max-w-5xl pointer-events-auto text-center flex flex-col items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-8 w-full"
                    >
                        <motion.div variants={itemVariants} className="h-20 md:h-28 lg:h-36 overflow-visible relative w-full flex justify-center items-end pb-4">
                            <h1
                                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-primary/80 lowercase"
                            >
                                {displayText}
                                <span className="text-secondary animate-pulse">|</span>
                            </h1>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-primary -mt-2 drop-shadow-lg uppercase"
                        >
                            CATUR SETYO RAGIL.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-3xl text-secondary max-w-3xl leading-relaxed mt-10 font-medium tracking-tight mx-auto lowercase"
                        >
                            an <strong className="text-primary font-bold">information technology student</strong> at <strong className="text-primary font-semibold">its</strong> focused on <span className="text-primary font-bold">data science</span> & <span className="text-primary font-bold">artificial intelligence</span>.
                        </motion.p>
                    </motion.div>
                </div>
            </Container>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <ArrowDown className="text-secondary w-6 h-6" />
                </motion.div>
            </motion.div>
        </section>
    );
}
