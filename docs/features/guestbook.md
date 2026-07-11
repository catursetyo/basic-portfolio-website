# Guestbook

## Goal

Visitors may leave a short public message, reply one level deep, and like messages or replies.

This feature is optional. It must not delay core portfolio completion.

## Production Rule

A public guestbook is production-ready only when it has:

- shared persistence,
- server-side validation,
- moderation,
- rate limiting,
- like deduplication,
- loading, success, empty, error, and unavailable states.

`localStorage` is allowed only for a clearly labeled development prototype.

## Message Rules

- Name: required, 2–40 characters.
- Message: required, 1–280 characters.
- Rendered as text.
- New messages may enter pending moderation.

## Reply Rules

- One level deep.
- Name: required, 2–40 characters.
- Message: required, 1–220 characters.
- Parent message must exist.
- New replies may enter pending moderation.

## Like Rules

- Apply to messages and replies.
- Visitor may like or unlike.
- Server deduplicates by anonymous visitor identity.
- Counts come from the server.
- Optimistic UI must roll back on failure.

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

Owner replies may use a verified visual badge based on server data such as `authorRole: 'owner'`. Never infer owner status from a submitted name.

## Safety

- No HTML input.
- No `dangerouslySetInnerHTML`.
- Validate on server and client.
- Limit request size.
- Rate-limit writes.
- Hash anonymous identifiers server-side.
- Moderate untrusted content before public display when needed.

## Acceptance Criteria

- Shared messages appear across browsers.
- Refresh does not lose state.
- Invalid input cannot be submitted.
- Loading, empty, success, error, and unavailable states work.
- Pending moderation is explained.
- Likes deduplicate.
- Replies remain one level deep.
- The message composer opens and closes from the CTA without losing typed input.
- Keyboard and mobile use are comfortable.
- Guestbook failure does not break Home.
