import { ArrowUpRight } from 'lucide-react';
import { posts } from '../data/posts';

export default function Blog({ onNavigate }) {
  return (
    <section className="page-shell">
      <a className="soft-link muted" href="/" onClick={(event) => handleNav(event, '/', onNavigate)}>Back</a>
      <p className="meta mt-10">blog</p>
      <h1 className="page-title mt-4">Blog</h1>
      <p className="muted mt-4 text-lg">Thoughts, tutorials, and experiments.</p>

      <div className="mt-12 grid gap-5">
        {posts.map((post) => (
          <article key={post.slug} className="glass content-card">
            <p className="muted text-sm">{formatDate(post.date)}</p>
            <a
              className="soft-link mt-3 flex items-start justify-between gap-4"
              href={`/blog/${post.slug}`}
              onClick={(event) => handleNav(event, `/blog/${post.slug}`, onNavigate)}
            >
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" />
            </a>
            <p className="muted mt-3 leading-7">{post.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function handleNav(event, path, onNavigate) {
  event.preventDefault();
  onNavigate(path);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date));
}
