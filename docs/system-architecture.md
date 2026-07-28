# WONRIAL System Architecture

**Last Updated**: 2026-07-28
**Version**: 26.07.0
**Status**: Production (wonrial.com)
**Recent**: AI SDK v7 migration, TypeScript 6, dependency refresh, Speed Insights removed

## Architecture Overview

WONRIAL is a modern Next.js 16 SaaS landing page with integrated AI chat. The architecture follows a client-server model with server-side rendering (SSR), static generation, and client-side interactivity where needed.

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Next.js Client Application                │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ • React 19 Components (Server & Client)             │  │
│  │ • Tailwind CSS Styling                              │  │
│  │ • next-themes (Dark/Light Mode)                     │  │
│  │ • react-i18next (Translations)                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │ HTTP/HTTPS
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Vercel Edge Network (CDN)                      │
├─────────────────────────────────────────────────────────────┤
│ • Static Asset Caching                                      │
│ • Edge Function Execution                                  │
│ • Automatic HTTPS & Compression                            │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│               Next.js Server (Vercel)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │         Pages & Layouts (Server Components)        │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ • [locale]/page.tsx (Home page)                   │   │
│  │ • [locale]/layout.tsx (Layout with i18n)         │   │
│  │ • [locale]/ai/page.tsx (AI chat page)            │   │
│  │ • [locale]/contact/page.tsx (Contact page)       │   │
│  │ • [locale]/services/page.tsx (Services page)     │   │
│  └────────────────────────────────────────────────────┘   │
│                           │                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │           API Routes (Backend)                     │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ • /api/chat (POST) - AI streaming endpoint        │   │
│  └────────────────────────────────────────────────────┘   │
│                           │                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │          Middleware & Utilities                    │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ • i18n (Translations)                             │   │
│  │ • next-themes (Theme Management)                  │   │
│  │ • SEO (robots.ts, sitemap.ts)                    │   │
│  │ • Error Boundaries & 404 handling                │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                           ├─→ Groq API (LLM)
                           └─→ Google Analytics (GTM)
