import { useEffect, useState } from 'react';
import { Home } from 'lucide-react';
import { posts } from '../../data/posts';

const navLinks = [
  { name: 'portfolio', path: '/projects' },
  ...(posts.length ? [{ name: 'blog', path: '/blog' }] : []),
  { name: 'resume', path: '/resume' },
];

export default function Navbar({ activePath, onNavigate }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > window.innerHeight * 0.72);

  useEffect(() => {
    if (activePath !== '/') return undefined;

    const update = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [activePath]);

  const visible = activePath !== '/' || scrolled;

  return (
    <nav className={`site-nav ${visible ? 'site-nav--visible' : ''}`} aria-label="Primary navigation">
      <a
        href="/"
        aria-label="Home"
        onClick={(event) => handleNav(event, '/', onNavigate)}
        className="site-nav-home soft-link"
      >
        <Home className="h-4 w-4" />
      </a>

      <div className="site-nav-links">
        {navLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            onClick={(event) => handleNav(event, link.path, onNavigate)}
            className={`site-nav-link soft-link ${activePath.startsWith(link.path) ? 'active' : ''}`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}

function handleNav(event, path, onNavigate) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}
