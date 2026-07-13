# Frontend Architecture

## Stack

Keep:

- Vite.
- React.
- Tailwind CSS.
- Framer Motion.
- Lenis.
- Lucide React.
- Space Grotesk through `@fontsource`.
- Supabase JS for guestbook Auth and RPC calls.

Approved addition:

- `react-router-dom` for route matching, navigation, parameters, not-found handling, and link semantics.

Do not migrate to Next.js for this redesign.

## App Shape

Recommended structure:

```text
src/
  app/
    App.jsx
    router.jsx
    ScrollManager.jsx
  components/
    layout/
    navigation/
    project/
    guestbook/
    ui/
  data/
    projects.js
    posts.js
    socials.js
  lib/
    api.js
    guestbook.js
    viewCounter.js
  pages/
    Home.jsx
    Projects.jsx
    ProjectDetail.jsx
    Blog.jsx
    BlogPost.jsx
    Resume.jsx
    Contact.jsx
    NotFound.jsx
    OwnerLogin.jsx
```

Do not reorganize everything at once. Move files only when a feature change benefits from it.

## Routing

Use React Router.

Example target:

```jsx
<Routes>
  <Route element={<RootLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/:slug" element={<ProjectDetail />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/resume" element={<Resume />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

Rules:

- Use `Link` and `NavLink` for application routes.
- Use normal anchors for external destinations.
- Do not cancel modifier-click behavior.
- Do not silently render Home for unknown paths.
- Treat missing project or post slugs as not found.
- Add SPA fallback configuration for the deployment target.

## Navigation

Homepage:

- Hero section navigation may jump to same-page sections.
- Fixed top navigation may be hidden or visually reduced in the first viewport.
- It may appear after scrolling beyond the hero.

Internal pages:

- Show navigation immediately.
- Active state must cover nested routes such as `/blog/:slug`.
- Provide a reliable way back to Home and the route index.

## Scrolling

Lenis is enhancement, not a requirement for content access.

Rules:

- Use currently supported Lenis options.
- Prefer `autoRaf` over unmanaged RAF.
- Destroy the Lenis instance during cleanup.
- Do not register duplicate anchor handlers.
- Disable Lenis for `prefers-reduced-motion`.
- Coordinate route scroll reset or restoration through one component.
- Test hash navigation with Lenis enabled and disabled.
- Do not mix `window.scrollTo` and Lenis scroll calls without an explicit reason.

## Motion

- Framer Motion is for page or element transitions that improve hierarchy.
- Avoid wrapping every section in animation.
- The first hero reveal runs once.
- Reduced-motion mode removes nonessential movement.
- Content must be present in the document without waiting for animation.

## State

Use component state for:

- form inputs,
- selected reply,
- transient loading/error state,
- local UI controls.

Use URL state for:

- routes,
- project slugs,
- post slugs,
- shareable filters when added.

Do not add global state management unless multiple distant components genuinely share mutable state.

## Static Data

Store real portfolio content in local modules:

- `src/data/projects.js`
- `src/data/posts.js`
- `src/data/socials.js`

Keep JSX focused on rendering.

If the content shape becomes cumbersome, TypeScript migration may be considered separately. Do not mix that migration into an unrelated visual task.

## API Boundary

Use one small API client layer for external requests.

The guestbook boundary is `src/lib/guestbookApi.js`. It uses anonymous Auth for visitors, magic-link Auth for the single owner, and database RPC functions for every read or write. Public Supabase URL and publishable key may be exposed; secret and service-role keys may not.

Each request must expose:

- loading,
- success,
- empty,
- error,
- unavailable behavior.

Frontend environment variables may contain public endpoints, not secrets.

## Error Handling

- Unknown route: NotFound.
- Unknown project: NotFound or project-specific missing state.
- Unknown post: NotFound or post-specific missing state.
- Counter error: hide or neutral placeholder.
- Guestbook read error: explanatory unavailable state.
- Guestbook write error: keep user input and show retry.
- Resume missing: visitor-facing fallback.

## Preloader

The preloader is optional.

Rules:

- Run at most once per browser session.
- Skip for reduced-motion users.
- Do not hide the cursor.
- Do not block a route for a fixed long duration.
- Prefer a short intro or real hero-asset readiness with a maximum timeout.
- Never make content inaccessible when JavaScript animation fails.

## Deployment

A static host must rewrite application routes to `/index.html`.

Also verify:

- direct load of nested routes,
- browser refresh,
- not-found behavior within the app,
- public PDF delivery,
- environment-variable injection,
- immutable caching for hashed assets.