```

## Core Components

### 1. Routing System

**Type**: Path-based dynamic routing with locale prefix

```
URL Structure: /:locale/:page
├── /en/              (English home)
├── /en/ai            (AI chat - English)
├── /en/contact       (Contact - English)
├── /en/services      (Services - English)
├── /ru/              (Russian home)
├── /ru/ai            (AI chat - Russian)
└── /uk/              (Ukrainian home)
```

**Implementation**: Next.js dynamic segments `[locale]`
**Supported Locales**: en, ru, uk
**Default Locale**: en

### 2. Page Structure

#### Home Page (`[locale]/page.tsx`)
**Sections** (7 total):
1. Hero - Main headline + CTA button
2. Features - 6 service features
3. Pricing - Plan comparison
4. Testimonials - Customer reviews (3+)
5. About - Company information
6. Technologies - Partner logos
7. Ready to Help - Final CTA + modal

**Components Used**:
- Hero, Features, Pricing, Testimonials, About, Technologies, ReadyToHelp

**Features**:
- Server Component (no JavaScript hydration overhead)
- Dynamic metadata generation per locale
- All content translated via i18n

#### AI Chat Page (`[locale]/ai/page.tsx`)
**Purpose**: Interactive chat interface with Groq LLM

**Components**:
- Chat message display
- Input field with send button
- Message history
- Theme-aware styling

**Features**:
- Real-time streaming responses
- Conversation context maintained
- Mobile responsive
- Dark/light mode support

#### Contact Page (`[locale]/contact/page.tsx`)
**Purpose**: Contact information and form

**Sections**:
- Contact information display
- Contact form (if backend available)
- Map/location info (future)

**Features**:
- Form validation
- Error handling
- Success feedback

#### Services Page (`[locale]/services/page.tsx`)
**Purpose**: Detailed services listing

**Features**:
- Service cards with descriptions
- Icons and visual styling
- Call-to-action buttons

### 3. Component Architecture

**31 Components Organized by Type**:

#### Layout Components (3)
- **Header**: Navigation, theme switcher, language selector
  - Logo/branding
  - Navigation menu
  - Theme toggle (light/dark)
  - Language dropdown

- **Footer**: Links and contact info
  - Social links
  - Company links
  - Copyright notice

- **Layout**: Main wrapper
  - Header + Footer structure
  - Content area

#### Landing Page Sections (10)
- **Hero**: Hero section with CTA
- **Features**: 6 feature cards grid
- **Pricing**: Pricing plans comparison
- **Testimonials**: Customer reviews carousel
- **About**: Company info (2 variants)
- **Technologies**: Partner logos grid
- **ReadyToHelp**: CTA section with modal
- **TopBanner**: Announcement banner

#### UI Components (8)
- **Button**: Reusable button component
  - Variants: primary, secondary, small
  - States: normal, hover, disabled

- **Modal**: Accessible dialog
  - Open/close animations
  - Click outside to close
  - Escape key support

- **SectionTitle**: Consistent headers
- **ThemeSwitcher**: Dark/light toggle
- **LanguageSwitcher**: Locale selector
- **ScrollToTop**: Back-to-top button
- **TopBanner**: Notification banner
- **Analytics**: GTM event tracker

#### Feature-Specific Components (10)
- **AI Chat**:
  - ChatMessage (display)
  - ChatInput (user input)
  - ChatHistory (message list)
  - ChatContainer (wrapper)

- **Contact**:
  - ContactForm
  - ContactInfo

- **Services**:
  - ServiceCard
  - ServiceList

### 4. API Routes

#### `/api/chat` (POST)
**Purpose**: Stream AI responses from Groq LLM

**Request**: a `UIMessage[]` array as sent by `useChat`; each message carries typed `parts`
```json
{
  "messages": [
    {
      "id": "msg-1",
      "role": "user",
      "parts": [{ "type": "text", "text": "What services do you offer?" }]
    }
  ]
}
```

**Response** (Streaming):
```
UI message stream; text chunks arrive progressively and are reassembled by useChat
```

**Implementation**:
- Uses Vercel AI SDK (`ai` v7.0.40)
- Dedicated Groq provider (`@ai-sdk/groq` v4.0.15)
- Simplified setup with `createGroq()` helper function
- `await convertToModelMessages()` strips UI metadata before the model call
- Returns `result.toUIMessageStreamResponse()`
- `GROQ_API_KEY` environment variable for authentication

**Features**:
- Streaming responses for real-time feel (< 100ms latency)
- llama3-8b-8192 model for fast inference
- Error handling and fallbacks
- Rate limiting (Groq API limits)

### 5. Internationalization (i18n)

**Architecture**: i18next + react-i18next

```
Translation Flow:
┌─────────────┐
│   Request   │
│  /ru/home   │
└──────┬──────┘
       │
       ↓
┌─────────────────────┐
│  [locale] extracted │
│   locale = 'ru'     │
└──────┬──────────────┘
       │
       ↓
┌──────────────────────────────┐
│ Load i18next settings        │
│ for 'ru' locale              │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│ Load src/i18n/locales/ru.json│
│ Translation dictionary        │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│ Provide via context          │
│ useTranslation() / t()       │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│ Component renders with       │
│ translated content           │
└──────────────────────────────┘
```

**Server-Side i18n** (`src/i18n/server.ts`):
```typescript
const { t } = await createTranslation('en', 'common')
const title = t('home.title')
```

**Client-Side i18n** (`src/i18n/client.ts`):
```typescript
const { t, i18n } = useTranslation()
return <h1>{t('home.title')}</h1>
```

**Locales Supported**:
- English (en) - Default
- Russian (ru)
- Ukrainian (uk)

**Translation Structure**:
```json
{
  "home": {
    "title": "Welcome",
    "sections": {
      "features": "Features",
      "pricing": "Pricing"
    }
  }
}
```

### 6. Styling System

**Architecture**: Tailwind CSS 4 + next-themes + SASS

```
Styling Pipeline:
┌──────────────────┐
│  Component JSX   │
│  className=""    │
└────────┬─────────┘
         │
         ↓
