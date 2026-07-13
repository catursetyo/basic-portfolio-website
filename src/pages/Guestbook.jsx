import { useEffect, useState } from 'react';
import { Check, ChevronDown, Heart, LogOut, MessageCircle, Send, Trash2 } from 'lucide-react';
import {
  fetchGuestbook,
  isSupabaseConfigured,
  moderateGuestbookEntry,
  signOutOwner,
  submitGuestbookMessage,
  submitOwnerReply,
  toggleRemoteLike,
} from '../lib/guestbookApi';
import { addMessage, initialMessages, toggleLike } from '../lib/guestbook';

const STORAGE_KEY = 'caur_guestbook';
const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

export default function Guestbook({ embedded = false }) {
  const remote = isSupabaseConfigured;
  const [messages, setMessages] = useState(() => (remote ? [] : readMessages()));
  const [form, setForm] = useState({ name: '', message: '' });
  const [replyTo, setReplyTo] = useState(null);
  const [reply, setReply] = useState('');
  const [status, setStatus] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(remote);
  const [unavailable, setUnavailable] = useState(false);
  const [busyId, setBusyId] = useState('');

  useEffect(() => {
    if (remote) return;
    // ponytail: local demo fallback until Supabase credentials are configured.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, remote]);

  useEffect(() => {
    if (!remote) return undefined;

    let active = true;
    fetchGuestbook()
      .then((result) => {
        if (!active) return;
        setMessages(result.messages);
        setIsOwner(result.isOwner);
        setUnavailable(false);
      })
      .catch(() => {
        if (active) setUnavailable(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [remote]);

  async function reloadRemote() {
    const result = await fetchGuestbook();
    setMessages(result.messages);
    setIsOwner(result.isOwner);
    setUnavailable(false);
  }

  async function handleMessageSubmit(event) {
    event.preventDefault();
    setBusyId('message');
    setStatus('');

    try {
      if (remote) {
        await submitGuestbookMessage(form);
        await reloadRemote();
        setStatus('Message submitted for moderation.');
      } else {
        setMessages((items) => addMessage(items, form));
        setStatus('Message saved in this browser.');
      }
      setForm({ name: '', message: '' });
      setComposerOpen(false);
    } catch (error) {
      setStatus(getGuestbookError(error, 'Message could not be submitted. Please retry.'));
    } finally {
      setBusyId('');
    }
  }

  async function handleLike(entryId) {
    if (!remote) {
      setMessages((items) => toggleLike(items, entryId));
      return;
    }

    setBusyId(`like:${entryId}`);
    try {
      await toggleRemoteLike(entryId);
      await reloadRemote();
    } catch {
      setStatus('Like could not be updated. Please retry.');
    } finally {
      setBusyId('');
    }
  }

  async function handleReplySubmit(event, entryId) {
    event.preventDefault();
    setBusyId(`reply:${entryId}`);
    setStatus('');

    try {
      await submitOwnerReply(entryId, reply);
      setReply('');
      setReplyTo(null);
      await reloadRemote();
      setStatus('Reply published.');
    } catch {
      setStatus('Reply could not be published. Please retry.');
    } finally {
      setBusyId('');
    }
  }

  async function handleModeration(entryId, action) {
    setBusyId(`${action}:${entryId}`);
    try {
      await moderateGuestbookEntry(entryId, action);
      await reloadRemote();
      setStatus(action === 'approve' ? 'Message approved.' : 'Message deleted.');
    } catch {
      setStatus('Moderation action failed. Please retry.');
    } finally {
      setBusyId('');
    }
  }

  async function handleOwnerSignOut() {
    setBusyId('signout');
    try {
      await signOutOwner();
      setIsOwner(false);
      await reloadRemote();
      setStatus('Owner session ended.');
    } catch {
      setStatus('Could not sign out. Please retry.');
    } finally {
      setBusyId('');
    }
  }

  return (
    <section className={embedded ? 'guestbook' : 'page-shell guestbook'}>
      <div className="guestbook-heading">
        {embedded
          ? <h2 className="guestbook-title">guestbook</h2>
          : <h1 className="page-title">guestbook</h1>}
        <span>{messages.length} messages</span>
      </div>
      <p className="guestbook-subtitle">leave a message! i'd love to hear from you.</p>
      <p className="guestbook-note">
        {remote ? 'Messages are shared and moderated before publication.' : 'Local preview: messages and likes stay in this browser.'}
      </p>

      {isOwner && (
        <div className="guestbook-owner-session">
          <span>owner session</span>
          <button className="guestbook-text-button soft-link" type="button" onClick={handleOwnerSignOut} disabled={busyId === 'signout'}>
            <LogOut aria-hidden="true" /> logout
          </button>
        </div>
      )}

      {loading && <p className="guestbook-state">Loading guestbook...</p>}
      {unavailable && <p className="guestbook-state">Guestbook is temporarily unavailable.</p>}

      {!unavailable && (
        <div className="guestbook-list">
          {messages.map((message) => (
            <article key={message.id} className="guestbook-entry">
              <MessageHeader
                item={message}
                onLike={message.approved || isOwner || !remote ? () => handleLike(message.id) : null}
                disabled={busyId === `like:${message.id}`}
              />
              <p className="guestbook-message">{message.message}</p>
              {message.ownerLiked && <p className="guestbook-owner-like">♥ liked by caur</p>}
              {remote && !message.approved && <p className="guestbook-pending">pending moderation</p>}

              {message.replies.length > 0 && (
                <div className="guestbook-replies">
                  {message.replies.map((item) => (
                    <div key={item.id}>
                      <MessageHeader
                        item={item}
                        onLike={() => handleLike(item.id)}
                        disabled={busyId === `like:${item.id}`}
                      />
                      <p className="guestbook-message">{item.message}</p>
                      {item.ownerLiked && <p className="guestbook-owner-like">♥ liked by caur</p>}
                    </div>
                  ))}
                </div>
              )}

              {isOwner && (
                <div className="guestbook-owner-actions">
                  {!message.approved && (
                    <button className="guestbook-text-button soft-link" type="button" onClick={() => handleModeration(message.id, 'approve')} disabled={Boolean(busyId)}>
                      <Check aria-hidden="true" /> approve
                    </button>
                  )}
                  <button className="guestbook-text-button soft-link" type="button" onClick={() => setReplyTo(replyTo === message.id ? null : message.id)}>
                    <MessageCircle aria-hidden="true" /> reply
                  </button>
                  <button className="guestbook-text-button guestbook-delete soft-link" type="button" onClick={() => handleModeration(message.id, 'delete')} disabled={Boolean(busyId)}>
                    <Trash2 aria-hidden="true" /> delete
                  </button>
                </div>
              )}

              {isOwner && replyTo === message.id && (
                <form className="guestbook-form guestbook-reply-form" onSubmit={(event) => handleReplySubmit(event, message.id)}>
                  <label className="field">
                    <span>Reply as caur</span>
                    <textarea value={reply} maxLength="220" required onChange={(event) => setReply(event.target.value)} />
                  </label>
                  <button className="command-button" type="submit" disabled={busyId === `reply:${message.id}`}>
                    send reply <Send aria-hidden="true" />
                  </button>
                </form>
              )}
            </article>
          ))}
        </div>
      )}

      {!unavailable && (
        <>
          <button
            className="command-button guestbook-composer-toggle"
            type="button"
            aria-expanded={composerOpen}
            aria-controls="guestbook-message-form"
            onClick={() => setComposerOpen((open) => !open)}
          >
            {composerOpen ? 'close message form' : 'leave a message'}
            <ChevronDown aria-hidden="true" />
          </button>

          {composerOpen && (
            <form id="guestbook-message-form" className="guestbook-form" onSubmit={handleMessageSubmit}>
              <label className="field">
                <span>Name</span>
                <input value={form.name} minLength="2" maxLength="40" required onChange={(event) => setForm({ ...form, name: event.target.value })} />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea value={form.message} maxLength="280" required onChange={(event) => setForm({ ...form, message: event.target.value })} />
              </label>
              <button className="command-button" type="submit" disabled={busyId === 'message'}>
                send message <Send aria-hidden="true" />
              </button>
            </form>
          )}
        </>
      )}

      <p className="form-status" aria-live="polite">{status}</p>
    </section>
  );
}

function MessageHeader({ item, onLike, disabled }) {
  return (
    <div className="guestbook-header">
      <div>
        <p>
          {item.name}
          {item.authorRole === 'owner' && <span className="guestbook-owner-badge">owner</span>}
        </p>
        <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
      </div>
      {onLike && (
        <button className="guestbook-like soft-link" onClick={onLike} type="button" disabled={disabled} aria-label={`${item.liked ? 'Unlike' : 'Like'} message by ${item.name}`}>
          <Heart className={`h-4 w-4 ${item.liked ? 'fill-current text-[var(--accent-warm)]' : ''}`} />
          {item.likes}
        </button>
      )}
    </div>
  );
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

function getGuestbookError(error, fallback) {
  if (error?.code === 'P0001') return 'Please wait before sending another message.';
  if (error?.code === '22023') return 'Please check the name and message length.';
  return fallback;
}

function readMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialMessages;
  } catch {
    return initialMessages;
  }
}
