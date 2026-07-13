import { useEffect, useState } from 'react';
import { ArrowLeft, LogIn, LogOut } from 'lucide-react';
import {
  getOwnerAccess,
  isSupabaseConfigured,
  onOwnerAuthChange,
  requestOwnerMagicLink,
  signOutOwner,
} from '../lib/guestbookApi';

export default function OwnerLogin({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [access, setAccess] = useState({ isOwner: false, session: null });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let active = true;
    const refreshAccess = () => {
      getOwnerAccess()
        .then((result) => {
          if (active) setAccess(result);
        })
        .catch(() => {
          if (active) setStatus('Owner access could not be verified.');
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    };

    refreshAccess();
    const unsubscribe = onOwnerAuthChange(() => queueMicrotask(refreshAccess));

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      await requestOwnerMagicLink(email.trim());
      setStatus('Check your email to finish signing in.');
    } catch {
      setStatus('The sign-in link could not be sent.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await signOutOwner();
      setAccess({ isOwner: false, session: null });
      setStatus('Owner session ended.');
    } catch {
      setStatus('Could not sign out.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-shell archive-page owner-login">
      <a className="soft-link owner-login-back" href="/" onClick={(event) => handleInternalLink(event, '/', onNavigate)}>
        <ArrowLeft aria-hidden="true" /> home
      </a>
      <p className="meta">private access</p>
      <h1 className="page-title">Guestbook owner</h1>

      {!isSupabaseConfigured && <p className="muted owner-login-copy">Owner access is not available on this deployment.</p>}
      {loading && <p className="muted owner-login-copy">Checking owner access...</p>}

      {!loading && isSupabaseConfigured && access.isOwner && (
        <div className="owner-login-panel">
          <p>You are signed in as caur. Owner controls are now available in the homepage guestbook.</p>
          <div className="owner-login-actions">
            <a className="command-button" href="/#guestbook">open guestbook</a>
            <button className="command-button" type="button" onClick={handleLogout}>
              logout <LogOut aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {!loading && isSupabaseConfigured && !access.isOwner && (
        <form className="owner-login-form" onSubmit={handleLogin}>
          {access.session && <p className="muted">This session does not have owner access.</p>}
          <label className="field">
            <span>Owner email</span>
            <input type="email" autoComplete="email" value={email} required onChange={(event) => setEmail(event.target.value)} />
          </label>
          <button className="command-button" type="submit">
            send magic link <LogIn aria-hidden="true" />
          </button>
          {access.session && (
            <button className="guestbook-text-button soft-link" type="button" onClick={handleLogout}>
              clear current session
            </button>
          )}
        </form>
      )}

      <p className="form-status" aria-live="polite">{status}</p>
    </section>
  );
}

function handleInternalLink(event, path, onNavigate) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}
