# WONRIAL Code Standards & Guidelines

**Last Updated**: 2026-07-28
**Version**: 26.07.6
**Applies To**: All TypeScript/TSX code in WONRIAL project
**Recent Changes**: AI SDK v7 client/server patterns, TypeScript 6, whole codebase is now `.ts`/`.tsx`

## Core Development Principles

### KISS (Keep It Simple, Stupid)
- Prefer straightforward solutions over clever implementations
- Write code easy to understand and modify
- Choose clarity over cleverness

### DRY (Don't Repeat Yourself)
- Extract common logic into reusable functions/components
- Use composition and abstraction appropriately
- Maintain single source of truth

### YAGNI (You Aren't Gonna Need It)
- Implement features only when needed
- Avoid over-engineering for hypothetical requirements
- Start simple, refactor when necessary

## Continuous Integration

`.github/workflows/ci.yml` runs `npm run lint` and `npm run format:check` on pull requests and
on pushes to `develop` and `main`. Nothing else.

The Node version comes from `.nvmrc`, which is the single source of truth for CI. `engines` in
`package.json` pins the same major (`>=24 <25`) so npm refuses to pretend another one will do,
and `@types/node` is held on `24.x` to match - types from a newer major would describe APIs the
runtime does not have.

Vercel is the third place, set under Settings -> Build and Deployment. It has to be moved by
hand; if it drifts, CI passes on a runtime production never uses.

It deliberately omits `build` and `typecheck`: Vercel builds every push including pull-request
previews, and `next build` runs TypeScript, so repeating them buys a slower duplicate of a
signal a failed deployment already gives.

It also omits `npm audit`. Advisories arrive on dependencies we do not control, and a blocking
audit would stop unrelated merges - in July 2026 `sharp` and `postcss` had no fix available for
weeks because Next still pinned the affected versions.

The two checks that are there exist because nothing else performed them, and it showed: the
Next.js lint rules sat registered but disabled, and nine files drifted from Prettier.

## Dependency Security

`npm audit` is expected to report nothing. Anything it does report is either new or a
regression — treat it as such.

### `overrides` for the Next.js dependency pins

`next` pins `postcss` exactly and `sharp` by caret, and the latest stable Next still points at
versions that received advisories in July 2026. The overrides in `package.json` pull both
forward without touching direct dependencies:

| Package | Was | Now | Advisory |
|---|---|---|---|
| `sharp` | 0.34.5 (via `next`) | ^0.35.3 | GHSA-f88m-g3jw-g9cj — libvips CVEs, 2026-07-17 |
| `postcss` | 8.4.31 (via `next`) | ^8.5.24 | GHSA-r28c-9q8g-f849 and two others, 2026-07-20 |

Re-check `npm view next dependencies` after each Next release; once Next ships its own bump the
overrides become redundant and should be dropped rather than left to drift.

### Why the ESLint dependencies are so few

An advisory in `brace-expansion` (GHSA-mh99-v99m-4gvg, 2026-07-23) reached the project through
`minimatch@3` inside ESLint 9. ESLint 10 uses a patched chain, and the only thing blocking the
upgrade was `eslint-plugin-react`, whose peer range stops at `eslint ^9.7`.

That plugin turned out to be contributing nothing. `eslint --print-config` showed 66 active
rules: 62 core, 2 `@typescript-eslint`, 2 `react-hooks`, and **zero** from `react`. It was
registered as a plugin with its only two mentioned rules explicitly switched off.

Removed with it:

- `eslint-config-next` — never imported; `eslint.config.js` registers `@next/eslint-plugin-next`
  directly.
- `eslint-config-prettier` — never imported.

After the upgrade the same 66 rules are still active, plus three that ESLint 10 added to its
recommended set. Nothing was lost to gain the security fix.

**Never run `npm audit fix --force` in this repo.** Its idea of a fix was downgrading
`eslint-config-next` to 12.0.4 and `eslint-plugin-react` to 7.22.0.

### Prettier and ESLint

`eslint-config-prettier/flat` is the **last** entry in `eslint.config.js`. Flat config applies
later entries over earlier ones, so anywhere else it would be overridden by the rules above it
and the conflict it exists to remove would come back.

