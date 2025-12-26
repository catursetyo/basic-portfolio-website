

export default function Navbar() {
    const navLinks = [
        { name: 'work', href: '#projects' },
        { name: 'about', href: '#about' },
        { name: 'contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-background border-b border-grid">
            <div className="flex justify-between items-stretch h-16 md:h-20">
                <a href="#home" className="flex items-center px-6 md:px-10 border-r border-grid font-bold text-xl md:text-2xl tracking-tighter hover:bg-foreground hover:text-background transition-colors duration-300">
                    caursty.
                </a>

                <div className="flex items-stretch divide-x divide-grid border-l border-grid">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="flex items-center px-6 md:px-10 text-sm md:text-lg font-medium hover:bg-foreground hover:text-background transition-colors duration-300 uppercase"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
