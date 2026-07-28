'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

// ThemeProvider is rendered during SSR on purpose. Gating it behind a "mounted"
// flag moved its inline anti-flash script to the client, where React refuses to
// execute script tags, so the theme was applied only after hydration and the
// whole tree was thrown away and remounted. The <html> element in the locale
// layout carries suppressHydrationWarning for the class the script sets.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
