# HireLoop Implementation Log

## Goal
Design and implement a futuristic "Digital Identity Portal" for Sign In and Sign Up with an uncommon, elegant visual aesthetic, full responsiveness, accessible form controls, show/hide password, live password strength meter, role selection, Google single sign-on, and integration with Better Auth.

Deliver a session-aware navbar: successful Sign In/Sign Up returns to Home, guest actions are replaced by the user's avatar, and a shadcn dropdown exposes the user's identity plus a fully working Better Auth logout.

## Component Architecture & Structure
```text
hireloop-client/
├── proxy.ts                                   # Edge guard: blocks guests from /dashboard/* (Better Auth session cookie)
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                         # Pass-through layout (no footer — auth UI fills viewport)
│   │   ├── sign-in/page.tsx                   # Sign In route view with metadata
│   │   └── sign-up/page.tsx                   # Sign Up route view with metadata
│   ├── (marketing)/
│   │   ├── layout.tsx                         # Adds SiteFooter to public pages only
│   │   ├── page.tsx                           # / — main landing page orchestrator
│   │   ├── jobs/page.tsx                      # /jobs route (placeholder)
│   │   ├── company/page.tsx                   # /company route (placeholder)
│   │   └── pricing/page.tsx                   # /pricing route (placeholder)
│   ├── api/auth/[...all]/route.ts             # Better Auth route handler
│   ├── dashboard/
│   │   ├── layout.tsx                         # Server session → role-aware DashboardShell (guest → /sign-in)
│   │   ├── loading.tsx                        # Dashboard skeleton loading state
│   │   ├── page.tsx                           # /dashboard index: redirects to the session role's dashboard
│   │   ├── seeker/page.tsx                    # Seeker dashboard (role-guarded overview)
│   │   ├── recruiter/page.tsx                 # Recruiter dashboard (role-guarded overview)
│   │   ├── recruiter/jobs/page.tsx            # Recruiter job listings view
│   │   ├── recruiter/jobs/new/page.tsx        # Post-a-job form route
│   │   └── admin/page.tsx                     # Admin dashboard (role-guarded overview)
│   ├── globals.css                            # Theme variables & design tokens (--navbar-height, dashboard offset)
│   ├── layout.tsx                             # Root layout with ThemeProvider & SiteHeader (no global footer)
│   └── page.tsx → (marketing)/page.tsx        # Moved into the (marketing) route group
├── components/
│   ├── auth/                                  # Credential form components only
│   │   ├── auth-portal-layout.tsx             # Futuristic digital gateway split layout (cybernetic orbit & telemetry)
│   │   ├── sign-in-form.tsx                   # Sign In credentials form, remember me & recovery modal
│   │   ├── sign-up-form.tsx                   # Sign Up form with role selection & live password strength meter
│   │   ├── social-auth-button.tsx             # Google SSO authentication button with Better Auth integration
│   │   └── password-input.tsx                 # Accessible password input with animated show/hide toggle
│   ├── dashboard/                             # Reusable dashboard building blocks (moved out of app/components)
│   │   ├── dashboard-shell.tsx                # DashboardShell: SidebarProvider + AppSidebar + topbar + content
│   │   ├── dashboard-topbar.tsx               # Sticky topbar: mobile sidebar trigger, role label, user chip
│   │   ├── dashboard-overview.tsx             # DashboardOverview: greeting + stats + quick actions per role
│   │   ├── dashboard-stat-card.tsx            # DashboardStatCard: single overview metric card
│   │   ├── dashboard-action-card.tsx          # DashboardActionCard: quick-action link card
│   │   ├── dashboard-config.ts                # Data-driven per-role dashboard content + ROLE_LABELS
│   │   └── post-job-form.tsx                  # Recruiter post-a-job form (textarea-backed)
│   ├── home/
│   │   ├── globe-stats-section.tsx            # 3D Earth, Stars, Glow & 4 Stat Cards
│   │   ├── hero-section.tsx                   # Hero search banner with dual inputs & popular tags
│   │   ├── featured-jobs-section.tsx          # "The roles you'd never find by searching" (3x2 grid)
│   │   ├── features-section.tsx               # "Everything you need to succeed" (4x2 grid)
│   │   ├── pricing-section.tsx                # "Pay for the leverage, not the listings" (3 tiers + toggle)
│   │   └── cta-banner-section.tsx             # "Your next role is already looking for you" with glowing dome
│   ├── layout/                                # Global chrome & navbar components (moved from components/ root + components/auth)
│   │   ├── site-header.tsx                    # Responsive header with desktop nav, auth state & mobile sheet
│   │   ├── site-footer.tsx                    # Global multi-column footer with legal links
│   │   ├── nav-auth.tsx                       # NavAuth: session-aware navbar switch (guest links ↔ avatar menu)
│   │   ├── nav-links.tsx                      # NavLinks: session-driven navbar links (public ↔ per-role with Dashboard)
│   │   ├── user-menu.tsx                      # UserMenu: profile avatar trigger + shadcn dropdown (name, email, logout)
│   │   └── user-summary.tsx                   # UserSummary: mobile identity card with direct logout action
│   ├── marketing/
│   │   └── placeholder-page.tsx               # Shared placeholder page used by /jobs, /company, /pricing
│   ├── sidebar/                               # Modular role-driven sidebar (moved out of app/components)
│   │   ├── AppSidebar.tsx                     # Orchestrator: session role/user + active route + composition
│   │   ├── navigation-config.ts               # Role-based menu configuration + resolveActiveUrl helper
│   │   ├── types.ts                           # AppRole, SidebarUser, NavItem/Section, RoleBadgeVariant, normalizeAppRole
│   │   ├── header.tsx                         # AppSidebarHeader: role switch (UserProfile ↔ Logo)
│   │   ├── user-profile.tsx                   # AppSidebarUserProfile: avatar + name + caption + badge
│   │   ├── logo.tsx                           # AppSidebarLogo: HireLoop brand mark + title
│   │   ├── navigation-menu.tsx                # AppSidebarNavigationMenu: sections → sidebar groups
│   │   ├── menu-item.tsx                      # AppSidebarMenuItem: single icon+title Next Link row
│   │   ├── role-badge.tsx                     # AppSidebarRoleBadge: tier / premium / admin pill
│   │   ├── footer.tsx                         # AppSidebarFooter: role switch (CTA + logout / identity)
│   │   └── logout.tsx                         # AppSidebarLogout: working Better Auth logout with spinner
│   └── ui/
│       ├── avatar.tsx                         # Base UI avatar primitives (image + initials fallback)
│       ├── button.tsx                         # Base UI button component
│       ├── dropdown-menu.tsx                  # Base UI menu primitives styled as shadcn dropdown
│       ├── input.tsx                          # Base UI input primitive
│       ├── separator.tsx                      # Base UI separator primitive
│       ├── sheet.tsx                          # Base UI accessible drawer sheet
│       ├── sidebar.tsx                        # shadcn sidebar primitives built on Base UI
│       ├── skeleton.tsx                       # Skeleton loading primitive
│       ├── textarea.tsx                       # Base UI textarea primitive
│       └── tooltip.tsx                        # Base UI tooltip primitive
├── hooks/
│   ├── use-logout.ts                          # Shared Better Auth sign-out flow with loading state
│   └── use-mobile.ts                          # Responsive breakpoint detection hook
└── lib/
    ├── auth.ts                                # Better Auth server configuration
    ├── auth-client.ts                         # Single Better Auth React client (session, sign in/up/out)
    ├── role-routes.ts                         # Centralized role-based route config: ROLE_DASHBOARD, nav links, resolvers
    ├── session.ts                             # Server-side cached session lookup + role guard (requireSessionRole)
    └── utils.ts                               # `cn` helper + avatar initials utility
```

