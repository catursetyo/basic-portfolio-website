import { useEffect, useState } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { posts } from '../data/posts';
import { projects } from '../data/projects';
import { socials } from '../data/socials';
import { getSiteViews } from '../lib/viewCounter';
import Guestbook from './Guestbook';

const menu = [
  ['about me', '#about'],
  ['projects', '/projects'],
  ['blog', '/blog'],
  ['others', '#guestbook'],
];

const skills = ['Python', 'FastAPI', 'PostgreSQL', 'Machine Learning', 'React', 'Tailwind'];
const languageColors = {
  Python: '#3572a5',
  'Next.js': '#f1f1f1',
  React: '#61dafb',
};

export default function Home({ onNavigate }) {
  const [views, setViews] = useState(null);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    getSiteViews().then(({ count }) => setViews(count));
  }, []);

  return (
    <section className="home-page" onPointerMove={handlePageSway} onPointerLeave={resetPageSway}>
      <div className="home-bg" aria-hidden="true">
        {!reducedMotion && (
          <video autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.webp" className="home-bg-media">
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div className="home-content">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-overline">Catur Setyo Ragil <span>/ portfolio 2026</span></p>
          <h1 id="home-title" className="home-logo">caursty<span>.</span></h1>
          <p className="home-role">IT student · backend developer · data &amp; AI builder</p>

          <nav className="home-menu" aria-label="Home sections">
            {menu.map(([label, href], index) => (
              <a
                key={href}
                className="home-menu-link soft-link"
                href={href}
                onClick={(event) => handleInternalLink(event, href, onNavigate)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
              </a>
            ))}
          </nav>
          <p className="home-scroll-note">scroll to explore</p>
        </div>

        <div className="home-hero-meta">
          <p>based in surabaya, indonesia</p>
          <p>{views !== null ? `${views.toLocaleString()} visits` : 'independent archive'} <span>/ v1</span></p>
        </div>
      </section>

      <div className="home-scroll">
        <section id="about" className="home-section home-two-col home-about">
          <div>
            <p className="section-label">about me</p>
            <div className="about-lockup">
              <img src="/profile.png" alt="Catur Setyo Ragil" width="80" height="80" loading="lazy" />
              <div>
                <p className="about-intro">hey, i'm</p>
                <h2>caur.</h2>
              </div>
            </div>
            <p className="about-copy">
              I build practical backend, data, and AI systems while studying Information Technology at Institut
              Teknologi Sepuluh Nopember.
            </p>
            <ul className="tech-list" aria-label="Core tools">
              {skills.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div>
            <p className="section-label">find me at</p>
            <div className="social-list">
              {socials.map((social) => (
                <a
                  key={social.label}
                  className="soft-link social-row"
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="social-label">{social.label}</span>
                  <span className="social-slash" aria-hidden="true">/</span>
                  <strong>{social.value}</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="home-section home-work">
          <p className="section-label">my work</p>

          <div className="repo-grid">
            {projects.map((project) => {
              const href = project.externalUrl || project.githubUrl || '/projects';
              const external = Boolean(project.externalUrl || project.githubUrl);

              return (
                <a
                  key={project.id}
                  className="repo-card soft-link"
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  onClick={(event) => {
                    if (!external) handleInternalLink(event, href, onNavigate);
                  }}
                  style={{ '--repo-language': languageColors[project.techStack[0]] || 'var(--accent)' }}
                >
                  <div className="repo-card-header">
                    <BookOpen aria-hidden="true" />
                    <span>catursetyo</span>
                    <span className="repo-slash" aria-hidden="true">/</span>
                    <strong>{project.id}</strong>
                  </div>
                  <p>{project.description}</p>
                  <footer>
                    <span aria-hidden="true" />
                    {project.techStack[0]}
                  </footer>
                </a>
              );
            })}
          </div>

          <p className="repo-note">
            also check the full{' '}
            <a className="soft-link" href="/projects" onClick={(event) => handleInternalLink(event, '/projects', onNavigate)}>
              project archive
            </a>
          </p>
        </section>

        <section id="guestbook" className={`home-section home-bottom ${posts.length ? 'home-two-col' : ''}`}>
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
                    onClick={(event) => handleInternalLink(event, `/blog/${post.slug}`, onNavigate)}
                  >
                    <span>
                      <strong>{post.title}</strong>
                      <small>{post.tags.join(' · ')}</small>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </aside>
          )}
        </section>

        <footer className="home-footer">
          <span>Catur Setyo Ragil</span>
          <span>Surabaya, ID</span>
          <span>© 2026</span>
        </footer>
      </div>
      </div>
    </section>
  );
}

function handleInternalLink(event, href, onNavigate) {
  if (!href.startsWith('/') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(href);
}

function handlePageSway(event) {
  if (event.pointerType !== 'mouse') return;

  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  event.currentTarget.style.setProperty(
    '--page-sway-transform',
    `translate3d(${x * 16}px, ${y * 12}px, 0) rotate(${x * 0.14}deg)`,
  );
}

function resetPageSway(event) {
  event.currentTarget.style.removeProperty('--page-sway-transform');
}
