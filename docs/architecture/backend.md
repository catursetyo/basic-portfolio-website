# Minimal Backend

## Scope

The portfolio does not need a general backend in V1.

A backend is required only for shared, untrusted, or secret-backed behavior:

- guestbook messages,
- guestbook replies,
- likes,
- owner deletion,
- rate limiting,
- optional view counter.

Projects, posts, social links, and most site content remain static.

## Provider Decision

Do not implement a production guestbook until the deployment target and persistence provider are chosen.

Allowed shapes:

1. Serverless functions plus a managed database.
2. A small standalone API.
3. A browser-safe database REST interface with strict row-level rules.

Do not expose service-role or administrative keys to the frontend.

## Suggested API

```text
GET  /api/health

GET  /api/guestbook
POST /api/guestbook
POST /api/guestbook/:messageId/replies
POST /api/guestbook/:targetType/:targetId/like
DELETE /api/guestbook/:targetType/:targetId/like

POST /api/views
GET  /api/views
```

The counter endpoints are optional and may be replaced by an external provider adapter.

## Guestbook Response Shape

```json
{
  "messages": [],
  "meta": {
    "status": "live",
    "publication": "immediate"
  }
}
```

Allowed status values:

- `live`
- `read_only`
- `unavailable`

## Database Shape

```text
guestbook_messages
  id
  name
  message
  created_at
  approved
  author_role
  ip_hash

guestbook_replies
  id
  message_id
  name
  message
  created_at
  approved
  author_role
  ip_hash

guestbook_likes
  id
  target_type
  target_id
  visitor_id_hash
  created_at

page_views
  id
  page_key
  visitor_id_hash
  viewed_at
```

Use a unique constraint for likes:

```text
(target_type, target_id, visitor_id_hash)
```

Counter storage does not need a row per view if the provider supports atomic counts. Choose the simplest reliable model for the deployment target.

## Validation

Server-side validation is mandatory.

Messages:

- name: 2–40 characters,
- message: 1–280 characters.

Replies:

- name: 2–40 characters,
- message: 1–220 characters.

Reject:

- empty normalized text,
- unsupported target types,
- missing parent messages,
- oversized request bodies,
- excessive write frequency.

## Rendering Safety

- Store and return text.
- Render it as text.
- Do not accept arbitrary HTML.
- Do not use `dangerouslySetInnerHTML` for guestbook content.
- Normalize whitespace if needed, but preserve normal punctuation and language.

## Anonymous Visitor Identity

- Frontend creates a random visitor identifier once.
- Store it locally.
- Send it over HTTPS.
- Backend hashes it before persistence.
- Use the hash for like deduplication and abuse controls.
- Do not display IP addresses or hashes.

## Publication And Deletion

Current behavior:

- valid public messages are visible immediately,
- owner replies are marked with `author_role = owner`,
- only the authenticated owner may delete entries.

An admin dashboard is not required in V1. Owner deletion remains available inline in the homepage guestbook.

## Rate Limiting

Apply separate limits for:

- messages,
- replies,
- likes,
- counter writes if required.

Return clear HTTP status codes and safe messages. Do not expose internal database errors.

## Environment Variables

Frontend:

```text
VITE_API_BASE_URL=
VITE_RESUME_URL=
```

Backend:

```text
DATABASE_URL=
VISITOR_HASH_SECRET=
ALLOWED_ORIGIN=
```

Provider-specific variables belong only in backend/serverless configuration.

## Failure Behavior

- Guestbook read failure: show unavailable state; do not break Home.
- Guestbook write failure: preserve form input and allow retry.
- Like failure: restore the previous UI state.
- Counter failure: hide count or show `--`.
- Health failure: do not block static pages.
