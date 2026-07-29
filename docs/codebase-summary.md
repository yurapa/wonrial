# WONRIAL Codebase Summary

**Last Updated**: 2026-07-28
**Version**: 26.07.3
**Language**: TypeScript 6.0.3
**Framework**: Next.js 16.2.12 + React 19.2.8
**Status**: Recently updated (AI SDK v7 migration, dependency updates)

## Quick Overview

WONRIAL is a multilingual SaaS landing page with integrated AI chat. Built with modern tech stack, it features 31 React components, i18n support for 3 languages (EN/RU/UK), dark/light theming, and Groq LLM integration for customer support chat.

## Directory Structure

```
wonrial/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Dynamic locale routing (en, ru, uk)
│   │   │   ├── layout.tsx     # Root layout with providers
│   │   │   ├── page.tsx       # Home page (7 sections)
│   │   │   ├── not-found.tsx  # 404 page
│   │   │   ├── ai/
│   │   │   │   └── page.tsx   # AI chat page
│   │   │   ├── contact/
│   │   │   │   └── page.tsx   # Contact form page
│   │   │   └── services/
│   │   │       └── page.tsx   # Services listing
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts   # AI streaming endpoint
│   │   ├── robots.ts          # SEO robots.txt
│   │   ├── sitemap.ts         # Dynamic XML sitemap
│   │   └── providers.tsx      # Next-themes + i18n providers
│   ├── components/             # 31 React components
│   │   ├── ai/                # AI chat UI
│   │   ├── about/             # About sections
│   │   ├── analytics/         # GTM event tracking
│   │   ├── button/            # Reusable button
│   │   ├── contact/           # Contact info component
│   │   ├── features/          # Feature cards (6 features)
│   │   ├── footer/            # Footer navigation
│   │   ├── header/            # Header/navigation
│   │   ├── hero/              # Hero landing section
│   │   ├── language-switcher/ # Locale selector
│   │   ├── modal/             # Accessible modal
│   │   ├── pricing/           # Pricing plans
│   │   ├── ready-to-help/     # CTA section
│   │   ├── scroll-to-top/     # Back to top button
│   │   ├── section-title/     # Section headers
│   │   ├── technologies/      # Tech partner logos
│   │   ├── testimonials/      # Social proof (3+ reviews)
│   │   ├── theme-switcher/    # Dark/light toggle
│   │   └── top-banner/        # Announcement banner
│   ├── i18n/                  # Internationalization
│   │   ├── settings.ts        # i18next configuration
│   │   ├── server.ts          # Server-side i18n helpers
│   │   ├── client.ts          # Client-side i18n hooks
│   │   └── locales/           # Translation JSON files
│   │       ├── en.json        # English translations
│   │       ├── ru.json        # Russian translations
│   │       └── uk.json        # Ukrainian translations
│   ├── layout/                # Layout wrapper components
│   │   ├── header/            # Navigation header
│   │   ├── footer/            # Footer
│   │   ├── layout/            # Main layout wrapper
│   │   └── login/             # OAuth + email auth UI
│   ├── styles/                # Global CSS
│   │   ├── global.css         # Tailwind + theme variables
│   │   ├── normalize.css      # CSS reset
│   │   └── utils.module.css   # Utility classes
│   ├── types/                 # TypeScript type definitions
│   │   ├── feature.ts         # Feature card type
│   │   ├── menu.ts            # Navigation menu type
│   │   ├── tech.ts            # Technology type
│   │   └── testimonial.ts     # Testimonial type
│   ├── utils/                 # Utility functions
│   │   └── portal.tsx         # React Portal component
│   ├── proxy.ts               # API proxy/client
│   └── app.config.ts          # Application configuration
├── public/                     # Static assets
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS + autoprefixer
├── eslint.config.js           # ESLint configuration
├── package.json               # Dependencies & scripts
└── README.md                  # Project overview
```

## Core Files & Purposes

### Application Entry Points

**`src/app/providers.tsx`**
- Provider wrapper for entire app
- Initializes Next-themes for dark/light mode
- Sets up i18n context (react-i18next)
- Wraps with Tailwind CSS config

**`src/app/[locale]/layout.tsx`**
- Root layout for all locale-specific routes
- Loads language-specific content
- Sets HTML lang attribute
- Configures metadata (title, description, Open Graph)
- Includes header and footer

**`src/app/[locale]/page.tsx`**
- Home page with 7 sections:
  1. Hero section (CTA)
  2. Features grid (6 features)
  3. Pricing plans
  4. Testimonials (3+)
  5. About company
  6. Technologies/partners
  7. Ready to help (CTA with modal)

### API Routes

