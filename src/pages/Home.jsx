import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { posts } from '../data/posts';
import { featuredProject, projects } from '../data/projects';
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
const supportingProjects = projects.filter((project) => project.id !== featuredProject.id);

export default function Home({ onNavigate }) {
  const [views, setViews] = useState(null);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    getSiteViews().then(({ count }) => setViews(count));
  }, []);

  return (
    <section className="home-page">
      <div className="home-bg" aria-hidden="true">
        {!reducedMotion && (
          <video autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.webp" className="home-bg-media">
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>

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
                  <span>{social.label}</span>
                  <strong>/ {social.value}</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="home-section home-work">
          <p className="section-label">selected work</p>

          <article className="featured-work">
            <a
              className="featured-work-media soft-link"
              href={featuredProject.externalUrl || featuredProject.githubUrl || '/projects'}
              target={featuredProject.externalUrl || featuredProject.githubUrl ? '_blank' : undefined}
              rel={featuredProject.externalUrl || featuredProject.githubUrl ? 'noopener noreferrer' : undefined}
              onClick={(event) => {
                if (!featuredProject.externalUrl && !featuredProject.githubUrl) {
                  handleInternalLink(event, '/projects', onNavigate);
                }
              }}
            >
              <img src={featuredProject.img} alt={`${featuredProject.name} interface`} loading="lazy" />
            </a>
            <div className="featured-work-copy">
              <p className="work-meta">featured / {featuredProject.year}</p>
              <h2>{featuredProject.name}</h2>
              <p>{featuredProject.longDescription}</p>
              <ul className="tech-list" aria-label={`${featuredProject.name} technologies`}>
                {featuredProject.techStack.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}
              </ul>
              <a
                className="work-action soft-link"
                href={featuredProject.githubUrl || featuredProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                inspect project <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </article>

          <div className="work-grid">
            {supportingProjects.map((project) => {
              const href = project.externalUrl || project.githubUrl || '/projects';
              const external = Boolean(project.externalUrl || project.githubUrl);

              return (
                <article key={project.id} className="work-card">
                  <img src={project.img} alt={`${project.name} interface`} loading="lazy" />
                  <div>
                    <p className="work-meta">{project.year} / {project.category}</p>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a
                      className="work-action soft-link"
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      onClick={(event) => {
                        if (!external) handleInternalLink(event, href, onNavigate);
                      }}
                    >
                      open <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <a
            className="portfolio-link soft-link"
            href="/projects"
            onClick={(event) => handleInternalLink(event, '/projects', onNavigate)}
          >
            view the full project archive <ArrowUpRight aria-hidden="true" />
          </a>
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
    </section>
  );
}

function handleInternalLink(event, href, onNavigate) {
  if (!href.startsWith('/') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(href);
}
