# System Overview

## Current Application

The reviewed `v2-redesign` snapshot is a Vite + React single-page application.

Important files:

- `src/App.jsx`: manual route shell and loading state.
- `src/pages/Home.jsx`: homepage composition.
- `src/pages/Projects.jsx`: project index.
- `src/pages/Blog.jsx`: blog index scaffold.
- `src/pages/BlogPost.jsx`: blog detail scaffold.
- `src/pages/Guestbook.jsx`: embedded browser-only guestbook prototype.
- `src/pages/Resume.jsx`: resume redirect scaffold.
- `src/components/layout/Navbar.jsx`: fixed glass navigation.
- `src/components/layout/SmoothScroller.jsx`: Lenis integration.
- `src/components/ui/DataOverlay.jsx`: location and time metadata.
- `src/data/*.js`: local project, post, and social data.
- `src/lib/guestbook.js`: local guestbook transformations.
- `src/lib/viewCounter.js`: external counter fetch helper.
- `src/index.css`: tokens and most shared styles.

## Current Temporary Implementations

- Routing is manual.
- Guestbook is localStorage-only.
- Blog data is empty.
- Resume URL is environment-driven but unconfigured.
- Counter provider contract is incomplete.
- Hero uses the original `public/hero-data-garden.webp` still image.

These are prototypes, not final architecture.

## Target Application

### App Shell

- React Router.
- Shared layout containing navigation and global background.
- Route-aware scroll handling.
- No blocking loader; any future intro must be optional and session-scoped.
- Global not-found route.
- Error-safe external integrations.

### Target Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero, about/socials, featured project, supporting work, optional guestbook, footer. |
| `/projects` | All selected projects. |
| `/projects/:slug` | Detailed project case study. |
| `/blog` | Useful posts or deliberate empty state. |
| `/blog/:slug` | Article detail. |
| `/resume` | Redirect to or render the public resume. |
| `/contact` | Optional dedicated contact view. |
| `*` | Not-found page. |

There is no standalone `/guestbook` route in V1 unless the embedded section becomes too large.

## Data Models

### Project

```ts
type Project = {
  id: string;
  slug: string;
  name: string;
  year: string;
  category: string;
  summary: string;
  problem: string;
  role: string;
  contribution: string[];
  challenges: string[];
  outcome: string;
  lessons?: string[];
  image: string;
  gallery?: string[];
  techStack: string[];
  githubUrl?: string;
  externalUrl?: string;
  status?: 'Live' | 'Prototype' | 'Under development' | 'Archived';
  featured: boolean;
};
```

### Post

```ts
type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  sections: Array<{
    heading: string;
    body: string[];
    list?: string[];
  }>;
  published: boolean;
};
```

### Guestbook Message

```ts
type GuestbookMessage = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  approved: boolean;
  likeCount: number;
  replies: GuestbookReply[];
};
```

### Guestbook Reply

```ts
type GuestbookReply = {
  id: string;
  messageId: string;
  name: string;
  message: string;
  createdAt: string;
  approved: boolean;
  likeCount: number;
};
```

## External Boundaries

- Resume: static public file or explicit public URL.
- Guestbook: small API and database.
- Counter: same API or replaceable public counting service.
- No secret-backed API is called directly from the browser.

## Degradation Rules

- Counter failure hides the count or shows a neutral placeholder.
- Guestbook failure leaves the rest of Home usable.
- Missing Blog content does not produce an empty broken grid.
- Missing Resume configuration shows visitor-facing fallback copy.
- Motion failure never hides content.

## Deployment Assumptions

The application is a static Vite build. Hosting must:

- serve `dist/`,
- support HTTPS,
- redirect unknown application paths to `index.html`,
- cache hashed assets,
- avoid caching `index.html` permanently,
- preserve public resume and social-preview assets.