### Structure Conventions
- **`app/` holds routes only** — every route segment maps to a URL; no shared components are colocated under `app/` (the former `app/components/` folder was dissolved into `components/`).
- **`components/` is grouped by domain:** `auth/` (credential forms), `layout/` (global chrome & navbar), `home/` (landing sections), `dashboard/` + `sidebar/` (post-auth UI), `marketing/` (public placeholder views) and `ui/` (design-system primitives).
- **`lib/` holds framework-free logic** (auth clients, route/session config, utilities) and **`hooks/` holds shared React hooks** (`use-logout`, `use-mobile`).

## Digital Identity Portal Features

### 1. Futuristic Visual Aesthetic
- **Cybernetic Atmosphere:** Deep space background (`#07070a`) layered with purple ambient light (`rgba(91,87,245,0.2)`) and blue glow.
- **Biometric Identity Hologram (Desktop Gateway):**
  - Live system status pill: `DIGITAL IDENTITY GATEWAY • SECURE` with pulsing indicator.
  - Interactive concentric orbital rings (rotating dashed orbit + counter-rotating inner ring).
  - Glowing biometric glyph with breathing shadow (`shadow-[0_0_40px_rgba(91,87,245,0.4)]`).
  - Floating telemetry tags (`50K+ Active Jobs`, `Zero-Spam Verified`).
  - Performance metrics: `< 24h Turnaround`, `Global Roles`, `Better Auth Cryptographic Keys`.

