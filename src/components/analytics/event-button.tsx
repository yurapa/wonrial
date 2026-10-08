'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { sendGTMEvent } from '@next/third-parties/google';

export function EventButton({ href, event, children }: { href: string; event: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="bg-primary hover:bg-primary/80 rounded-sm px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out"
      onClick={() => sendGTMEvent({ event: 'buttonClicked', value: event })}
    >
      {children}
    </Link>
  );
}
