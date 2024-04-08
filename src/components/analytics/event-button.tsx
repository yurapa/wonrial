'use client';

import { sendGTMEvent } from '@next/third-parties/google';

export function EventButton() {
  return (
    <button
      className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
      onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'Get Pro button was clicked' })}
    >
      🔥 Get Pro
    </button>
  );
}
