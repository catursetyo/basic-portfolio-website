import { useEffect, useState } from 'react';
import { ChevronDown, Heart, MessageCircle, Send } from 'lucide-react';
import { addMessage, addReply, initialMessages, toggleLike } from '../lib/guestbook';

const STORAGE_KEY = 'caur_guestbook';

export default function Guestbook({ embedded = false }) {
  const [messages, setMessages] = useState(() => readMessages());
  const [form, setForm] = useState({ name: '', message: '' });
  const [replyTo, setReplyTo] = useState(null);
  const [reply, setReply] = useState({ name: '', message: '' });
  const [status, setStatus] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);

  useEffect(() => {
    // ponytail: local demo, swap to backend API when moderation/persistence is ready.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  return (
    <section className={embedded ? 'guestbook' : 'page-shell guestbook'}>
      <div className="guestbook-heading">
        {embedded
          ? <h2 className="guestbook-title">guestbook</h2>
          : <h1 className="page-title">guestbook</h1>}
        <span>{messages.length} messages</span>
      </div>
      <p className="guestbook-subtitle">leave a message! i'd love to hear from you.</p>
      <p className="guestbook-note">Local preview: messages, replies, and likes stay in this browser.</p>

      <div className="guestbook-list">
        {messages.map((message) => (
          <article key={message.id} className="guestbook-entry">
            <MessageHeader item={message} onLike={() => setMessages((items) => toggleLike(items, message.id))} />
            <p className="guestbook-message">{message.message}</p>
            <button
              className="guestbook-reply soft-link"
              onClick={() => setReplyTo(replyTo === message.id ? null : message.id)}
              type="button"
            >
              <MessageCircle className="h-4 w-4" /> reply
            </button>

            {message.replies.length > 0 && (
              <div className="guestbook-replies">
                {message.replies.map((item) => (
                  <div key={item.id}>
                    <MessageHeader item={item} onLike={() => setMessages((items) => toggleLike(items, item.id))} />
                    <p className="guestbook-message">{item.message}</p>
                  </div>
                ))}
              </div>
            )}

            {replyTo === message.id && (
              <form
                className="guestbook-form guestbook-reply-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setMessages((items) => addReply(items, message.id, reply));
                  setReply({ name: '', message: '' });
                  setReplyTo(null);
                  setStatus('Reply saved in this browser.');
                }}
              >
                <label className="field">
                  <span>Name</span>
                  <input
                    value={reply.name}
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={(event) => setReply({ ...reply, name: event.target.value })}
                  />
                </label>
                <label className="field">
                  <span>Reply</span>
                  <textarea
                    value={reply.message}
                    maxLength="220"
                    required
                    onChange={(event) => setReply({ ...reply, message: event.target.value })}
                  />
                </label>
                <button className="command-button" type="submit">
                  send reply <Send aria-hidden="true" />
                </button>
              </form>
            )}
          </article>
        ))}
      </div>

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
        <form
          id="guestbook-message-form"
          className="guestbook-form"
          onSubmit={(event) => {
            event.preventDefault();
            setMessages((items) => addMessage(items, form));
            setForm({ name: '', message: '' });
            setStatus('Message saved in this browser.');
            setComposerOpen(false);
          }}
        >
          <label className="field">
            <span>Name</span>
            <input
              value={form.name}
              minLength="2"
              maxLength="40"
              required
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea
              value={form.message}
              maxLength="280"
              required
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
          </label>
          <button className="command-button" type="submit">
            send message <Send aria-hidden="true" />
          </button>
        </form>
      )}

      <p className="form-status" aria-live="polite">{status}</p>
    </section>
  );
}

function MessageHeader({ item, onLike }) {
  return (
    <div className="guestbook-header">
      <div>
        <p>{item.name}</p>
        <time dateTime={item.createdAt}>{item.createdAt}</time>
      </div>
      <button
        className="guestbook-like soft-link"
        onClick={onLike}
        type="button"
        aria-label={`${item.liked ? 'Unlike' : 'Like'} message by ${item.name}`}
      >
        <Heart className={`h-4 w-4 ${item.liked ? 'fill-current text-[var(--accent-warm)]' : ''}`} />
        {item.likes}
      </button>
    </div>
  );
}

function readMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialMessages;
  } catch {
    return initialMessages;
  }
}
