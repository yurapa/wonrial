'use client';

import { useEffect } from 'react';

export const ScrollUpDefault = () => {
  // Block body on purpose: scrollTo() does not return undefined in every browser,
  // and an implicit return would be treated by React as a cleanup function.
  useEffect(() => {
    window.document.scrollingElement?.scrollTo(0, 0);
  }, []);

  return null;
};
