import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section className="page-shell archive-page">
      <p className="meta">portfolio</p>
      <h1 className="page-title mt-4">Selected work</h1>
      <p className="muted mt-5 max-w-2xl leading-8">
        A small archive of database, AI-adjacent, backend, and frontend projects. Screenshots stay visible because the
        work should be inspectable, not hidden behind decoration.
      </p>

      <div className="project-list">
        {projects.map((project, index) => (
          <article key={project.id} className="project-row">
            <img
              className="project-image"
              src={project.img}
              alt={`${project.name} screenshot`}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            <div className="project-copy">
              <div className="flex flex-wrap items-center gap-3">
                <span className="meta">{project.year}</span>
                <span className="chip">{project.category}</span>
                {project.status && <span className="chip">{project.status}</span>}
              </div>
              <h2 className="mt-5 text-3xl font-semibold">{project.name}</h2>
              <p className="muted mt-3 leading-7">{project.longDescription}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="chip">{tech}</span>
                ))}
              </div>
              <a
                className="soft-link mt-6 inline-flex items-center gap-2 font-semibold"
                href={project.externalUrl || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.externalUrl ? 'view live' : 'view repository'} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