### 2. Glassmorphic Credential Card
- **Styling:** Floating glass card (`bg-[#0c0c11]/85`, `border border-white/10`, `backdrop-blur-2xl`, `shadow-[0_0_60px_rgba(91,87,245,0.12)]`).
- **Segmented Switch:** Smooth navigation pill toggle between `Sign In` and `Sign Up`.
- **Google SSO:** Single-click authentication with official Google SVG logo and loading spinner state.
- **Form Controls:**
  - `PasswordInput`: Show/hide toggle with `Eye`/`EyeOff` and full ARIA accessibility.
  - `SignUpForm`: Role toggle (`Job Seeker` vs. `Recruiter`), 4-step dynamic password strength meter (`Weak`, `Fair`, `Good`, `Strong`), terms acceptance.
  - `SignInForm`: Remember me for 30 days checkbox, forgot password recovery notice.

### 3. Better Auth Integration
- Preserves existing `better-auth` configuration in `lib/auth.ts` and `lib/auth-client.ts`.
- Direct email/password submission with `authClient.signIn.email` and `authClient.signUp.email`.
- Google single sign-on with `authClient.signIn.social({ provider: "google" })`.
- `lib/auth-client.ts` now exposes a single client (plus `signIn`, `signUp`, `signOut`, `useSession`) with the base URL read from `NEXT_PUBLIC_APP_URL`, falling back to `http://localhost:3000`.

### 4. Session-Aware Navbar
- **One source of truth:** `components/layout/nav-auth.tsx` consumes Better Auth's reactive `useSession` store and renders one of three states.
  - `desktop`: guest `Sign In` / `Get Started` actions, or the avatar dropdown.
  - `mobile`: guest actions inside the sheet, or the identity card.
  - `compact`: avatar-only trigger for the mobile top bar (renders nothing for guests).