┌──────────────────────────┐
│  Tailwind CSS Utilities  │
│  (Utility-first)         │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│  PostCSS Processing      │
│  (includes autoprefixer) │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│  CSS Variables (Themes)  │
│  --color-primary: ...    │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│  Dark Mode Support       │
│  dark: prefix variant    │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│  Browser Styles Applied  │
└──────────────────────────┘
```

**Theme Management** (next-themes):

```typescript
// In layout/providers:
<ThemeProvider attribute="class" defaultTheme="light">
  {children}
</ThemeProvider>

// In component:
const { theme, setTheme } = useTheme()
// Reads: html[class*="dark"]
// Stores in localStorage
```

**Color Palette**:
- Light mode: White background, dark text
- Dark mode: Dark background, light text
- Accent colors: Primary (blue), secondary (gray)

**Responsive Breakpoints**:
```
sm: 640px    (tablets)
md: 768px    (small laptops)
lg: 1024px   (desktop)
xl: 1280px   (large desktop)
2xl: 1536px  (extra large)
```

### 7. Type System

**TypeScript Configuration**: Strict mode enabled

**Core Type Files**:

`src/types/feature.ts`:
```typescript
interface Feature {
  id: string
  title: string
  description: string
  icon: string
}
```

`src/types/testimonial.ts`:
```typescript
interface Testimonial {
  id: string
  name: string
  company: string
  text: string
  rating: number
}
```

`src/types/tech.ts`:
```typescript
interface Technology {
  id: string
  name: string
  logo: string
  url?: string
}
```

`src/types/menu.ts`:
```typescript
interface MenuItem {
  id: string
  label: string
  href: string
  children?: MenuItem[]
}
```

### 8. Data Flow

#### Multilingual Content Flow
```
1. User accesses /ru/home
   ↓
2. Next.js route: [locale]/page.tsx
   ↓
3. Extract locale: 'ru'
   ↓
4. Load translations: ru.json
   ↓
5. Render with Russian content
```

#### Theme Switching Flow
```
1. User clicks theme toggle
   ↓
2. next-themes updates context
   ↓
3. HTML element class changes
   ↓
4. Tailwind dark: styles apply
   ↓
5. localStorage persists choice
```

#### AI Chat Flow
```
1. User types message (input state held by the chat component)
   ↓
2. sendMessage() posts the UIMessage[] history to /api/chat
   ↓
3. Server converts UI messages to model messages, calls Groq API
   ↓
4. Stream response chunks as a UI message stream
   ↓
5. Chat component renders message.parts as they arrive
   ↓
