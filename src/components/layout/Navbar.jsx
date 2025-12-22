import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import useTheme from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-4' : 'bg-transparent py-6'
                }`}
        >
            <Container className="flex items-center justify-between">
                <a href="#" className="text-xl font-bold tracking-tight text-primary hover:text-secondary transition-colors">
                    caursty.
                </a>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
                        <a href="#" className="hover:text-primary transition-colors">about</a>
                        <a href="#projects" className="hover:text-primary transition-colors">projects</a>
                        <a href="#contact" className="hover:text-primary transition-colors">contact</a>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-surface border border-transparent hover:border-border transition-all text-primary"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </Container>
        </motion.nav>
    );
}