Use the `/flat` export rather than the default one: it carries a `name`, which shows up in
`eslint --inspect-config` and in diagnostics. The default export is a bare `{ rules }` object.

It switches off 358 rules, four of which were live here: `semi`, `quotes`,
`object-curly-spacing` and `no-unexpected-multiline`. The first three were removed from the
config rather than left as dead entries — Prettier already enforces exactly the same style
(`semi: true`, `singleQuote: true`, default `bracketSpacing`), so nothing about the formatting
changed. Do not add formatting rules to ESLint; they will be switched off again.

### Next.js rules

`eslint.config.js` spreads `@next/eslint-plugin-next`'s `recommended` set, so 20 of its 21 rules
are active. The exception is `@next/next/no-img-element`, switched off deliberately.

## File Organization

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Locale-based dynamic routes
│   ├── api/               # API routes
│   ├── robots.ts          # SEO robots.txt
│   ├── sitemap.ts         # Dynamic sitemap
│   └── providers.tsx      # Context providers
├── components/            # React components (31 total)
│   ├── [feature]/         # Feature-specific folders
│   └── [component]/       # Individual components
├── i18n/                  # Internationalization
│   ├── settings.ts        # i18next config
│   ├── server.ts          # Server-side helpers
│   ├── client.ts          # Client-side hooks
│   └── locales/           # Translation JSON files
├── layout/                # Layout components
├── styles/                # Global CSS
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── proxy.ts               # API client
```

### File Naming Conventions

**Extensions**: use `.ts`/`.tsx` only. `tsconfig.json` includes just `src/**/*.ts` and
`src/**/*.tsx`, so a `.js`/`.jsx` file under `src/` silently skips type checking.

**Pages & Layouts**:
- Format: `page.tsx`, `layout.tsx`, `not-found.tsx`
- Exact Next.js convention
- Examples: `src/app/[locale]/page.tsx`

**Components**:
- Format: PascalCase for component names, kebab-case for folders
- Folder structure: `src/components/[feature]/ComponentName.tsx`
- Index files: `index.ts` or `index.tsx` for exports
- Examples:
  - `src/components/hero/Hero.tsx`
  - `src/components/theme-switcher/ThemeSwitcher.tsx`

**Type Definitions**:
- Format: `[name].ts` in `src/types/`
- Use kebab-case for filenames
- Examples: `feature.ts`, `testimonial.ts`, `menu.ts`

**API Routes**:
- Format: `route.ts` in API folder
- Folder structure: `src/app/api/[endpoint]/route.ts`
- Examples: `src/app/api/chat/route.ts`

**Utilities**:
- Format: `[function-name].ts` or `[function-name].tsx`
- Location: `src/utils/`
- Examples: `portal.tsx`, `hooks.ts`

**Configuration**:
- Format: `[app].config.js` or `[app].config.ts`
- Root level directory
- Examples: `next.config.js`, `tailwind.config.js`

**Translations**:
- Format: `[locale].json` in `src/i18n/locales/`
- Locales: `en.json`, `ru.json`, `uk.json`
- Structure: Nested object for organization

## Naming Conventions

### TypeScript/React

**Variables & Functions**:
```typescript
// Variables: camelCase
const userName = 'John'
const isActive = true
let messageCount = 0

// Functions: camelCase
function getUserById(id: string) { }
const calculateTotal = (items: Item[]) => { }

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3
const API_ENDPOINT = 'https://api.example.com'
```

**Classes & Interfaces**:
```typescript
// Classes: PascalCase
class UserService { }
class ChatManager { }

// Interfaces: PascalCase
interface User { }
interface ChatMessage { }

// Type aliases: PascalCase
type UserId = string & { readonly __brand: 'UserId' }
```

**Component Names**:
```typescript
// React Components: PascalCase
export function Hero() { }
export const ThemeSwitcher = () => { }

// Props Interface: [ComponentName]Props
interface HeroProps {
  title: string
}