- **Guest state:** Login and Get Started are hidden as soon as a session exists.
- **Authenticated state:** conservative initials avatar (`Avatar` + `getInitials`) or the provider profile image, with a brand ring on hover/open.
- **Profile dropdown (`components/layout/user-menu.tsx`):** shadcn `DropdownMenu` positioned to the end, showing the user's name, email and a destructive `Log out` action. Uses the existing dark navbar palette (`#141419`, white/10 borders, rose destructive tone).
- **Mobile:** avatar sits next to the hamburger; the navigation sheet shows `components/layout/user-summary.tsx` (avatar, name, email, full-width logout) so the menu never fights the modal drawer for focus.
- **Reusable logout flow (`hooks/use-logout.ts`):** calls `authClient.signOut()`, then `router.replace("/")` + `router.refresh()`; loading state disables the action and swaps in a spinner.
- **Instant updates:** the navbar reacts to the Better Auth session store, so signing in swaps guest actions for the avatar and signing out restores them without a page reload.
- **Redirects:** Sign In, Sign Up and Google SSO now return to `/` (Home) instead of `/jobs` or `/company`.

### 5. Post-Auth Redirects
- `sign-in-form.tsx`: success → `router.replace("/")` + `router.refresh()`.
- `sign-up-form.tsx`: success → `router.replace("/")` + `router.refresh()` (role selection remains a UI preference).
- `social-auth-button.tsx`: `callbackURL: "/"`.