6. Message added to history
```

## Technology Stack

### Frontend Framework
- **Next.js 16.2.12**
  - App Router (not Pages)
  - Server Components (RSC)
  - Static & dynamic rendering
  - Built-in optimization

- **React 19.2.8**
  - Functional components only
  - Hooks (useState, useEffect, etc.)
  - Concurrent rendering (future)
  - React 19 features (Actions, transitions)

- **TypeScript 6.0.3**
  - Strict mode enabled
  - Path aliases (@/*)
  - Type safety across codebase
  - Target ES2017; `es5` was removed because TypeScript 6 deprecates it

### Styling
- **Tailwind CSS 4.3.3**
  - Utility-first CSS framework
  - Dark mode support via class
  - Responsive design utilities
  - Custom CSS variables for themes

- **SASS 1.102.0**
  - CSS preprocessing
  - Variables, mixins, nesting
  - Optional (Tailwind preferred)

- **PostCSS 8.5.24**
  - Tailwind CSS plugin
  - Autoprefixer for vendor prefixes Tailwind's own pipeline omits, and for hand-written CSS/SCSS

### Internationalization
- **i18next 26.3.6**
  - Translation engine
  - Multiple locale support
  - Namespacing for organization

- **react-i18next 17.0.11**
  - React hook integration
  - useTranslation() hook
  - Context provider

- **i18next-browser-languagedetector 8.2.1**
  - Auto locale detection
  - Browser language preference

- **i18next-resources-to-backend 1.2.1**
  - JSON file backend
  - Server-side rendering support

### AI & Chat
- **ai 7.0.40** (Vercel AI SDK)
  - Provider-agnostic LLM integration
  - Streaming support
  - Parts-based UI message model

- **@ai-sdk/groq 4.0.15**
  - Dedicated Groq provider
  - Native Groq API integration
  - Simplified provider initialization with `createGroq()`

- **@ai-sdk/react 4.0.43**
  - `useChat` hook, split out of the `ai` package in SDK v5
  - Exposes `messages`, `sendMessage`, `status`; input state is owned by the component

- **Groq**
  - LLM inference provider
  - Ultra-fast inference (< 100ms)
  - llama3-8b-8192 model
  - Optimized for streaming responses

### Theme & UI
- **next-themes 0.4.6**
  - Dark/light mode management
  - localStorage persistence
  - SSR-safe theme switching

- **react-icons 5.7.0**
  - Icon library (Feather, Material, etc.)
  - Tree-shakeable
  - Lightweight SVG icons

- **classnames 2.5.1**
  - Conditional className utility
  - TypeScript support

### Analytics
- **Google Tag Manager** (via env var)
  - Event tracking
  - Conversion tracking
  - Audience segmentation

> Vercel Speed Insights was removed on 2026-07-28. Core Web Vitals and real-user
> monitoring are currently not collected.

### Development Tools
- **ESLint 9.39.5**
  - Code quality linting
  - TypeScript parser
  - Next.js plugin
  - React Hooks rules (eslint-plugin-react-hooks 7.1.1)
  - Ignores: build/, node_modules/, .next/, .claude/**
  - Pinned to 9.x while eslint-plugin-react, eslint-plugin-import and eslint-plugin-jsx-a11y lack ESLint 10 peer support

- **Prettier 3.9.6**
  - Code formatting
  - Consistent style
  - Single quotes, 2 spaces

### Utilities
- **lodash 4.18.1**
  - Utility function library
  - Deep cloning, merging, etc.

- **@types/* (various)**
  - TypeScript type definitions

## Deployment Architecture

### Hosting: Vercel

```
┌─────────────────────────────────────┐
│      GitHub Repository              │
│  (wonrial/wonrial)                 │
└──────────────┬──────────────────────┘
               │ Push to main
               ↓
┌─────────────────────────────────────┐
│    GitHub Webhook                   │
└──────────────┬──────────────────────┘
               │ Triggers
               ↓
┌─────────────────────────────────────┐
│    Vercel Deployment                │
├─────────────────────────────────────┤
│ • Build Next.js project             │
│ • Run TypeScript check              │
│ • Run ESLint validation             │
│ • Generate optimized bundles        │
│ • Deploy to Edge Network            │
└──────────────┬──────────────────────┘
               │ Success
               ↓