// Client Components: Add 'use client' directive
'use client'
export const InteractiveButton = () => { }
```

**React Hooks**:
```typescript
// Custom hooks: useXxx convention
function useLocalStorage(key: string) { }
const useThemeToggle = () => { }
```

### API & Route Parameters

**REST Endpoints** (path-based routing):
```
GET    /api/chat                    # Chat endpoint
POST   /api/chat                    # Send message
GET    /[locale]/ai                 # AI page
GET    /[locale]/contact            # Contact page
```

**Route Parameters**:
```typescript
// Dynamic segments use square brackets
[locale]  // EN, RU, or UK
[id]      // Dynamic ID parameter
```

**Query Parameters** (camelCase):
```
?page=1&limit=10&sort=date
?searchTerm=example&filter=active
```

**Request/Response JSON** (camelCase):
```json
{
  "userId": 123,
  "userName": "john_doe",
  "emailAddress": "john@example.com",
  "isVerified": true,
  "createdAt": "2025-12-31T00:00:00Z"
}
```

## Code Style Guidelines

### Formatting

**Indentation**: 2 spaces (not tabs)
```typescript
function example() {
  const nested = {
    value: 'example'
  }
  return nested
}
```

**Line Length**: 80-100 characters (preferred), 120 max
```typescript
// Prefer breaking long lines
const longFunctionCall = calculateSomething(
  param1,
  param2,
  param3
)
```

**Whitespace**:
- One blank line between functions/methods
- Two blank lines between classes/sections
- Space after keywords: `if (`, `for (`, `while (`
- No space before function parameters: `function name(`

**Semicolons**: Always include
```typescript
const x = 1; // ✅ Required
const y = 2; // ✅ Required
```

**Quotes**: Single quotes for strings
```typescript
const message = 'Hello World'; // ✅
const message = "Hello World"; // ❌
const jsx = <div>Content</div>; // JSX uses quotes as needed
```

### Comments & Documentation

**JSDoc for Functions**:
```typescript
/**
 * Authenticates user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Authenticated user object
 * @throws {AuthError} If credentials are invalid
 */
async function authenticateUser(email: string, password: string) {
  // Implementation
}
```

**Inline Comments**:
```typescript
// Explain WHY, not WHAT
// Cache miss - fetch from database
const user = await db.getUser(userId)

// TODO(author, date): Optimize query for large datasets
const users = await db.getAllUsers()
```

**File Headers** (optional):
```typescript
/**
 * User Service
 *
 * Handles authentication, registration, and profile management.
 */
```

### Error Handling

**Always Use Try-Catch**:
```typescript
async function processData(data: any) {
  try {
    const validated = validateData(data)
    const result = await saveData(validated)
    return result
  } catch (error) {
    logger.error('Data processing failed', { error })
    throw new ProcessingError('Failed to process data', { cause: error })
  }
}
```

**Custom Error Classes**:
```typescript
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

**Error Logging**:
```typescript
logger.error('Operation failed', {
  operation: 'getUserData',
  userId: user.id,
  error: error.message
  // Never log sensitive data
})
```

## TypeScript Standards

### Strict Mode (Enabled)

```typescript
// ✅ Required: Explicit types
const getUserName = (user: User): string => {
  return user.name
}

// ❌ Avoid: Implicit any
const getUserName = (user) => {
  return user.name
}
```

### Type Annotations

**Function Parameters & Return Types**:
```typescript
function add(a: number, b: number): number {
  return a + b
}

const multiply = (x: number, y: number): number => x * y
```

**Variables with Complex Types**:
```typescript
const users: User[] = []
const config: Readonly<Config> = { }
const callback: (event: Event) => void = (e) => { }
```

**Avoid Type Assertions** (unless necessary):
```typescript
// ❌ Avoid
const value = (someValue as any).property

// ✅ Prefer
const value = (someValue as SomeType).property
```

**Discriminated Unions** (for type safety):
```typescript
type Result =
  | { status: 'success'; data: User }
  | { status: 'error'; error: string }

function handleResult(result: Result) {
  if (result.status === 'success') {
    console.log(result.data) // Type narrowed to User
  }
}
```

## React/Next.js Patterns

### Server vs Client Components

**Server Components** (Default):
```typescript
// No 'use client' directive
// Can access databases, APIs, secrets
// Benefits: Smaller JS bundle, direct data access
export async function HomePage() {
  const posts = await db.getPosts()
  return <div>{/* render posts */}</div>
}
```

**Client Components** (When Needed):
```typescript
'use client'
// Use for: interactivity, hooks, event handlers
import { useState } from 'react'

export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### Component Patterns

**Functional Components Only**:
```typescript
// ✅ Functional component
export function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>
}

// ❌ Avoid class components
class UserCard extends React.Component { }
```

**Props Interface**:
```typescript
interface UserCardProps {
  user: User
  onSelect?: (user: User) => void
  className?: string
}

export function UserCard({ user, onSelect, className }: UserCardProps) {
  return (
    <div className={className} onClick={() => onSelect?.(user)}>
      {user.name}
    </div>
  )
}
```

**Default Exports vs Named Exports**:
```typescript
// ✅ Prefer named exports
export function Hero() { }
export function Features() { }

// ❌ Avoid default exports (makes refactoring harder)
export default function Page() { }
```

### Hooks Usage

**Custom Hooks**:
```typescript
// ✅ Extract logic into custom hooks
function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  return [value, setValue]
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light')
```

**Hook Dependencies**:
```typescript
// ✅ Include all dependencies
useEffect(() => {
  fetchUser(userId)
}, [userId]) // userId is a dependency

// ❌ Missing dependency (eslint-plugin-react-hooks will warn)
useEffect(() => {
  fetchUser(userId)
}, []) // Wrong!
```

### Styling

**Tailwind CSS Only**:
```typescript
// ✅ Use Tailwind utilities
export function Button({ variant = 'primary' }: ButtonProps) {
  const variants = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-800'
  }
  return <button className={variants[variant]}>Click</button>
}

// ❌ Avoid inline styles
export function Button() {
  return <button style={{ backgroundColor: 'blue' }}>Click</button>
}

// ❌ Avoid CSS-in-JS
const styled = css`
  background: blue;
`
```

**Dark Mode**:
```typescript
// ✅ Use dark: variant
export function Card() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      Content
    </div>
  )
}
```

## i18n Patterns

### Server Components (createTranslation)

```typescript
import { createTranslation } from '@/i18n/server'

