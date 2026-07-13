export const initialMessages = [];

export function addMessage(messages, entry) {
  const message = sanitize(entry.message, 280);
  const name = sanitize(entry.name, 40) || 'anonymous';
  if (!message) return messages;

  return [
    {
      id: `m${Date.now()}`,
      name,
      message,
      createdAt: new Date().toISOString().slice(0, 10),
      liked: false,
      likes: 0,
      replies: [],
    },
    ...messages,
  ];
}

export function toggleLike(messages, targetId) {
  return messages.map((message) => {
    if (message.id === targetId) return withToggledLike(message);

    return {
      ...message,
      replies: message.replies.map((reply) => (reply.id === targetId ? withToggledLike(reply) : reply)),
    };
  });
}

export function nestEntries(rows) {
  const mapEntry = (row) => ({
    id: row.id,
    name: row.author_name,
    message: row.body,
    createdAt: row.created_at,
    authorRole: row.author_role,
    liked: row.liked_by_me,
    likes: row.like_count,
    ownerLiked: row.owner_liked,
  });

  return rows
    .filter((row) => !row.parent_id)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map((row) => ({
      ...mapEntry(row),
      replies: rows
        .filter((reply) => reply.parent_id === row.id)
        .sort((a, b) => a.created_at.localeCompare(b.created_at))
        .map(mapEntry),
    }));
}

function withToggledLike(item) {
  return {
    ...item,
    liked: !item.liked,
    likes: item.likes + (item.liked ? -1 : 1),
  };
}

function sanitize(value, max) {
  return String(value ?? '').trim().slice(0, max);
}

if (globalThis.process?.argv?.[1]?.endsWith('guestbook.js')) {
  const seed = addMessage([], { name: 'x', message: 'hello' });
  const once = toggleLike(seed, seed[0].id);
  console.assert(once[0].liked === true && once[0].likes === 1, 'message like toggles on');
  const twice = toggleLike(once, 'm1');
  console.assert(twice[0].liked === true && twice[0].likes === 1, 'unknown like is ignored');
  const nested = nestEntries([
    { id: 'reply', parent_id: 'parent', author_name: 'caur', body: 'reply', created_at: '2026-07-12T01:00:00Z' },
    { id: 'parent', parent_id: null, author_name: 'visitor', body: 'hello', created_at: '2026-07-12T00:00:00Z' },
  ]);
  console.assert(nested[0].replies[0].id === 'reply', 'remote replies are nested under their parent');
}
