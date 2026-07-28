import type { ContactSubmission } from '@/types/contact';

export type DeploymentEnvironment = 'production' | 'preview' | 'development';

type Translate = (key: string, options?: Record<string, unknown>) => string;

// i18next escapes interpolated values by default. This module escapes on its way into HTML
// and needs the raw value for the plain-text part, so escaping here would double up and
// surface as literal `&#39;` in names like O'Brien.
const RAW_INTERPOLATION = { interpolation: { escapeValue: false } };

type Email = {
  subject: string;
  html: string;
  text: string;
};

// `info@` already exists as a real mailbox on the domain, so replies to the confirmation
// reach somebody instead of bouncing.
const PRODUCTION_SENDER = 'Wonrial <info@wonrial.com>';

// Every non-production environment shares one sender. Resend verifies domains, not
// addresses, so both live on the single free-plan domain; only the local part and the
// subject prefix differ.
const NON_PRODUCTION_SENDER = 'Wonrial [DEV] <info-dev@wonrial.com>';

/**
 * Vercel exposes `production` and `preview` as separate environments for this project,
 * so the deployment tells us which one it is without inspecting the request.
 *
 * Anything unrecognised - including a local `npm run dev`, where the variable is unset -
 * falls back to development: an unknown value must never be able to pass for production.
 */
export function resolveEnvironment(): DeploymentEnvironment {
  const environment = process.env.VERCEL_ENV;

  return environment === 'production' || environment === 'preview' ? environment : 'development';
}

export function getSender(environment: DeploymentEnvironment): string {
  return environment === 'production' ? PRODUCTION_SENDER : NON_PRODUCTION_SENDER;
}

// Production subjects stay clean; everywhere else says so up front.
function getSubjectPrefix(environment: DeploymentEnvironment): string {
  return environment === 'production' ? '' : `[${environment.toUpperCase()}] `;
}

// Submissions are untrusted input rendered into HTML, so every interpolated value is escaped.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toHtmlParagraph(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br />');
}

/**
 * The ticket that reaches the company inbox. The environment and the originating host are
 * part of the body so a submission can be traced back to where it came from.
 */
export function buildNotificationEmail(
  submission: ContactSubmission,
  environment: DeploymentEnvironment,
  host: string,
): Email {
  const { name, email, message, locale } = submission;
  const receivedAt = new Date().toISOString();
  const subject = `${getSubjectPrefix(environment)}Contact form: ${name}`;

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Locale:</strong> ${escapeHtml(locale)}</p>
    <p><strong>Environment:</strong> ${environment}</p>
    <p><strong>Origin:</strong> ${escapeHtml(host)}</p>
    <p><strong>Received:</strong> ${receivedAt}</p>
    <hr />
    <p>${toHtmlParagraph(message)}</p>
  `;

  const text = [
    'New contact form submission',
    `Name: ${name}`,
    `Email: ${email}`,
    `Locale: ${locale}`,
    `Environment: ${environment}`,
    `Origin: ${host}`,
    `Received: ${receivedAt}`,
    '',
    message,
  ].join('\n');

  return { subject, html, text };
}

/**
 * The courtesy reply to the visitor, in the language they used on the site.
 */
export function buildConfirmationEmail(submission: ContactSubmission, t: Translate): Email {
  const greeting = t('contact.email.greeting', { name: submission.name, ...RAW_INTERPOLATION });
  const body = t('contact.email.body');
  const yourMessage = t('contact.email.yourMessage');
  const signature = t('contact.email.signature');

  const html = `
    <p>${escapeHtml(greeting)}</p>
    <p>${escapeHtml(body)}</p>
    <p><strong>${escapeHtml(yourMessage)}</strong></p>
    <p>${toHtmlParagraph(submission.message)}</p>
    <p>${escapeHtml(signature)}</p>
  `;

  const text = [greeting, '', body, '', yourMessage, submission.message, '', signature].join('\n');

  return { subject: t('contact.email.subject'), html, text };
}
