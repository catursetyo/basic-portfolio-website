import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
    const location = useLocation();

    const navLinks = [
        { name: 'work', path: '/projects' },
        { name: 'about', path: '/about' },
        { name: 'contact', path: 'mailto:catur@example.com' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-background border-b border-grid">
            <div className="flex justify-between items-stretch h-16 md:h-20">
                <Link to="/" className="flex items-center px-6 md:px-10 border-r border-grid font-bold text-xl md:text-2xl tracking-tighter hover:bg-foreground hover:text-background transition-colors duration-300">
                    caursty.
                </Link>

                <div className="flex items-stretch divide-x divide-grid border-l border-grid">
                    {navLinks.map((link) => (
                        link.path.startsWith('mailto') ? (
                            <a
                                key={link.name}
                                href={link.path}
                                className="flex items-center px-6 md:px-10 text-sm md:text-lg font-medium hover:bg-foreground hover:text-background transition-colors duration-300 uppercase"
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center px-6 md:px-10 text-sm md:text-lg font-medium hover:bg-foreground hover:text-background transition-colors duration-300 uppercase ${location.pathname === link.path ? 'bg-foreground text-background' : ''}`}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
}
