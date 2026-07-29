'use client';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import type { Ref } from 'react';

// The site key lives here alone, so which widget - and therefore which environment the
// challenge is scored against - is never restated per form.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

type TurnstileFieldProps = {
  /**
   * Called with the token once the challenge passes, and with null when it errors or the
   * token expires. Forms use it to keep submit disabled until there is something to send.
   */
  onToken: (token: string | null) => void;
  className?: string;
  ref?: Ref<TurnstileInstance | undefined>;
};

/**
 * Cloudflare Turnstile widget.
 *
 * Tokens are single-use, so a form must call `reset()` on the ref after each submit;
 * otherwise the next attempt presents one Cloudflare has already redeemed.
 */
const TurnstileField = ({ onToken, className, ref }: TurnstileFieldProps) => (
  <Turnstile
    ref={ref}
    siteKey={SITE_KEY}
    className={className}
    options={{ theme: 'auto' }}
    onSuccess={onToken}
    onError={() => onToken(null)}
    onExpire={() => onToken(null)}
  />
);

export default TurnstileField;