export async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'common')

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  )
}
```

### Client Components (useTranslation)

```typescript
'use client'
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="uk">Українська</option>
    </select>
  )
}
```

### Translation Keys

**Naming Pattern**:
```json
{
  "home": {
    "title": "Welcome",
    "subtitle": "Start your journey",
    "cta": {
      "primary": "Get Started",
      "secondary": "Learn More"
    }
  },
  "features": {
    "fast": "Lightning Fast",
    "secure": "Secure & Reliable"
  }
}
```

## Testing

### No Test Framework Configured

Current project uses:
- **Manual testing** via Vercel preview
- **Browser testing** in dev environment
- **Performance testing** ad hoc (Lighthouse/DevTools); no RUM collection since Speed Insights was removed

### Pre-Deployment Checks

```bash
npm run typecheck    # TypeScript validation
npm run lint         # ESLint validation
npm run build        # Build verification
npm run start        # Local production build test
```

## Git Workflow

### Branch Naming

**Format**: `type/description` (kebab-case)

```
feature/add-dark-mode
fix/chat-streaming-issue
refactor/component-cleanup
docs/update-readme
```

### Commit Messages

**Format**: Conventional Commits
```
type(scope): description

[optional body]
[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `style`: Code style (formatting)
- `perf`: Performance improvement
- `chore`: Maintenance

**Examples**:
```
feat(i18n): add Ukrainian locale support

- Configure i18next with uk.json
- Add language switcher
- Update tests

Closes #45

---

fix(chat): resolve streaming timeout issue

Increased timeout from 30s to 60s for slow connections.
```

### Pre-Commit Checklist

- ✅ TypeScript compiles without errors
- ✅ ESLint passes all rules
- ✅ No console.log statements
- ✅ No hardcoded secrets/API keys
- ✅ Code follows style guidelines
- ✅ Component names are descriptive
- ✅ Translations added for all locales

## Performance Standards

### Bundle Size

- Next.js chunk size: < 50KB
- Total JS (first load): < 150KB
- CSS bundle: < 30KB

### Runtime Performance

- Component render time: < 16ms (60fps)
- API response: < 500ms
- Page transition: < 300ms

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Security Standards

### Input Validation

```typescript
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function createUser(userData: any) {
  if (!validateEmail(userData.email)) {
    throw new ValidationError('Invalid email format')
  }
}
```

### Sensitive Data

- Never hardcode API keys
- Use environment variables only
- Never log passwords or tokens
- Never store sensitive data in localStorage

```typescript
// ✅ Secure
const apiKey = process.env.API_KEY

// ❌ Insecure
const apiKey = 'sk-1234567890'
```

### Escaping Output

```typescript
// ✅ Safe (React escapes by default)
return <div>{userInput}</div>

// ❌ Unsafe (dangerouslySetInnerHTML)
return <div dangerouslySetInnerHTML={{ __html: userInput }} />
```

## Accessibility (a11y)

### WCAG 2.1 AA Compliance

**Semantic HTML**:
```typescript
// ✅ Semantic
return (
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
)

// ❌ Non-semantic
return (
  <div role="navigation">
    <span onClick={() => navigate('/')}>Home</span>
  </div>
)
```

**ARIA Labels**:
```typescript
// ✅ Accessible
<button aria-label="Close dialog" onClick={onClose}>
  ×
</button>

// ❌ Inaccessible
<button onClick={onClose}>×</button>
```

**Color Contrast**:
- Text vs background: >= 4.5:1 ratio
- Use WebAIM color contrast checker
- Test in dark mode too

## Documentation Requirements

### Code Comments

When to comment:
- Complex algorithms or business logic
- Non-obvious optimizations
- Workarounds for known issues
- Public API functions
- Configuration options

When NOT to comment:
- Self-explanatory code
- Variable names already clear
- Type definitions (already documented)

### README & Guides

Each feature should have:
- Purpose and use cases
- Setup instructions
- API documentation
- Usage examples
- Troubleshooting tips

## Quality Assurance

### Pre-Push Checklist

```bash
✅ npm run typecheck      # Type checking passes
✅ npm run lint           # Linting passes
✅ npm run format         # Code is formatted
✅ npm run build          # Build succeeds
✅ Manual testing         # Feature works as expected
✅ Cross-browser test     # Works in Chrome, Firefox, Safari
✅ Mobile test            # Mobile responsive
✅ Accessibility audit    # WCAG 2.1 AA compliant
```

## Exceptions & Overrides

**When to Deviate**:
- Performance-critical code (document reason)
- External library constraints (mark clearly)
- Legacy code (plan refactoring)
- Temporary fixes (add TODO with date)

**Documentation Required**:
```typescript
// EXCEPTION: Inline styles for performance
// REASON: CSS-in-JS would cause layout thrashing
// TODO(2025-12-31): Replace with optimized Tailwind
const style = { transform: `translateX(${x}px)` }
```

## Enforcement

### Automated Checks

**ESLint**:
- Runs on save (if configured)
- Checks type safety
- Enforces React hooks rules
- Validates imports

**TypeScript**:
- `npm run typecheck` validates types
- Strict mode enabled
- No implicit any

**Prettier**:
- Formats on save (if configured)
- Consistent code style
- 2-space indentation

### Manual Review

Code review checklist:
- ✅ Logic correctness
- ✅ Error handling
- ✅ Performance implications
- ✅ Security considerations
- ✅ Naming clarity
- ✅ Maintainability
- ✅ Test coverage
- ✅ Documentation

## References

### Internal Documentation
- [Project Overview](./project-overview-pdr.md)
- [Codebase Summary](./codebase-summary.md)
- [System Architecture](./system-architecture.md)

### External Standards
- [Conventional Commits](https://conventionalcommits.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

## Unresolved Questions

None. All code standards are defined and documented.