**`src/app/api/chat/route.ts`**
- Streaming AI chat endpoint
- Uses Vercel AI SDK v7 with dedicated @ai-sdk/groq provider (v4.0.15)
- Simplified API implementation using `createGroq()` helper
- Model: llama3-8b-8192
- Receives a `UIMessage[]` array in POST body, converted for the model with `await convertToModelMessages()`
- Streams response chunks to client via `toUIMessageStreamResponse()`
- Requires `GROQ_API_KEY` env var

**`src/app/api/contact/route.ts`**
- Contact-form endpoint: validates, screens the honeypot, then sends two emails via Resend
- Ticket to `CONTACT_TO_EMAIL` with `replyTo` = submitter; localized confirmation to the
  submitter with `replyTo` = `CONTACT_TO_EMAIL`
- A failed confirmation is logged but still returns 200 - the ticket is already delivered
- Requires `RESEND_API_KEY` and `CONTACT_TO_EMAIL` env vars

**`src/utils/contact-email.ts`**
- Resolves `VERCEL_ENV` to pick the sender (`info@` in production, `info-dev@` elsewhere),
  the subject prefix and the Resend `env` tag
- Builds the HTML and plain-text bodies, escaping every interpolated value

**`src/utils/turnstile.ts`**
- Verifies a Turnstile token against Cloudflare's siteverify endpoint
- Fails closed: anything other than an explicit success counts as unverified
- Requires `TURNSTILE_SECRET_KEY`

**`src/types/contact.ts`**
- Submission, request and response types shared by the route and the form

### SEO & Metadata

**`src/app/robots.ts`**
- Generates `robots.txt`
- Allows crawling for production
- Disallows for staging/dev

**`src/app/sitemap.ts`**
- Generates XML sitemap
- Includes all locales (en, ru, uk)
- Includes all pages (home, ai, contact, services)
- Adds hreflang tags for SEO

### Internationalization

**`src/i18n/settings.ts`**
- Configures i18next
- Defines 3 locales: en, ru, uk
- Sets default locale: en
- Loads translations from JSON files

**`src/i18n/server.ts`**
- Server-side translation helper
- Used in Server Components
- Function: `createTranslation(locale, namespace)` — async, returns `{ t }`

**`src/i18n/client.ts`**
- Client-side i18n hook
- Function: `useTranslation()` from react-i18next
- Used in Client Components

**`src/i18n/locales/*.json`**
- Translation dictionaries
- Keys: feature names, section titles, form labels, etc.
- Format: Nested object structure for organization

### Styling

**`src/styles/global.css`**
- Global Tailwind CSS import
- CSS variables for theme colors
- Dark mode variables
- Component-specific utilities

**`tailwind.config.js`**
- Tailwind CSS configuration
- Dark mode support
- Custom color palette
- Font configuration
- Responsive breakpoints

**`postcss.config.js`**
- PostCSS plugins: Tailwind CSS, autoprefixer
- Processes CSS from Tailwind classes

### Type Definitions

**`src/types/feature.ts`** - Feature card type
```typescript
interface Feature {
  id: string
  title: string
  description: string
  icon: string
}
```

**`src/types/testimonial.ts`** - Testimonial type
```typescript
interface Testimonial {
  id: string
  name: string
  company: string
  text: string
  rating: number
}
```

**`src/types/tech.ts`** - Technology partner type
```typescript
interface Technology {
  id: string
  name: string
  logo: string
  url?: string
}
```

**`src/types/menu.ts`** - Navigation menu type
```typescript
interface MenuItem {
  id: string
  label: string
  href: string
  children?: MenuItem[]
}
```

### Configuration Files

**`next.config.js`**
- Build output directory: `build/`
- SASS loader configuration
- Turbopack TLS settings for dev
- Image optimization

**`tsconfig.json`**
- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- Target: ES2017 (type checking only; `noEmit` is set, so browser output is produced by SWC per `.browserslistrc`)
- Module: ESNext + bundler resolution
- Output: `build/` directory

