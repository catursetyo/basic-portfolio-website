# Guestbook

## Goal

Visitors may leave a short public message and like messages or replies. Only the authenticated owner may publish a one-level reply.

This feature is optional. It must not delay core portfolio completion.

## Production Rule

A public guestbook is production-ready only when it has:

- shared persistence,
- server-side validation,
- moderation,
- rate limiting,
- like deduplication,
- loading, success, empty, error, and unavailable states.

Supabase is the selected production provider. `localStorage` exists only in Vite development mode; production shows an unavailable state when Supabase is not configured.

## Message Rules

- Name: required, 2–40 characters.
- Message: required, 1–280 characters.
- Rendered as text.
- New messages may enter pending moderation.

## Reply Rules

- One level deep.
- Owner session required.
- Author name and owner role come from the server, never the form.
- Message: required, 1–220 characters.
- Parent message must exist.
- Owner replies publish immediately but remain hidden while their parent is pending.

## Like Rules

- Apply to messages and replies.
- Visitor may like or unlike.
- Server deduplicates by anonymous visitor identity.
- Server applies a short cooldown to repeated toggles.
- Counts come from the server.
- Owner likes also set a server-controlled `liked by caur` marker.
- The client reloads server state after a successful toggle.

## UI States

### Loading

- Show compact skeletons or status text.
- Keep the rest of Home usable.

### Empty

- Invite the first message.
- Do not seed fake public messages.

### Unavailable

- Explain that the guestbook is temporarily unavailable.
- Do not show a form that cannot submit.

### Submission Success

- Explain whether the message is public or pending moderation.
- Clear the form only after success.

### Submission Error

- Preserve the user's input.
- Show a retryable message.
- Do not expose internal error details.

## Form

The primary message composer is collapsed by default. A `leave a message` disclosure button must:

- expose the name and message fields only after activation,
- report its state with `aria-expanded`,
- reference the composer with `aria-controls`,
- remain keyboard operable,
- leave the message list available while the composer is closed.

Every field needs:

- visible label,
- required state,
- character limit,
- inline validation,
- disabled/loading submit state.

Use `aria-live` for submission feedback.

## Layout

- Guestbook belongs near the bottom of Home.
- Messages are compact rows, not oversized cards.
- Replies indent one level.
- Name and date use metadata styling.
- Message text uses readable body contrast.
- Like count aligns consistently.
- Reply form appears only for the selected message.

## Owner Replies

Owner identity is verified by Supabase Auth and the `is_guestbook_owner()` database function. The private `/owner/login` route sends a magic link only to a pre-existing owner account. The guestbook exposes approve, reply, delete, and logout controls inline after verification; no admin dashboard is required.

The owner email currently lives in the migration as a deliberate single-owner rule. Changing it requires a new migration, not a browser environment variable.

## Supabase Setup

1. Create a Supabase project and run `supabase/migrations/202607120001_guestbook.sql`.
2. Enable anonymous sign-ins and configure CAPTCHA for production traffic.
3. Create the owner Auth user for `catursetyo26@gmail.com` before requesting a magic link.
4. Add the deployed `/owner/login` URL to the allowed Auth redirect URLs.
5. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from `.env.example` in the deployment environment.

The publishable key is browser-safe. Never expose a secret key or service-role key in a `VITE_*` variable.

## Safety

- No HTML input.
- No `dangerouslySetInnerHTML`.
- Validate on server and client.
- Limit request size.
- Rate-limit writes.
- Store only the random Supabase Auth user ID needed for rate limiting and like deduplication; do not store visitor IP addresses.
- Moderate untrusted content before public display when needed.

## Acceptance Criteria

- Shared messages appear across browsers.
- Refresh does not lose state.
- Invalid input cannot be submitted.
- Loading, empty, success, error, and unavailable states work.
- Pending moderation is explained.
- Likes deduplicate.
- Only the verified owner can reply, approve, or delete.
- Owner likes and replies cannot be forged by submitting the name `caur`.
- Replies remain one level deep.
- The message composer opens and closes from the CTA without losing typed input.
- Keyboard and mobile use are comfortable.
- Guestbook failure does not break Home.