### 6. Reusable Dashboard Sidebar (`AppSidebar`)
- **`components/sidebar/`** — a fully dynamic, modular sidebar built entirely on the shadcn `Sidebar` primitives (`Sidebar`, `SidebarHeader/Content/Footer`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuButton` with Base UI `render={<Link href={...} />}` navigation).
- **Fully session-driven:** role, username and avatar come from the Better Auth `useSession()` store — no props needed. Optional `role?: AppRole` and `user?: SidebarUser` props on the orchestrator allow overrides (previews / tests); `AppRole` uses the lowercase Better Auth role values (`"seeker" | "recruiter" | "admin"`, per `lib/auth.ts` `additionalFields`), and `normalizeAppRole` maps raw session roles, defaulting to `seeker` while loading or unknown.
- **Component architecture (single responsibility each):**
  - `AppSidebar.tsx` — orchestrator: resolves session role/user, computes the active URL via `usePathname()` and composes header, menu and footer.
  - `navigation-config.ts` — separated, data-driven `NAV_SECTIONS: Record<AppRole, NavSection[]>` menu configuration plus the longest-prefix `resolveActiveUrl` helper.
  - `types.ts` — shared types (`AppRole`, `SidebarUser`, `NavItem`, `NavSection`, `RoleBadgeVariant`) and `normalizeAppRole`.
  - `header.tsx` — `AppSidebarHeader`: role switch between user profile and brand logo.
  - `user-profile.tsx` — `AppSidebarUserProfile`: session avatar (Base UI `Avatar` + `getInitials` fallback), display name, optional caption and badge.
  - `logo.tsx` — `AppSidebarLogo`: HireLoop logo image with title/subtitle (admin header).
  - `navigation-menu.tsx` — `AppSidebarNavigationMenu`: maps sections to labeled `SidebarGroup`s.
  - `menu-item.tsx` — `AppSidebarMenuItem`: one icon + title row rendered as a Next `Link` with active styling.
  - `role-badge.tsx` — `AppSidebarRoleBadge`: reusable `tier` / `premium` / `admin` pill variants (Sparkles, Crown, ShieldCheck icons).
  - `footer.tsx` — `AppSidebarFooter`: role switch between the seeker actions and the admin identity card.
  - `logout.tsx` — `AppSidebarLogout`: fully working logout wired to the shared `use-logout.ts` hook (spinner + disabled while signing out).
- **Role-specific rendering (all derived from the same config):**
  - `seeker`: profile header (avatar, session name, "Professional Tier" caption); Menu — Dashboard, Jobs, Saved Jobs, Applications, Billing, Settings → `/dashboard/seeker/*`; footer with a full-width "Post Resume" button (→ `/dashboard/seeker/resume`) and `Log out`.
  - `recruiter`: profile header (avatar, session name, "Recruiter" caption + Premium crown badge); Menu — Dashboard, Manage Jobs, Applications, Settings → `/dashboard/recruiter/*`; no footer per the role spec.
  - `admin`: logo header ("Admin Console"); Console — Dashboard, Users, Companies, Jobs, Payments, Settings → `/dashboard/admin/*`; footer with the session identity card and "Super Admin" badge.
- **Active route highlighting:** `usePathname()` + `resolveActiveUrl` mark exactly one item active even for nested routes (e.g. `/dashboard/seeker/jobs` highlights "Jobs", not "Dashboard"), via `SidebarMenuButton`'s built-in `data-active` styling.
- **Responsive behavior:** mobile renders the sidebar inside the shadcn `Sheet` drawer; desktop supports the standard expand/collapse flow — both come from the existing `components/ui/sidebar.tsx` primitives.
- **Integration:** `app/dashboard/layout.tsx` renders `DashboardShell`, which mounts `<AppSidebar role={...} user={...} />` with the server-resolved session role and user (the redundant `DashboardSidebar.tsx` wrapper was removed).

### 7. Role-Based Dashboard Layout & Content
- **Server-driven layout (`app/dashboard/layout.tsx`):** resolves the Better Auth session on the server via `auth.api.getSession({ headers })` and renders `DashboardShell` with the normalized session role and user. Guests are redirected to `/sign-in`; no role is hardcoded anywhere — everything flows from the session.
- **Shared session helper (`lib/session.ts`):**
  - `getServerSession` — `cache()`-wrapped server session lookup so the layout and page share one call per request.
  - `requireSessionRole(expected)` — page guard: redirects guests to `/sign-in` and users whose session role differs from the page's role to their own `/dashboard/{role}` (no cross-role peeking); returns the session user otherwise.
- **`DashboardShell` (`components/dashboard/dashboard-shell.tsx`):** wraps `SidebarProvider` + the role-driven `AppSidebar` + `SidebarInset` with a sticky `DashboardTopbar` and passes page content through as children — one shell, completely different rendering per role.
- **`DashboardTopbar`:** mobile `SidebarTrigger` (opens the sidebar sheet), vertical separator, role label ("Job Seeker / Recruiter / Administrator Dashboard" from `ROLE_LABELS`) and a compact session identity chip (name + avatar with initials fallback).
- **Data-driven content (`dashboard-config.ts`):** `DASHBOARD_CONFIG: Record<AppRole, DashboardConfig>` holds each role's subtitle, 4 stat cards and 3 quick actions → reused by the single `DashboardOverview` component:
  - `seeker` — Applications / Saved Jobs / Profile Views / New Matches + Browse Jobs, Post Resume, Manage Billing.
  - `recruiter` — Active Jobs / Total Applicants / Pending Reviews / Job Views + Post a Job, Review Applications, Account Settings.
  - `admin` — Total Users / Companies / Active Jobs / Revenue (30d) + Manage Users, Review Companies, Payments.
- **Reusable content components:** `DashboardOverview` (greeting with the session user's first name + config-driven grid), `DashboardStatCard` (icon metric card) and `DashboardActionCard` (Next `Link` quick-action card to each role's dashboard routes).
- **Role routes preserved & guarded:** `/dashboard/seeker|recruiter|admin` keep working and now render role-appropriate content via `requireSessionRole`; a new `/dashboard` index redirects each signed-in user to their own role's dashboard.
- **Loading state:** `app/dashboard/loading.tsx` mirrors the overview layout with shadcn `Skeleton` cards so navigation into the dashboard doesn't jump.
- **Fallback behavior:** unknown / missing session roles normalize to `seeker` (matching the Better Auth `role` default), and unauthenticated visits redirect to the existing sign-in portal.

### 8. Role-Based Navbar & Server-Side Route Protection
- **Centralized route config (`lib/role-routes.ts`):** single source of truth for role-aware navigation —
  - `ROLE_DASHBOARD: Record<AppRole, string>` maps each role to its dashboard entry (`/dashboard/seeker|recruiter|admin`); used by the navbar links, the user menu and the `/dashboard` index redirect.
  - `PUBLIC_NAV_LINKS` (guest links: Browse Jobs, Company, Pricing) and `ROLE_NAV_LINKS` (per-role lists, each starting with a "Dashboard" entry) drive every navbar surface.
  - `navLinksForRole`, `roleDashboardPath` and `isActivePath` resolvers keep raw session roles → typed routes in one place.
- **Reusable `NavLinks` (`components/layout/nav-links.tsx`):** one client component for the desktop inline links and the mobile sheet links (both previously hardcoded `navItems` in `components/layout/site-header.tsx`).
  - Reads the Better Auth reactive `useSession` store, so links swap instantly after login/logout — no page refresh (same pattern as `NavAuth`).
  - Guests get `PUBLIC_NAV_LINKS`; signed-in users always get their role's links (unknown/missing roles default to `seeker`, matching the Better Auth role default), with "Dashboard" pointing at their own dashboard.
  - Preserves the original styling exactly (desktop `text-sm` link styles + `aria-current`, mobile sheet rows with active `bg-white/5` highlighting); desktop highlighting now also marks the active "Dashboard" route.
- **User menu Dashboard shortcut:** `user-menu.tsx` gains a `LayoutDashboard` "Dashboard" item rendered as a `Link` to `roleDashboardPath(user.role)`; `NavUser` now carries the optional session `role`.
- **Server-side route protection (`proxy.ts`):** Next.js 16 edge proxy guarding `matcher: ["/dashboard/:path*"]` with Better Auth's edge-safe `getSessionCookie` check — guests are redirected to `/sign-in` before any dashboard layout or page runs. Role permissions are enforced server-side inside the dashboard layout/pages via `requireSessionRole` (the signed session cookie alone doesn't reveal the role), so cross-role access is impossible even for authenticated users.
- **Preserved behavior:** sign-in/up still redirect to `/`, the navbar identity chip/logout flow is unchanged, and all existing routes render exactly as before — only the link set and dashboard destination become role-aware.

## Recent Git Commits Log

Full history is available via `git log`. Notable recent entries:

1. **`b370b32`** `feat(recruiter): add job listing and post-job form pages with textarea component`
2. **`29eb7c0`** `fix(dashboard): offset sidebar below sticky navbar using --dashboard-top CSS variable`
3. **`852c161`** `fix(header): make SiteHeader sticky and add --navbar-height CSS variable for dashboard offset`
4. **`7bf9234`** `feat(auth): add pass-through layout for (auth) route group, suppressing site footer`
5. **`e1108f4`** `feat(layout): add (marketing) route group with SiteFooter layout for public pages`
6. **`b95f4a8`** `refactor(layout): remove SiteFooter from root layout to enable per-route-group control`
7. **`40c80c4`** `refactor(structure): group navbar and site chrome components under components/layout`
8. **`60c5f45`** `refactor(structure): move dashboard components from app/components to components/dashboard`
9. **`36df29e`** `refactor(structure): move sidebar components from app/components to components/sidebar`

---

## Layout Restructure — Route-Group–Based Footer & Dashboard Offset

### Goal
Fix HireLoop layout so:
- **Public pages** (`/`, `/jobs`, `/company`, `/pricing`): Navbar + content + footer.
- **Auth pages** (`/sign-in`, `/sign-up`): Navbar + full-screen auth UI, **no footer**.
- **Dashboard pages** (`/dashboard/*`): Sticky navbar + role-based sidebar below navbar + content, **no footer**.

### Strategy: Route Group Layouts
Next.js App Router route groups (parenthesised folders) allow separate layouts without changing URL paths.

```
app/
├── layout.tsx                  # ROOT: ThemeProvider + SiteHeader (global — no footer)
├── (marketing)/
│   ├── layout.tsx              # Adds SiteFooter to public pages only
│   ├── page.tsx                # / (home)
│   ├── jobs/page.tsx           # /jobs
│   ├── company/page.tsx        # /company
│   └── pricing/page.tsx        # /pricing
├── (auth)/
│   ├── layout.tsx              # Pass-through (no footer — auth UI fills viewport)
│   ├── sign-in/page.tsx
│   └── sign-up/page.tsx
└── dashboard/
    └── layout.tsx              # DashboardShell: role-aware sidebar + no footer
```

### Key Changes

| File | Change |
|------|--------|
| `app/layout.tsx` | Removed `<SiteFooter />` — now only `<SiteHeader />` is global |
| `app/(marketing)/layout.tsx` | **New** — renders `<SiteFooter />` for public pages only |
| `app/(marketing)/page.tsx` | Moved from `app/page.tsx` |
| `app/(marketing)/jobs/page.tsx` | Moved from `app/jobs/page.tsx` |
| `app/(marketing)/company/page.tsx` | Moved from `app/company/page.tsx` |
| `app/(marketing)/pricing/page.tsx` | Moved from `app/pricing/page.tsx` |
| `app/(auth)/layout.tsx` | **New** — minimal pass-through, suppresses footer |
| `components/layout/site-header.tsx` | Changed `relative z-40` → `sticky top-0 z-50` |
| `app/globals.css` | Added `--navbar-height: 4rem` (4.5rem at `lg:`) + dashboard sidebar CSS offset rule |
| `components/dashboard/dashboard-shell.tsx` | Added `--dashboard-top` CSS var on `SidebarProvider`; constrained shell height to `100svh - navbar`; sidebar container offset via CSS selector |

### Structure Reorganization (latest)
- Dissolved `app/components/` into `components/` (`sidebar/`, `dashboard/`) so `app/` holds routes only.
- Grouped global chrome & navbar components into `components/layout/`; `components/auth/` now contains only credential form components.
- Moved the shared placeholder page to `components/marketing/`, removed the stale unused `components/hero-section.tsx` and leftover `.gitkeep` files.
- See `## Component Architecture & Structure` for the final tree.

### CSS Sidebar Offset Mechanism
The shadcn `Sidebar` component uses `fixed inset-y-0` for its panel container. To push it below the sticky navbar without editing the generated component:

```css
/* globals.css — targets the sidebar-container inside a DashboardShell */
[data-slot="sidebar-wrapper"]:has(> [data-slot="sidebar"]) [data-slot="sidebar-container"] {
  top: var(--dashboard-top, 0);
  height: calc(100svh - var(--dashboard-top, 0));
}
```

`DashboardShell` sets `--dashboard-top: var(--navbar-height)` on `SidebarProvider` via `style`, so this rule only applies inside dashboard layouts.

### Commits for This Task
46. **`b95f4a8`** `refactor(layout): remove SiteFooter from root layout to enable per-route-group control`
47. **`e1108f4`** `feat(layout): add (marketing) route group with SiteFooter layout for public pages`
48. **`7bf9234`** `feat(auth): add pass-through layout for (auth) route group, suppressing site footer`
49. **`852c161`** `fix(header): make SiteHeader sticky and add --navbar-height CSS variable for dashboard offset`
50. **`29eb7c0`** `fix(dashboard): offset sidebar below sticky navbar using --dashboard-top CSS variable`

### Verification
- **TypeScript (`tsc --noEmit`):** ✅ 0 errors (after clearing stale `.next` cache).
- **ESLint:** ✅ 0 errors, 0 warnings.
- **Routes:** `/`, `/jobs`, `/company`, `/pricing` → navbar + content + footer.
- **Auth:** `/sign-in`, `/sign-up` → navbar + full-screen auth portal, no footer.
- **Dashboard:** `/dashboard/*` → sticky navbar + role sidebar offset below navbar + content, no footer.
- **Git:** 5 clean conventional commits, no history rewritten, pushed to `main`.

