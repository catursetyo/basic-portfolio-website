import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { posts } from '../data/posts';
import { projects } from '../data/projects';
import { socials } from '../data/socials';
import { getSiteViews } from '../lib/viewCounter';
import Guestbook from './Guestbook';

const menu = [
  ['01', 'about me', '#about'],
  ['02', 'portfolio', '#work'],
  ['03', 'blog', '/blog'],
  ['04', 'guestbook', '#guestbook'],
];

export default function Home({ startAnimation = true, onNavigate }) {
  const [views, setViews] = useState(null);

  useEffect(() => {
    getSiteViews().then(({ count }) => setViews(count));
  }, []);

  return (
    <section className="home-page">
      <div className="home-bg" />

      <section className={`home-hero ${startAnimation ? 'opacity-100' : 'opacity-0'}`}>
        <div className="home-hero-copy">
          <h1 className="home-logo">caursty</h1>
          <p className="meta mt-4">data scientist · ai engineer · backend developer</p>

          <nav className="home-menu" aria-label="Home sections">
            {menu.map(([number, label, href]) => (
              <a
                key={href}
                className="home-menu-link soft-link"
                href={href}
                onClick={(event) => {
                  if (href.startsWith('/')) {
                    event.preventDefault();
                    onNavigate(href);
                  }
                }}
              >
                <span>{number}</span>
                <strong>{label}</strong>
              </a>
            ))}
          </nav>
          <p className="meta mt-5">scroll to explore</p>
        </div>

        <p className="home-counter meta">{views ? `${views.toLocaleString()} visits / v1` : '-- visits / v1'}</p>
      </section>

      <div className="home-scroll">
        <section id="about" className="home-section home-two-col">
          <div>
            <p className="section-label">about me</p>
            <div className="about-lockup">
              <img className="h-20 w-20 rounded-full object-cover" src="/profile.png" alt="Catur Setyo Ragil" />
              <div>
                <p className="muted text-xl">hey, i'm</p>
                <h2 className="text-5xl font-bold leading-none">caur.</h2>
              </div>
            </div>
            <p className="muted mt-7 max-w-2xl text-lg leading-8">
              I build practical data, AI, and backend systems as an Information Technology student at Institut Teknologi
              Sepuluh Nopember.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Python', 'FastAPI', 'React', 'PostgreSQL', 'Machine Learning', 'Tailwind'].map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="section-label">find me at</p>
            <div className="social-list">
              {socials.map((social) => (
                <a key={social.label} className="soft-link social-row" href={social.href}>
                  <span className="meta">{social.label}</span>
                  <span className="muted">/ {social.value}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="home-section">
          <p className="section-label">my work</p>
          <div className="work-grid">
            {projects.map((project) => (
              <article key={project.id} className="work-card">
                <p className="meta">{project.year} / {project.category}</p>
                <h3 className="mt-3 text-xl font-semibold">{project.name}</h3>
                <p className="muted mt-3 leading-7">{project.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="chip">{project.techStack[0]}</span>
                  <a
                    className="soft-link inline-flex items-center gap-2 text-sm font-semibold"
                    href={project.externalUrl || project.githubUrl || '/projects'}
                    target={project.externalUrl || project.githubUrl ? '_blank' : undefined}
                    rel={project.externalUrl || project.githubUrl ? 'noopener noreferrer' : undefined}
                  >
                    open <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="muted mt-5 text-sm">
            also check the full <a className="soft-link underline" href="/projects" onClick={(event) => {
              event.preventDefault();
              onNavigate('/projects');
            }}>portfolio</a>
          </p>
        </section>

        <section id="guestbook" className="home-section home-two-col home-bottom">
          <Guestbook embedded />

          {posts.length > 0 && (
            <aside>
              <p className="section-label">recent posts</p>
              <div className="post-list">
                {posts.slice(0, 4).map((post) => (
                <a
                  key={post.slug}
                  className="soft-link post-row"
                  href={`/blog/${post.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(`/blog/${post.slug}`);
                  }}
                >
                  <span>
                    <strong>{post.title}</strong>
                    <small className="muted">{post.tags.join(' · ')}</small>
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                ))}
              </div>
            </aside>
          )}
        </section>

        <footer className="home-footer meta">
          <span>surabaya</span>
          <span>·</span>
          <span>web portfolio</span>
          <span>·</span>
          <span>v1</span>
        </footer>
      </div>
    </section>
  );
}
