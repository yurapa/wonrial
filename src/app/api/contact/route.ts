import { Resend } from 'resend';

import { createTranslation } from '@/i18n/server';
import { defaultLocale, locales } from '@/i18n/settings';
import type { ContactError, ContactRequest, ContactSubmission } from '@/types/contact';
import { buildConfirmationEmail, buildNotificationEmail, getSender, resolveEnvironment } from '@/utils/contact-email';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(error: ContactError, status: number): Response {
  return Response.json({ ok: false, error }, { status });
}

function isFilled(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;
}

// The name ends up in the mail Subject, where a stray CR/LF would be a header boundary. Resend
// almost certainly encodes the header itself, but that is an assumption about someone else's
// implementation at a trust boundary, so strip control characters here regardless.
function toHeaderSafe(value: string): string {
  // Matching control characters is the entire point here, so no-control-regex does not apply.
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]+/g, ' ').trim();
}

/**
 * Rejects anything that must never reach Resend. Returns null instead of throwing so the
 * caller keeps a single, flat error path.
 */
function readSubmission(body: ContactRequest): ContactSubmission | null {
  const { name, email, message, locale } = body;

  if (!isFilled(name, MAX_NAME_LENGTH)) return null;
  if (!isFilled(email, MAX_EMAIL_LENGTH) || !EMAIL_PATTERN.test(email.trim())) return null;
  if (!isFilled(message, MAX_MESSAGE_LENGTH)) return null;

  const headerSafeName = toHeaderSafe(name);

  // Stripping control characters can empty an otherwise "filled" name.
  if (headerSafeName.length === 0) return null;

  return {
    name: headerSafeName,
    email: email.trim(),
    message: message.trim(),
    // An unknown locale only affects the wording of the confirmation, so fall back rather
    // than reject an otherwise valid submission.
    locale: typeof locale === 'string' && locales.includes(locale) ? locale : defaultLocale,
  };
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !recipient) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set');

    return fail('email_not_configured', 500);
  }

  let body: ContactRequest;

  try {
    body = await req.json();
  } catch {
    return fail('invalid_input', 400);
  }

  // The honeypot is hidden from people, so a filled-in value means a bot. Answering with
  // success denies it the signal it would need to adapt - but log it, otherwise a false
  // positive here discards a genuine submission with no trace anywhere.
  if (typeof body.messageRef === 'string' && body.messageRef.trim().length > 0) {
    console.warn('[contact] honeypot triggered, submission dropped');

    return Response.json({ ok: true });
  }

  const submission = readSubmission(body);

  if (!submission) return fail('invalid_input', 400);

  const environment = resolveEnvironment();
  const sender = getSender(environment);
  const host = req.headers.get('host') ?? 'unknown';
  const tags = [
    { name: 'env', value: environment },
    { name: 'source', value: 'contact-form' },
  ];

  const resend = new Resend(apiKey);
  const notification = buildNotificationEmail(submission, environment, host);

  // The SDK reports failures through `error` rather than by throwing.
  const { error: notificationError } = await resend.emails.send({
    from: sender,
    to: recipient,
    replyTo: submission.email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    tags,
  });

  if (notificationError) {
    console.error('[contact] notification send failed:', notificationError.message);

    return fail('send_failed', 502);
  }

  const { t } = await createTranslation(submission.locale, 'common');
  const confirmation = buildConfirmationEmail(submission, t);

  const { error: confirmationError } = await resend.emails.send({
    from: sender,
    to: submission.email,
    replyTo: recipient,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
    tags,
  });

  // The ticket is already delivered, so a failed courtesy reply must not be reported to the
  // visitor as a failed submission.
  if (confirmationError) {
    console.error('[contact] confirmation send failed:', confirmationError.message);
  }

  return Response.json({ ok: true });
}
