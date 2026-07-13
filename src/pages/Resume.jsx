import { useEffect } from 'react';

export default function Resume() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL;

  useEffect(() => {
    if (resumeUrl) window.location.replace(resumeUrl);
  }, [resumeUrl]);

  return (
    <section className="page-shell archive-page">
      <p className="meta">resume</p>
      <h1 className="page-title mt-4">Resume is being updated.</h1>
      <p className="muted mt-5 max-w-2xl leading-8">
        For current experience, project details, or internship inquiries, reach me directly by email.
      </p>
      <a className="work-action soft-link mt-8" href="mailto:catursetyo26@gmail.com">
        contact by email <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