**`eslint.config.js`**
- Flat config format
- TypeScript parser
- Next.js plugin (eslint-plugin-react-hooks 7.0.1)
- ESLint recommended rules
- React plugin with exhaustive deps enforcement
- Ignores: build/, node_modules/, .next/, .claude/**

**`package.json`**
- Dependencies: React 19.2.8, Next.js 16.2.12, TypeScript 6.0.3
- i18n: i18next 26.3.6, react-i18next 17.0.11
- AI: ai SDK 7.0.40, @ai-sdk/groq 4.0.15, @ai-sdk/react 4.0.43
- Styling: Tailwind CSS 4.3.3, SASS 1.102.0
- Dev tools: ESLint 9.39.5, Prettier 3.9.6, TypeScript 6.0.3, eslint-plugin-react-hooks 7.1.1

## Component Architecture

### 31 Components

**Layout Components** (3)
- Header: Navigation, theme switcher, language switcher
- Footer: Links, copyright, contact info
- Layout: Main page wrapper

**Landing Page Sections** (10)
- Hero: Main headline + CTA button
- Features: 6 feature cards in grid
- Pricing: Plan cards with comparison
- Testimonials: 3+ customer reviews
- About: Company information (2 variants)
- Technologies: Partner logos grid
- ReadyToHelp: Final CTA section
- TopBanner: Announcement banner

**UI Components** (8)
- Button: Reusable button (variants: primary, secondary)
- Modal: Accessible dialog with Radix UI
- SectionTitle: Consistent section headers
- ThemeSwitcher: Dark/light toggle
- LanguageSwitcher: Locale selector
- ScrollToTop: Back-to-top button
- TopBanner: Notification banner
- Analytics: GTM event tracking

**Feature-Specific** (10)
- AI Chat: Message interface, input, streaming display
- Contact: Contact form, info display
- Services: Service listing page

### Component Patterns

**Server Components** (Default)
- All pages are Server Components
- Benefits: No hydration overhead, direct DB access
- Used for: Pages, layouts, data fetching

**Client Components** (Where Needed)
- Marked with `'use client'` directive
- Used for: Interactivity (forms, theme switcher, chat)
- Examples: Modal, theme switcher, AI chat UI

**Props & Composition**
- TypeScript interfaces for all props
- Destructured props in function signatures
- Tailwind CSS for styling
- No CSS-in-JS (Tailwind preferred)

## Data Flow

### Multilingual Routing
```
User request → URL parsing → Locale detection
  ↓
[locale] parameter extracted (en/ru/uk)
  ↓
Page rendered with locale context
  ↓
i18next loads translations for locale
  ↓
Content displayed in selected language
```

### Theme Management
```
App starts → next-themes provider
  ↓
Reads localStorage for theme preference
  ↓
Sets data-theme attribute on <html>
  ↓
Tailwind CSS dark: variant applies styles
  ↓
User toggles theme → localStorage updated
  ↓
Re-render with new theme
```

### AI Chat Flow
```
User types message → Client component
  ↓
POST to /api/chat with messages array
  ↓
API route calls Groq via @ai-sdk/groq provider
  ↓
Streams response via llama3-8b-8192 model
  ↓
Chat UI displays streaming text via toUIMessageStreamResponse()
  ↓
Message added to history
```

### Analytics Tracking
```
Page load → GTM container loads
  ↓
GTM ID from NEXT_PUBLIC_GTM_ID
  ↓
Page view events tracked
  ↓
User interactions tagged
  ↓
Events sent to Google Analytics
```

## Key Technologies Used

### Frontend Framework
- **Next.js 16.2.12**: App Router, server components, built-in optimization
- **React 19.2.8**: Component library, hooks, concurrent features
- **TypeScript 6.0.3**: Type safety, strict mode enabled

### Styling & Design
- **Tailwind CSS 4.3.3**: Utility-first CSS framework
- **SASS 1.102.0**: CSS preprocessing, variables, mixins
- **next-themes 0.4.6**: Dark/light mode switching
- **CSS Variables**: Theme colors, spacing, typography

### Internationalization
- **i18next 26.3.6**: Translation engine
- **react-i18next 17.0.11**: React bindings
- **i18next-browser-languagedetector 8.2.1**: Auto locale detection
- **i18next-resources-to-backend 1.2.1**: Backend integration

### AI & Chat
- **ai 7.0.40**: Vercel AI SDK for LLM integration
- **@ai-sdk/groq 4.0.15**: Dedicated Groq provider for ultra-fast LLM inference
- **@ai-sdk/react 4.0.43**: React bindings for `useChat` (separate package since AI SDK v5)
- **createGroq()**: Simplified provider instantiation in API route
- **Groq**: LLM inference provider (model: llama3-8b-8192, < 100ms latency)

### Analytics & Monitoring
- **Google Tag Manager**: Event tracking (via env var)

### Development Tools
- **ESLint 9.39.5**: Code quality & style enforcement
- **Prettier 3.9.6**: Code formatting
- **TypeScript Compiler**: Type checking without emit
- **PostCSS 8.5.24**: CSS transformation pipeline
- **Autoprefixer 10.5.4**: Browser vendor prefixes not covered by Tailwind (e.g. `-webkit-background-clip`) and prefixes for hand-written CSS/SCSS

## Build & Deployment

### Build Process
```bash
npm run build
↓
TypeScript compilation → type checking
↓
ESLint validation (if configured)
↓
Next.js optimization:
  - Code splitting
  - Tree shaking
  - Image optimization
  - CSS minification
↓
Output to build/ directory
```

### Development Server
```bash
npm run dev
↓
Starts on http://localhost:3000
↓
Hot Module Replacement (HMR) enabled
↓
Changes instantly reflect in browser
↓
Source maps for debugging
```

### Production Deployment
**Host**: Vercel
**Process**:
1. Push to GitHub main branch
2. Vercel webhook triggered
3. Automatic build & test
4. Deploy to wonrial.com
5. CDN caching enabled

## Environment Variables

### Required
```
GROQ_API_KEY              # Groq LLM API key for AI chat
NEXT_PUBLIC_GTM_ID        # Google Tag Manager ID
```

### Optional
```
NEXT_PUBLIC_API_URL       # API base URL (if applicable)
NODE_ENV                  # development/production
```

## Dependencies Summary

### Runtime Dependencies (14)
- react, react-dom, next (core framework)
- i18next, react-i18next, i18next-* (translations)
- ai, @ai-sdk/groq, @ai-sdk/react (LLM integration with Groq)
- next-themes (dark mode)
- react-icons (icons)
- classnames (className utility)
- lodash (utility functions)

### Dev Dependencies (22)
- TypeScript, @types/* (type safety)
- ESLint, Prettier (code quality)
- Tailwind CSS, PostCSS, SASS (styling)
- @tailwindcss/postcss (Tailwind integration)

## Performance Optimizations

### Next.js Level
- Server Components reduce JS bundle
- Image optimization via Next.js Image
- Automatic code splitting
- Static generation where possible
- CSS-in-JS avoidance (Tailwind)

### Rendering
- Streaming HTML for faster FCP
- Lazy loading components
- Hydration boundaries clear
- No unnecessary client-side JavaScript

### Assets
- Minified CSS/JS in production
- Tree shaking removes unused code
- Image optimization & WebP
- Gzip compression via Vercel

### Caching
- Vercel Edge caching
- Browser cache headers
- Immutable asset paths
- ISR (Incremental Static Regeneration) if needed

## Code Quality Standards

### TypeScript
- Strict mode enabled
- No implicit any
- Exhaustive type checking
- Path aliases for clean imports

### Linting
- ESLint with Next.js plugin
- React Hooks rules enforced
- No console logs in production
- Import sorting

### Formatting
- Prettier with consistent rules
- 2-space indentation
- Single quotes
- Semicolons required

### Testing
- Manual testing (no test framework configured)
- Browser testing via Vercel preview
- Performance testing via Web Vitals

## Extension Points

### Adding New Pages
1. Create `src/app/[locale]/[feature]/page.tsx`
2. Fetch translations via `await createTranslation(locale, 'common')`
3. Export layout if custom layout needed
4. Add to sitemap.ts if public

### Adding New Components
1. Create component file in `src/components/`
2. Define TypeScript interface for props
3. Use Tailwind CSS for styling
4. Wrap in 'use client' if interactive

### Adding New Translations
1. Add key to JSON in `src/i18n/locales/`
2. Add to all 3 language files (en, ru, uk)
3. Use `useTranslation()` (client) or `createTranslation()` (server) to access
4. Test in all languages

### Adding New Features
1. Create feature branch: `feature/feature-name`
2. Implement in components/
3. Add i18n strings
4. Test across locales & themes
5. Update documentation
6. Push to main

## File Statistics

- **Total Components**: 31
- **Total Pages**: 5 (home, ai, contact, services, 404)
- **API Routes**: 2 (/api/chat, /api/contact)
- **Supported Locales**: 3 (en, ru, uk)
- **TypeScript Files**: ~50+
- **CSS Files**: 3 (global + utilities)

## Quick Reference

### Most Used Imports
```typescript
import { useTranslation } from 'react-i18next'    // Get translations
import { useTheme } from 'next-themes'             // Access theme
import classNames from 'classnames'                // className utility
import { generateMetadata } from 'next'            // Metadata generation
import { createTranslation } from '@/i18n/server'  // Server-side i18n
```

### Common Patterns
```typescript
// Server Component with translations
export const generateMetadata = async ({ params }) => {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'common')
  return { title: t('home.title') }
}

// Client Component with theme
'use client'
const { theme, setTheme } = useTheme()

// Using translations
const { t, i18n } = useTranslation()
return <h1>{t('section.title')}</h1>
```

## Unresolved Questions

1. **Database Backend**: contact submissions are emailed, not persisted - is storage wanted?
2. **Rate limiting**: none; Turnstile and the honeypot carry bot protection today
3. **Authentication**: Plan for user login/registration?
4. **Testing**: Any test framework (Jest, Vitest) planned?
5. **CI/CD**: GitHub Actions workflow configured?
