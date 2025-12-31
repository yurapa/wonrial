# WONRIAL - AI-Powered SaaS Landing Page

Modern, multilingual SaaS landing page with integrated AI chat. Built with Next.js 16, React 19, TypeScript, and Groq LLM.

**Production**: [wonrial.com](https://wonrial.com)
**Preview**: [wonrial.vercel.app](https://wonrial.vercel.app)

## Quick Start

```bash
npm install        # Install dependencies
npm run dev       # Start dev server (localhost:3000)
npm run build     # Build for production
npm run lint      # Check code quality
npm run typecheck # Validate TypeScript
```

## Key Features

- **Multilingual**: English, Russian, Ukrainian (path-based routing `/en/*`, `/ru/*`, `/uk/*`)
- **AI Chat**: Groq-powered streaming responses at `/[locale]/ai` with sub-100ms latency
- **Dark Mode**: next-themes with localStorage persistence
- **Landing Page**: 7 sections (hero, features, pricing, testimonials, about, tech, CTA)
- **Responsive**: Mobile-first Tailwind CSS design
- **SEO**: Dynamic sitemap, robots.txt, hreflang tags for all locales
- **Analytics**: Google Tag Manager + Vercel Speed Insights
- **Performance**: Server Components, code splitting, Vercel edge optimization

## Tech Stack

| Category | Tech |
|----------|------|
| **Framework** | Next.js 16.1.1, React 19.2.3, TypeScript 5.9.3 |
| **Styling** | Tailwind CSS 4.1.18, SASS 1.97.1 |
| **i18n** | i18next 25.7.3, react-i18next 16.5.0 (3 locales) |
| **AI** | Vercel AI SDK 4.3.19 + @ai-sdk/groq 1.2.9 |
| **Theme** | next-themes 0.4.6 (dark/light mode) |
| **Hosting** | Vercel (auto-deploy) |
| **Dev Tools** | ESLint 9.39.2, Prettier 3.7.4 |

## Environment Variables

```
GROQ_API_KEY             # Groq API key (required for chat)
NEXT_PUBLIC_GTM_ID       # Google Tag Manager ID (optional)
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Dynamic locale routing
│   ├── api/chat/route.ts  # Groq AI streaming endpoint
│   └── providers.jsx      # Theme & i18n providers
├── components/            # 31 React components (7 landing + UI + AI)
├── i18n/                  # Translations (EN, RU, UK)
├── styles/                # Tailwind CSS + global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Documentation

- **[Project Overview](./docs/project-overview-pdr.md)** - Features, requirements, roadmap
- **[Code Standards](./docs/code-standards.md)** - Naming, patterns, best practices
- **[System Architecture](./docs/system-architecture.md)** - Technical design
- **[Codebase Summary](./docs/codebase-summary.md)** - File organization, components

## Development

### Commands

```bash
npm run dev           # Start dev server with HMR
npm run build         # Build production bundle
npm run start         # Run production server locally
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format with Prettier
npm run typecheck     # Type validation
```

### Deployment

Auto-deploys on push to `main` branch via Vercel webhook.

## Locales

- `/en/*` - English (default)
- `/ru/*` - Russian
- `/uk/*` - Ukrainian

## Pages

- `[locale]/` - Home (hero + 7 sections)
- `[locale]/ai` - AI chat interface
- `[locale]/contact` - Contact information
- `[locale]/services` - Services listing
- `[locale]/404` - Custom 404 page

## Component Organization

31 components organized by feature:
- **Layout** (3): Header, Footer, Layout wrapper
- **Landing** (10): Hero, Features, Pricing, Testimonials, About, Technologies, CTA
- **UI** (8): Button, Modal, ThemeSwitcher, LanguageSwitcher, SectionTitle, etc.
- **Feature-Specific** (10): ChatUI, ChatInput, ContactForm, ServiceCard, etc.

## Performance Targets

- **Lighthouse**: > 90
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **Core Web Vitals**: All green

## Documentation

- **[Project Overview & PDR](./docs/project-overview-pdr.md)** - Features, requirements, tech stack
- **[Code Standards](./docs/code-standards.md)** - Naming, patterns, best practices
- **[System Architecture](./docs/system-architecture.md)** - Technical design, data flow
- **[Codebase Summary](./docs/codebase-summary.md)** - File organization, components

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Groq API](https://console.groq.com/docs/speech-text)
- [Vercel Docs](https://vercel.com/docs)