┌─────────────────────────────────────┐
│  Production (wonrial.com)           │
├─────────────────────────────────────┤
│ • Global CDN (Edge)                 │
│ • Automatic HTTPS                   │
│ • Cache invalidation                │
│ • Monitoring & logs                 │
└─────────────────────────────────────┘
```

### Preview Deployment
- URL: wonrial.vercel.app
- Triggered on: Pull requests
- Purpose: Testing before production

### Environment Variables

**Production** (wonrial.com):
```
GROQ_API_KEY=<groq-api-key>
NEXT_PUBLIC_GTM_ID=<gtm-container-id>
NODE_ENV=production
```

**Development**:
```
GROQ_API_KEY=<groq-api-key>
NEXT_PUBLIC_GTM_ID=<gtm-container-id>
NODE_ENV=development
```

## Security Architecture

### Request Security
- **HTTPS Only**: Vercel enforces HTTPS
- **CSP Headers**: Content Security Policy configured
- **CORS**: Cross-origin requests validated

### Data Security
- **Secrets Management**: Environment variables only
- **API Keys**: Never hardcoded
- **Sensitive Data**: No logging to client

### Frontend Security
- **XSS Prevention**: React escapes by default
- **Injection Prevention**: Parameterized APIs
- **Input Validation**: Client & server-side

### Monitoring
- **Google Tag Manager**: Event and conversion tracking
- **Vercel platform logs**: Build and runtime output
- **Gap**: no Core Web Vitals / real-user monitoring since Speed Insights was removed

## Performance Optimization

### Build Time Optimization
- **Code Splitting**: Automatic per-page
- **Tree Shaking**: Unused code removal
- **Minification**: CSS/JS minified
- **Compression**: Gzip + Brotli

### Runtime Optimization
- **Server Components**: Reduced JS bundle
- **Image Optimization**: Next.js Image component
- **CSS-in-JS**: Avoided (Tailwind only)
- **Lazy Loading**: Code & component splitting

### Caching Strategy
- **Edge Cache**: Vercel global CDN
- **Browser Cache**: Immutable asset paths
- **Stale-While-Revalidate**: For dynamic content

### Monitoring
```
Core Web Vitals Targets:
├── LCP (Largest Contentful Paint): < 2.5s
├── FID (First Input Delay): < 100ms
└── CLS (Cumulative Layout Shift): < 0.1
```

## Error Handling

### Client-Side Errors
- **Error Boundaries**: Catch React errors
- **Fallback UI**: Graceful degradation
- **User Notifications**: Toast messages

### Server-Side Errors
- **Try-Catch**: Async error handling
- **Logging**: Centralized error logs
- **Monitoring**: Vercel error tracking

### API Error Handling
```
/api/chat errors:
├── 400: Bad request
├── 401: Unauthorized
├── 500: Server error
└── Fallback: User-friendly message
```

## Scalability Considerations

### Horizontal Scalability
- **CDN Distribution**: Vercel Edge Network
- **Static Generation**: Pre-rendered pages
- **Incremental Regeneration**: ISR for updates

### Vertical Scalability
- **Component Optimization**: Minimal re-renders
- **Lazy Loading**: Load on demand
- **Code Splitting**: Per-route bundles

## SEO Architecture

### Metadata Generation
```typescript
export const generateMetadata = ({ params }) => {
  return {
    title: 'WONRIAL - Enterprise Solutions',
    description: 'AI-powered...',
    openGraph: { /* ... */ }
  }
}
```

### Sitemap & Robots
- **robots.ts**: Dynamic robots.txt generation
- **sitemap.ts**: XML sitemap with all locales
- **hreflang tags**: Locale alternate URLs

### Structured Data
- **JSON-LD**: Schema.org markup
- **Open Graph**: Social media sharing
- **Twitter Cards**: Twitter sharing

## Future Architecture Considerations

### Planned Enhancements
1. **Database Integration**
   - Store contact submissions
   - User authentication
   - Analytics storage

2. **Backend API**
   - Contact form submissions
   - User management
   - Payment processing

3. **Real-time Features**
   - WebSocket chat (future)
   - Live notifications
   - Collaborative features

4. **Content Management**
   - Headless CMS integration
   - Dynamic content management
   - A/B testing framework

## References

### Internal Docs
- [Project Overview](./project-overview-pdr.md)
- [Code Standards](./code-standards.md)
- [Codebase Summary](./codebase-summary.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## Unresolved Questions

1. **Database Backend**: Should data persistence layer be added?
2. **Email Service**: Integration plan for contact notifications?
3. **User Authentication**: Future authentication system scope?
4. **Payment Processing**: Payment gateway integration planned?
5. **Analytics**: Advanced analytics beyond GTM needed?
