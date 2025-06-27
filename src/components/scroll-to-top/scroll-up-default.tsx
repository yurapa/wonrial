'use client';

import { useEffect } from 'react';

export const ScrollUpDefault = () => {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), []);

  return null;
};
