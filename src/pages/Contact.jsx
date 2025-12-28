import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const contacts = [
    { label: "EMAIL", value: "catursetyo26@gmail.com", href: "mailto:catursetyo26@gmail.com", external: false },
    { label: "LINKEDIN", value: "linkedin.com/in/catursetyo", href: "https://linkedin.com/in/catursetyo", external: true },
    { label: "GITHUB", value: "github.com/catursetyo", href: "https://github.com/catursetyo", external: true },
    { label: "INSTAGRAM", value: "@catur.styo", href: "https://instagram.com/catur.styo", external: true },
];

export default function Contact() {
    return (
        <motion.section
            id="contact"
            className="min-h-screen bg-background text-foreground border-x border-grid max-w-[1920px] mx-auto flex flex-col relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8 }}
        >
            <div className="border-b border-grid p-6 md:p-10 sticky top-16 md:top-20 bg-background z-20">
                <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter">Connect with me.</h1>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 md:px-10 py-4 border-b border-grid text-sm font-mono opacity-50 uppercase">
                    <div className="col-span-3">[PLATFORM]</div>
                    <div className="col-span-9">[HANDLE / LINK]</div>
                </div>

                {contacts.map((contact, idx) => (
                    <a
                        key={idx}
                        href={contact.href}
                        target={contact.external ? "_blank" : undefined}
                        rel={contact.external ? "noopener noreferrer" : undefined}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-10 py-8 md:py-12 border-b border-grid hover:bg-foreground hover:text-background transition-colors duration-200 items-baseline"
                    >
                        <div className="col-span-3 font-mono text-sm md:text-lg flex items-center gap-2">
                            {contact.label}
                        </div>
                        <div className="col-span-9 text-xl md:text-4xl font-bold uppercase tracking-tight flex justify-between items-center">
                            <span className="break-all">{contact.value}</span>
                            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:rotate-45" />
                        </div>
                    </a>
                ))}
            </div>

            <div className="p-6 md:p-10 font-mono text-xs md:text-sm opacity-50 uppercase text-center md:text-left mt-auto">
                [SYSTEM READY] • SENDING DATA...
            </div>
        </motion.section>
    );
}
