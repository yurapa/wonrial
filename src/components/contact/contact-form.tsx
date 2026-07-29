'use client';

import Script from 'next/script';
import { useParams } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';

import { useTranslation } from '@/i18n/client';
import type { LocaleTypes } from '@/i18n/settings';

// Only the one call we make is typed. Augmenting the global Window would need an `interface`,
// which the project's lint rules disallow, and it would leak this into every file.
type TurnstileApi = { reset: (container?: string | HTMLElement) => void };

type Status = 'idle' | 'pending' | 'success' | 'error';

// Which widget this is - and therefore which environment the challenge is scored against -
// comes from the environment variable, not from a branch in here.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputClassName =
  'border-stroke text-body-color focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none';

const labelClassName = 'text-dark mb-3 block text-sm font-medium dark:text-white';

const submitClassName =
  'bg-primary shadow-submit hover:bg-primary/90 dark:shadow-submit-dark rounded-sm px-9 py-4 text-base font-medium text-white duration-300 disabled:opacity-70';

const ContactForm = () => {
  const { locale } = useParams();
  const { t } = useTranslation(locale as LocaleTypes, 'common');
  const [status, setStatus] = useState<Status>('idle');
  const turnstileRef = useRef<HTMLDivElement>(null);

  // `status` comes from the render closure, so it lags a second submit fired before React
  // re-renders. A ref latches synchronously and makes the guard unconditional.
  const isSending = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending.current) return;

    isSending.current = true;

    const form = event.currentTarget;
    const fields = new FormData(form);

    setStatus('pending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.get('name'),
          email: fields.get('email'),
          message: fields.get('message'),
          messageRef: fields.get('messageRef'),
          // Turnstile writes its token into a hidden input of this name inside the form.
          turnstileToken: fields.get('cf-turnstile-response'),
          locale,
        }),
      });

      if (!response.ok) throw new Error(`Contact request failed with ${response.status}`);

      form.reset();
      setStatus('success');
    } catch {
      // Leave the entered values in place so a retry does not mean retyping everything.
      setStatus('error');
    } finally {
      isSending.current = false;

      // A Turnstile token is single-use, so the widget has to be reset either way or the next
      // attempt fails verification with a token Cloudflare has already redeemed.
      const turnstile = (window as unknown as { turnstile?: TurnstileApi }).turnstile;

      if (turnstileRef.current) turnstile?.reset(turnstileRef.current);
    }
  };

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <form onSubmit={handleSubmit}>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2">
            <div className="mb-8">
              <label htmlFor="name" className={labelClassName}>
                {t('contact.nameLabel')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={100}
                placeholder={t('contact.namePlaceholder')}
                className={inputClassName}
              />
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="mb-8">
              <label htmlFor="email" className={labelClassName}>
                {t('contact.emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={254}
                placeholder={t('contact.emailPlaceholder')}
                className={inputClassName}
              />
            </div>
          </div>
          <div className="w-full px-4">
            <div className="mb-8">
              <label htmlFor="message" className={labelClassName}>
                {t('contact.messageLabel')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={5000}
                placeholder={t('contact.messagePlaceholder')}
                className={`${inputClassName} resize-none`}
              ></textarea>
            </div>
          </div>

          {/*
          Decoy field. It is moved off-canvas rather than hidden with `display: none` or
          `type="hidden"`, because bots skip fields they can tell are not rendered. Kept out
          of the tab order and the accessibility tree so no visitor can reach it by accident.

          The name is deliberately meaningless and carries no label: anything resembling
          `company`, `organization` or another autofill token gets filled from the browser's
          saved address profile - `autoComplete="off"` is only advisory for those - and a
          honeypot that fires on a real person silently discards their message.
        */}
          <div className="absolute top-0 -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <input
              type="text"
              id="message-ref"
              name="messageRef"
              tabIndex={-1}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore
            />
          </div>

          <div className="w-full px-4">
            <div ref={turnstileRef} className="cf-turnstile mb-8" data-sitekey={TURNSTILE_SITE_KEY} data-theme="auto" />
          </div>

          <div className="w-full px-4">
            <button type="submit" disabled={status === 'pending'} className={submitClassName}>
              {status === 'pending' ? t('contact.sending') : t('contact.submit')}
            </button>
          </div>

          <div className="w-full px-4" aria-live="polite">
            {status === 'success' && (
              <p className="mt-6 text-base font-medium text-green-600 dark:text-green-400">{t('contact.success')}</p>
            )}
            {status === 'error' && (
              <p className="mt-6 text-base font-medium text-red-600 dark:text-red-400">{t('contact.error')}</p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
