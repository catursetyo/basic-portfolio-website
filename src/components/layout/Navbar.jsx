
import { Home } from 'lucide-react';

const navLinks = [
  { name: 'portfolio', path: '/projects' },
  { name: 'blog', path: '/blog' },
  { name: 'resume', path: '/resume' },
];

export default function Navbar({ activePath, onNavigate }) {
  return (
    <nav className="fixed left-4 right-4 top-4 z-50 flex items-center gap-3 md:left-8 md:right-auto">
      <a
        href="/"
        aria-label="Home"
        onClick={(event) => handleNav(event, '/', onNavigate)}
        className="glass nav-button soft-link inline-flex h-11 w-11 items-center justify-center"
      >
        <Home className="h-4 w-4" />
      </a>

      <div className="glass flex max-w-[calc(100vw-84px)] items-center gap-1 overflow-x-auto rounded-xl p-1">
        {navLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            onClick={(event) => handleNav(event, link.path, onNavigate)}
            className={`nav-button meta soft-link whitespace-nowrap ${activePath === link.path ? 'active' : ''}`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}

function handleNav(event, path, onNavigate) {
  event.preventDefault();
  onNavigate(path);
}
