# Backend

## Need

Only the guestbook needs backend in V1 because messages, replies, likes, moderation, and anti-spam need shared state.

Blog, projects, resume, and most page content remain static.

## Shape

Use the smallest API shape that fits the deploy target.

Vercel-style:

```text
api/
  guestbook.js
  guestbook-replies.js
  guestbook-likes.js
  health.js
```

Standalone server if Vercel functions are not used:

```text
server/
  src/
    index.js
    routes/
      guestbook.js
      health.js
    lib/
      db.js
      validate.js
      rateLimit.js
```

## Endpoints

```text
GET  /api/health
GET  /api/guestbook
POST /api/guestbook
POST /api/guestbook/:messageId/replies
POST /api/guestbook/:targetType/:targetId/like
```

`targetType` is `message` or `reply`.

## Tables

```text
guestbook_messages
  id
  name
  message
  created_at
  approved
  ip_hash

guestbook_replies
  id
  message_id
  name
  message
  created_at
  approved
  ip_hash

guestbook_likes
  id
  target_type
  target_id
  visitor_id_hash
  created_at
```

Add a unique constraint on:

```text
target_type, target_id, visitor_id_hash
```

This makes like toggling/deduping cheap and avoids fake inflated counts from one browser session.

## Visitor Identity

No login in V1.

- Frontend creates a random visitor id and stores it in `localStorage`.
- Backend hashes it before storing.
- IP can be hashed for rate limiting, not displayed.

## Moderation

- Public reads return only `approved = true`.
- New messages and replies may default to `approved = false` if spam becomes a problem.
- Owner replies can be inserted manually in the database for V1.

## Rules

- Render user text as text, never HTML.
- Limit message and reply length.
- Rate limit posts and likes.
- Likes must be idempotent.
- Replies are one level deep only. No nested threads in V1.
