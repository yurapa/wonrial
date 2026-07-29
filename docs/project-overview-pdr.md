# WONRIAL ENTERPRISES LTD - Project Overview & PDR

**Project Name**: WONRIAL
**Version**: 26.07.2
**Last Updated**: 2026-07-28
**Status**: Active Development
**Production URL**: [wonrial.com](https://wonrial.com)
**Development URL**: [wonrial.vercel.app](https://wonrial.vercel.app)
**Recent Update**: AI SDK v7 migration, TypeScript 6, dependency refresh, Speed Insights removed

## Executive Summary

WONRIAL is a modern SaaS landing page and AI-powered customer engagement platform. Built with Next.js 16, React 19, and TypeScript, it delivers a sophisticated user experience with multilingual support (EN, RU, UK), dark/light theming, and an integrated AI chat assistant powered by Groq LLM.

## Project Purpose

### Vision
Transform customer engagement through intelligent, responsive, and beautifully designed digital experiences that work seamlessly across languages and devices.

### Mission
Provide WONRIAL ENTERPRISES with:
- Professional landing page showcasing services
- AI-powered customer support via chat interface
- Global reach through multilingual content (3 locales)
- Responsive design optimized for all devices
- Modern analytics and event tracking
- Fast, reliable delivery via Vercel

### Value Proposition
- **Fast Performance**: Next.js 16 with React 19 server components
- **Global Reach**: 3 languages with SEO-optimized routes
- **AI Integration**: Groq-powered chat for instant support
- **Dark Mode**: Professional theme switching
- **Accessibility**: ARIA-compliant components
- **Modern Stack**: TypeScript strict mode, Tailwind CSS 4

## Target Audience

### Primary Users
1. **B2B Clients**: Businesses seeking enterprise solutions
2. **Global Users**: International audience across EN, RU, UK regions
3. **Support Seekers**: Customers using AI chat for help
4. **Mobile Users**: Mobile-first responsive design

### User Personas

**Persona 1: Enterprise Decision Maker**
- Needs: Professional features showcase, pricing clarity, case studies
- Pain Points: Slow websites, poor navigation, unclear value
- Solution: Fast, clear landing page with AI chat support

**Persona 2: Support-Seeking User**
- Needs: Quick answers, 24/7 availability, natural interaction
- Pain Points: Email wait times, phone queues, language barriers
- Solution: AI chat in preferred language (EN/RU/UK)

**Persona 3: Mobile User**
- Needs: Fast mobile experience, easy navigation
- Pain Points: Slow sites, cluttered interfaces, unresponsive design
- Solution: Mobile-optimized responsive design

## Key Features

### 1. Modern Landing Page
- **7 Sections**: Hero, Features, Pricing, Testimonials, About, Technologies, CTA
- **Call-to-Action**: "Ready to Help" section with modal
- **Hero Section**: Dynamic introduction with theme-aware backgrounds
- **Features Grid**: 6 feature cards showcasing services
- **Testimonials**: Social proof with 3+ customer testimonials
- **Pricing Plans**: Tiered pricing with comparison table

### 2. Multilingual Support (i18n)
- **3 Locales**: English (en), Russian (ru), Ukrainian (uk)
- **Path-Based Routing**: `/en/*`, `/ru/*`, `/uk/*`
- **Dynamic Switching**: Language switcher in header
- **SEO-Optimized**: Hreflang tags for search engines
- **Server-Side Translation**: i18next with SSR support

### 3. AI Chat Integration
- **Page**: `/[locale]/ai`
- **Technology**: Vercel AI SDK + Groq LLM
- **Features**: Streaming responses, message history, theme support
- **Backend**: `/api/chat` endpoint with streaming
- **Environment**: `GROQ_API_KEY` for authentication

### 4. Dark/Light Mode
- **Provider**: next-themes with localStorage persistence
- **CSS Variables**: Global theme colors in Tailwind
- **Components**: Theme-aware styling throughout
- **Switcher**: Toggle button in header

### 5. Contact & Services
- **Contact Page**: `/[locale]/contact` with info and form
- **Services Page**: `/[locale]/services` listing offerings
- **Analytics**: GTM integration via `NEXT_PUBLIC_GTM_ID`

### 6. SEO & Performance
- **Robots & Sitemap**: Dynamic generation with locale support
- **Metadata**: Title, description, Open Graph tags
- **Responsive**: Mobile-first Tailwind CSS design

## Technical Requirements

### Functional Requirements

**FR1: Multilingual Landing Page**
- Display content in EN, RU, UK via path-based routing
- Language switcher for seamless locale changes
- SEO-optimized hreflang tags for each locale
- Server-side rendering for performance

**FR2: AI Chat Integration**
- Chat page at `/[locale]/ai`
- Stream responses from Groq LLM
- Maintain conversation history
- Support theme switching in chat UI

**FR3: Responsive Design**
- Mobile-first design (< 768px, 768-1024px, > 1024px)
- Dark/light mode support
- Touch-friendly interface
- Fast page loads (< 3s FCP)

**FR4: Analytics Tracking**
- GTM integration for event tracking
- Page view tracking across locales
- User interaction metrics
- Conversion funnel tracking

**FR5: Contact Management**
- Contact form with validation
- Email integration (if backend available)
- Contact info display
- Geographic location info if available

### Non-Functional Requirements

**NFR1: Performance**
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Core Web Vitals green (100 score target)

**NFR2: Accessibility**
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- ARIA labels on interactive elements
- Color contrast >= 4.5:1

**NFR3: Security**
- HTTPS everywhere (production)
- No sensitive data in frontend
- CSP headers configured
- XSS protection enabled

**NFR4: Reliability**
- 99.9% uptime target (Vercel SLA)
- Graceful error handling
- Fallback UI for failed API calls
- Error boundary components

**NFR5: Maintainability**
- TypeScript strict mode
- Component-based architecture
- Clear file organization
- Comprehensive code comments

## Success Metrics

### Business Metrics
- Page load time: < 2.5s average
- Bounce rate: < 40%
- Contact form conversion: > 5%
- Chat usage rate: > 15% of visitors

### Technical Metrics
- Lighthouse score: > 90
- Test coverage: > 70%
- TypeScript errors: 0
- ESLint violations: 0

### User Metrics
- Mobile users: > 50% of traffic
- Return visitor rate: > 30%
- Average session duration: > 2 min
- Language preference distribution: Even across locales

## Technical Stack

### Frontend
- **Framework**: Next.js 16.2.12
- **Language**: TypeScript 6.0.3
- **Runtime**: React 19.2.8
- **Styling**: Tailwind CSS 4.3.3 + SASS 1.102.0
- **Icons**: react-icons 5.7.0
- **Theming**: next-themes 0.4.6

### Internationalization
- **Library**: i18next 26.3.6
- **React Binding**: react-i18next 17.0.11
- **Language Detector**: i18next-browser-languagedetector 8.2.1
- **Backend Integration**: i18next-resources-to-backend 1.2.1

### AI & API
- **AI SDK**: ai 7.0.40
- **LLM Provider**: @ai-sdk/groq 4.0.15
- **React Bindings**: @ai-sdk/react 4.0.43
- **Backend**: Groq native API with ultra-fast inference

### DevTools
- **ESLint**: 9.39.5 with Next.js plugin, react-hooks 7.1.1 (ignores: build/, node_modules/, .next/, .claude/**)
  - Held at 9.x: eslint-plugin-react, eslint-plugin-import and eslint-plugin-jsx-a11y have no peer support for ESLint 10
- **Prettier**: 3.9.6 for code formatting
- **TypeScript**: 6.0.3 with strict mode
- **PostCSS**: 8.5.24 with Tailwind plugin
- **SASS**: 1.102.0 for CSS preprocessing

### Analytics & Monitoring
- **GTM**: Via environment variable `NEXT_PUBLIC_GTM_ID`
- Vercel Speed Insights was removed on 2026-07-28; no performance-metrics collection is in place

## Architecture Overview

### Component Structure
```
Components (31 total):
├── hero/              # Landing hero section
├── features/          # 6 feature cards with icons
├── pricing/          # Pricing plans comparison
├── testimonials/     # Customer testimonials (3+)
├── about/            # About company sections
├── technologies/     # Tech partner logos
├── contact/          # Contact information/form
├── ai/               # AI chat interface
├── ready-to-help/    # CTA section
├── button/           # Reusable button component
├── modal/            # Accessible modal dialog
├── section-title/    # Section header component
├── theme-switcher/   # Dark/light toggle
├── language-switcher/# Language selector
├── scroll-to-top/    # Scroll to top button
└── top-banner/       # Top announcement banner
```

### Page Structure
```
Pages:
├── [locale]/           # Dynamic locale prefix
│   ├── page.tsx        # Home page (7 sections)
│   ├── layout.tsx      # Root layout wrapper
│   ├── ai/page.tsx     # AI chat page
│   ├── contact/page.tsx # Contact page
│   ├── services/page.tsx # Services listing
│   └── not-found.tsx   # 404 error
├── api/
│   └── chat/route.ts   # AI streaming endpoint
├── robots.ts           # SEO robots.txt
└── sitemap.ts          # Dynamic sitemap
```

## Environment Configuration

### Required Environment Variables
```
GROQ_API_KEY              # Groq LLM API key for AI chat
NEXT_PUBLIC_GTM_ID        # Google Tag Manager ID for analytics
```

### Build Configuration
- **Output Directory**: `build/`
- **TypeScript Path**: `@/*` → `./src/*`
- **Node Version**: 18.0.0+

## Development Workflow

### Available Scripts
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier
npm run typecheck       # Check TypeScript without emitting
```

### Development Standards
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS utility classes
- **Components**: Server Components by default, Client Components where needed
- **i18n**: Use `useTranslation()` hook from react-i18next
- **Themes**: Use `useTheme()` hook from next-themes

## Deployment

### Production Environment
- **Host**: Vercel (wonrial.com)
- **Development**: Vercel Preview (wonrial.vercel.app)
- **Auto-Deploy**: On push to main branch
- **SSL**: Automatic via Vercel

### Pre-Deployment Checklist
- All tests passing
- TypeScript strict mode clean
- ESLint violations resolved
- Accessibility audit passed
- Core Web Vitals green
- Environment variables configured

## Future Roadmap

### Phase 1: Foundation (Current)
- ✅ Landing page with 7 sections
- ✅ Multilingual support (EN, RU, UK)
- ✅ Dark/light theme
- ✅ AI chat integration
- ✅ SEO optimization

### Phase 2: Enhancement
- 📋 User authentication system
- 📋 Dashboard for logged-in users
- 📋 Customer relationship management
- 📋 Advanced analytics
- 📋 A/B testing framework

### Phase 3: Advanced Features
- 📋 Video content integration
- 📋 Webinar/demo scheduling
- 📋 Customer success portal
- 📋 API for third-party integrations
- 📋 Multi-tenant support

### Phase 4: Scale & Optimize
- 📋 Performance optimizations
- 📋 CDN edge caching
- 📋 Database integration
- 📋 Machine learning for personalization
- 📋 Enterprise SLA support

## Constraints & Limitations

### Technical Constraints
- Single-language API responses (no multi-lang backend)
- Groq API rate limits
- Vercel deployment limitations
- Browser storage (localStorage) capacity

### Operational Constraints
- Requires Groq API key for chat functionality
- GTM setup required for analytics
- Vercel subscription for production deployment
- DNS configuration for wonrial.com

### Design Constraints
- Mobile-first approach required
- WCAG 2.1 AA compliance mandatory
- SEO optimization required
- Zero layout shift for Core Web Vitals

## Risks & Mitigation

### Risk 1: LLM API Failures
**Impact**: High
**Likelihood**: Medium
**Mitigation**: Fallback to static FAQ, retry logic, graceful error UI

### Risk 2: Performance Degradation
**Impact**: Medium
**Likelihood**: Medium
**Mitigation**: Image optimization, code splitting, caching strategy, monitoring

### Risk 3: Language Content Quality
**Impact**: Medium
**Likelihood**: Low
**Mitigation**: Professional translation, native speaker review, community feedback

### Risk 4: SEO Rankings Drop
**Impact**: High
**Likelihood**: Low
**Mitigation**: Proper hreflang tags, structured data, sitemap, robots.txt

### Risk 5: Mobile Compatibility Issues
**Impact**: Medium
**Likelihood**: Low
**Mitigation**: Responsive testing, device testing, continuous monitoring

## Dependencies & Integration

### Required Services
- **Groq API**: LLM backend for chat
- **Vercel**: Hosting and deployment
- **Google Tag Manager**: Analytics

### Third-Party Libraries
- ai + @ai-sdk/groq + @ai-sdk/react for LLM integration
- i18next for translations
- next-themes for dark mode
- react-icons for icons

### Integration Points
- Groq API (via AI SDK)
- Google Analytics (via GTM)
- Vercel deployment pipeline

## Support & Maintenance

### Maintenance Windows
- Updates: Minimal downtime via Vercel
- Monitoring: 24/7 via Vercel and GTM
- Backup: Automatic via Git

### Update Strategy
- Security patches: Immediate
- Feature updates: Weekly/biweekly
- Major version updates: Quarterly
- Dependency updates: Monthly

## Compliance & Standards

### Web Standards
- Semantic HTML5
- CSS Grid/Flexbox for layout
- Responsive design (mobile-first)
- Web Accessibility Guidelines (WCAG 2.1)

### Performance Standards
- Core Web Vitals: All green
- Lighthouse: > 90 score
- Page load: < 2.5s

### Code Standards
- ESLint configuration enforced
- Prettier formatting required
- TypeScript strict mode
- No console logs in production

## Contact & Support

- **Production Site**: [wonrial.com](https://wonrial.com)
- **Dev Site**: [wonrial.vercel.app](https://wonrial.vercel.app)
- **Author**: yurapa
- **Repository**: [Github](https://github.com/yurapa/wonrial)

## Unresolved Questions

1. **Backend Database**: Is there a backend for storing contact submissions?
2. **Email Service**: How are contact form emails sent?
3. **Payment Integration**: Will pricing plans integrate with payment provider?
4. **User Accounts**: Future authentication system scope?
5. **CRM Integration**: Integration with existing CRM system planned?
