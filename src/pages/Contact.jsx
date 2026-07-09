import { ArrowUpRight } from 'lucide-react';
import { socials } from '../data/socials';

export default function Contact() {
  return (
    <section className="page-shell">
      <p className="meta">contact</p>
      <h1 className="page-title mt-4">Let's connect.</h1>
      <div className="mt-12 grid gap-4">
        {socials.map((social) => (
          <a
            key={social.label}
            className="glass content-card soft-link flex items-center justify-between gap-6"
            href={social.href}
            target={social.href.startsWith('http') ? '_blank' : undefined}
            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <span className="meta">{social.label}</span>
            <span className="muted break-all text-right">{social.value}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        ))}
      </div>
    </section>
  );
}
