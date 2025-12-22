import { motion } from 'framer-motion';
import Container from '../layout/Container';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';

const contactLinks = [
    {
        name: 'email',
        value: 'catur@example.com',
        href: 'mailto:catur@example.com',
        icon: Mail
    },
    {
        name: 'linkedin',
        value: 'linkedin.com/in/catur',
        href: 'https://linkedin.com',
        icon: Linkedin
    },
    {
        name: 'github',
        value: 'github.com/catur',
        href: 'https://github.com',
        icon: Github
    }
];

export default function Contact() {
    return (
        <section id="contact" className="py-24 md:py-32 bg-background transition-colors duration-300">
            <Container>
                <div className="max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 text-primary"
                    >
                        connect with me.
                    </motion.h2>

                    <div className="space-y-6">
                        {contactLinks.map((link, idx) => (
                            <motion.a
                                key={idx}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                                className="group flex items-center justify-between p-6 border border-border hover:bg-surface transition-colors duration-300 bg-background"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-surface group-hover:bg-background transition-colors border border-border rounded-sm">
                                        <link.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-secondary text-sm font-medium">{link.name}</p>
                                        <p className="text-primary text-lg font-medium">{link.value}</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-6 h-6 text-secondary group-hover:translate-x-2 transition-transform duration-300" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
