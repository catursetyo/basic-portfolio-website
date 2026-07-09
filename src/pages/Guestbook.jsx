import { useEffect, useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { addMessage, addReply, initialMessages, toggleLike } from '../lib/guestbook';

const STORAGE_KEY = 'caur_guestbook';

export default function Guestbook({ embedded = false }) {
  const [messages, setMessages] = useState(() => readMessages());
  const [form, setForm] = useState({ name: '', message: '' });
  const [replyTo, setReplyTo] = useState(null);
  const [reply, setReply] = useState({ name: '', message: '' });

  useEffect(() => {
    // ponytail: local demo, swap to backend API when moderation/persistence is ready.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  return (
    <section className={embedded ? '' : 'page-shell'}>
      <p className={embedded ? 'section-label' : 'meta'}>guestbook <span className="muted">{messages.length} messages</span></p>
      {!embedded && <h1 className="page-title mt-4">Leave a message.</h1>}
      <p className="muted mt-4 max-w-2xl leading-8">
        Messages, replies, and likes are local to this browser until the guestbook backend is wired.
      </p>

      <form
        className={embedded ? 'mt-8 grid gap-4' : 'glass content-card mt-10 grid gap-4'}
        onSubmit={(event) => {
          event.preventDefault();
          setMessages((items) => addMessage(items, form));
          setForm({ name: '', message: '' });
        }}
      >
        <input
          aria-label="Name"
          className="glass rounded-lg px-4 py-3 outline-none"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <textarea
          aria-label="Message"
          className="glass min-h-28 rounded-lg px-4 py-3 outline-none"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
        />
        <button className="glass nav-button w-fit px-5 text-sm font-semibold" type="submit">leave a message</button>
      </form>

      <div className="mt-10 grid gap-5">
        {messages.map((message) => (
          <article key={message.id} className={embedded ? 'guestbook-entry' : 'glass content-card'}>
            <MessageHeader item={message} onLike={() => setMessages((items) => toggleLike(items, message.id))} />
            <p className="mt-3 leading-7">{message.message}</p>
            <button className="soft-link mt-4 inline-flex items-center gap-2 text-sm" onClick={() => setReplyTo(replyTo === message.id ? null : message.id)}>
              <MessageCircle className="h-4 w-4" /> reply
            </button>

            {message.replies.length > 0 && (
              <div className="mt-5 grid gap-4 border-t border-grid pt-5">
                {message.replies.map((item) => (
                  <div key={item.id} className="pl-4">
                    <MessageHeader item={item} onLike={() => setMessages((items) => toggleLike(items, item.id))} />
                    <p className="muted mt-2 leading-7">{item.message}</p>
                  </div>
                ))}
              </div>
            )}

            {replyTo === message.id && (
              <form
                className="mt-5 grid gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  setMessages((items) => addReply(items, message.id, reply));
                  setReply({ name: '', message: '' });
                  setReplyTo(null);
                }}
              >
                <input
                  aria-label="Reply name"
                  className="glass rounded-lg px-4 py-3 outline-none"
                  value={reply.name}
                  onChange={(event) => setReply({ ...reply, name: event.target.value })}
                />
                <textarea
                  aria-label="Reply message"
                  className="glass min-h-24 rounded-lg px-4 py-3 outline-none"
                  value={reply.message}
                  onChange={(event) => setReply({ ...reply, message: event.target.value })}
                />
                <button className="glass nav-button w-fit px-5 text-sm font-semibold" type="submit">send reply</button>
              </form>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function MessageHeader({ item, onLike }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="meta">{item.name}</p>
        <p className="muted mt-1 text-xs">{item.createdAt}</p>
      </div>
      <button className="soft-link inline-flex items-center gap-2 text-sm" onClick={onLike} type="button">
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
