import { useEffect } from 'react';

export default function Resume() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL;

  useEffect(() => {
    if (resumeUrl) window.location.replace(resumeUrl);
  }, [resumeUrl]);

  return (
    <section className="page-shell">
      <p className="meta">resume</p>
      <h1 className="page-title mt-4">CV file is not configured yet.</h1>
      <p className="muted mt-5 max-w-2xl leading-8">
        Add `VITE_RESUME_URL` in your local env or place a public CV file before enabling the redirect.
      </p>
      <a className="soft-link mt-8 inline-block font-semibold" href="mailto:catursetyo26@gmail.com">request by email</a>
    </section>
  );
}
