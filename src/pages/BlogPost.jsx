import { posts } from '../data/posts';

export default function BlogPost({ slug, onNavigate }) {
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="page-shell">
        <h1 className="page-title">Post not found.</h1>
        <BackLink onNavigate={onNavigate} />
      </section>
    );
  }

  return (
    <article className="page-shell max-w-3xl">
      <BackLink onNavigate={onNavigate} />
      <p className="meta mt-10">{new Date(post.date).toLocaleDateString()}</p>
      <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{post.title}</h1>
      <p className="muted mt-5 text-lg leading-8">{post.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="chip">{tag}</span>
        ))}
      </div>

      <div className="mt-12 grid gap-10">
        {post.sections.map((section) => (
          <section key={section.heading} className="border-t border-grid pt-8">
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="muted mt-4 leading-8">{paragraph}</p>
            ))}
            {section.list && (
              <ul className="muted mt-5 list-disc space-y-2 pl-5">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

function BackLink({ onNavigate }) {
  return (
    <a
      className="soft-link muted"
      href="/blog"
      onClick={(event) => {
        event.preventDefault();
        onNavigate('/blog');
      }}
    >
      Back
    </a>
  );
}
