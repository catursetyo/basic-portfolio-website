# System Overview

## Current Application

The reviewed `v2-redesign` snapshot is a Vite + React single-page application.

Important files:

- `src/App.jsx`: manual route shell and loading state.
- `src/pages/Home.jsx`: homepage composition.
- `src/pages/Projects.jsx`: project index.
- `src/pages/Blog.jsx`: blog index scaffold.
- `src/pages/BlogPost.jsx`: blog detail scaffold.
- `src/pages/Guestbook.jsx`: embedded Supabase guestbook with a development-only local fallback.
- `src/pages/NotFound.jsx`: catch-all missing-route page.
- `src/pages/OwnerLogin.jsx`: private magic-link owner access.
- `src/pages/Resume.jsx`: resume redirect scaffold.
- `src/components/layout/Navbar.jsx`: fixed glass navigation.
- `src/components/layout/SmoothScroller.jsx`: Lenis integration.
- `src/components/ui/DataOverlay.jsx`: location and time metadata.
- `src/data/*.js`: local project, post, and social data.
- `src/lib/guestbook.js`: guestbook transformations and local preview helpers.
- `src/lib/guestbookApi.js`: Supabase Auth and RPC boundary.
- `src/lib/supabase.js`: public Supabase client configuration.
- `supabase/migrations/202607120001_guestbook.sql`: guestbook tables and secured RPC functions.
- `src/lib/viewCounter.js`: external counter fetch helper.
- `src/index.css`: tokens, section-scoped typography roles, and most shared styles.

## Current Temporary Implementations

- Routing is manual.
- Guestbook uses `localStorage` only in Vite development mode and becomes unavailable in production until public Supabase configuration is supplied.
- Blog data is empty.
- Resume URL is environment-driven but unconfigured.
- Counter provider contract is incomplete.
- Hero uses `public/background/hero.webm` with `public/background/hero.mp4` fallback and `public/background/hero-poster.webp` as its still fallback.

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
| `/` | Hero, about/socials, repository-format project grid, optional guestbook, footer. |
| `/projects` | All selected projects. |
| `/projects/:slug` | Detailed project case study. |
| `/blog` | Useful posts or deliberate empty state. |
| `/blog/:slug` | Article detail. |
| `/resume` | Redirect to or render the public resume. |
| `/contact` | Optional dedicated contact view. |
| `/owner/login` | Unlisted magic-link access for guestbook ownership controls. |
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

Production rows also carry server-derived `authorRole`, `likedByMe`, and `ownerLiked` values. They are not accepted from visitor input.

## External Boundaries

- Resume: static public file or explicit public URL.
- Guestbook: Supabase Auth plus PostgreSQL RPC functions; table access is not exposed to the browser.
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

Cloudflare Pages builds `main` with `npm run build`, publishes `dist/`, and provides its built-in SPA fallback when no top-level `404.html` exists.
