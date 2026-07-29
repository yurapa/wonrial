const VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Cloudflare rejects a token that has already been redeemed, so a failed submission must reset
// the widget on the client rather than retry with the same value.
type VerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

/**
 * Checks a Turnstile token against Cloudflare.
 *
 * Returns false whenever the answer is anything other than an explicit success - a missing
 * token, a network failure or a malformed reply all mean "not verified". Failing closed is the
 * point: this is the only thing standing between the public form and the mail sender.
 */
export async function verifyTurnstileToken(token: unknown, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error('[contact] TURNSTILE_SECRET_KEY is not set');

    return false;
  }

  if (typeof token !== 'string' || token.length === 0) return false;

  const body = new URLSearchParams({ secret, response: token });

  // Cloudflare uses the IP only to score the challenge, so a missing one is not an error.
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const response = await fetch(VERIFY_ENDPOINT, { method: 'POST', body });
    const result = (await response.json()) as VerifyResponse;

    if (!result.success) {
      console.warn('[contact] turnstile rejected the token:', result['error-codes']?.join(', ') ?? 'no reason given');
    }

    return result.success === true;
  } catch (error) {
    console.error('[contact] turnstile verification request failed:', error);

    return false;
  }
}
