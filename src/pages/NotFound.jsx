import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="page-shell archive-page">
      <p className="meta">error / 404</p>
      <h1 className="page-title mt-4">Page not found.</h1>
      <p className="muted mt-6">The page you requested does not exist or has moved.</p>
      <a className="work-action soft-link" href="/">
        return home <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  );
}
