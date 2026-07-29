import { useRef, useState, type FormEvent } from 'react';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

import TurnstileField from '@/components/turnstile/turnstile-field';

// There is no auth backend yet. Both forms behave like real ones - they validate,
// show a short pending state and then report an outcome - but nothing leaves the
// browser and nothing is stored.
//
// The Turnstile widget below is therefore inert: it produces a token, but nothing sends it
// and no server verifies it, so it protects nothing yet. It is wired up now so that adding
// the backend is a server-side change only. Do not read its presence as the form being
// protected.
const FAKE_REQUEST_MS = 600;

// Half of the fade, so the content swaps while the panel is invisible.
const SWITCH_MS = 200;

export type AuthMode = 'signin' | 'reset';

type Status = 'idle' | 'pending' | 'done';

const inputClassName =
  'border-stroke text-body-color focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none';

const labelClassName = 'text-dark mb-3 block text-sm dark:text-white';

const submitClassName =
  'bg-primary shadow-submit hover:bg-primary/90 dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm px-9 py-4 text-base font-medium text-white duration-300 disabled:opacity-70';

type LoginFormProps = {
  mode: AuthMode;
  onModeChange: (next: AuthMode) => void;
};

export default function LoginForm({ mode, onModeChange }: LoginFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [visible, setVisible] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const switchMode = (next: AuthMode) => {
    if (next === mode) return;

    // Fade out first, swap the panel while it is hidden, then fade back in.
    setVisible(false);
    setTimeout(() => {
      setStatus('idle');
      onModeChange(next);
      setVisible(true);
    }, SWITCH_MS);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'pending') return;

    setStatus('pending');
    setTimeout(() => {
      setStatus('done');

      // Signing in and requesting a reset are separate actions, and a token may only be
      // redeemed once, so each attempt has to start from a fresh challenge.
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    }, FAKE_REQUEST_MS);
  };

  return (
    <div
      className={`transition-all duration-200 ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label htmlFor="email" className={labelClassName}>
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your Email"
            onChange={() => setStatus('idle')}
            className={inputClassName}
          />
        </div>

        {mode === 'signin' && (
          <>
            <div className="mb-8">
              <label htmlFor="password" className={labelClassName}>
                Your Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter your Password"
                onChange={() => setStatus('idle')}
                className={inputClassName}
              />
            </div>

            <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
              <div className="mb-4 sm:mb-0">
                <label
                  htmlFor="checkboxLabel"
                  className="text-body-color flex cursor-pointer items-center text-sm font-medium select-none"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="checkboxLabel"
                      checked={keepSignedIn}
                      onChange={(event) => setKeepSignedIn(event.target.checked)}
                      className="sr-only"
                    />
                    <div className="box border-body-color border-opacity-20 dark:border-opacity-10 mr-4 flex h-5 w-5 items-center justify-center rounded border dark:border-white">
                      <span className={keepSignedIn ? 'opacity-100' : 'opacity-0'}>
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                            fill="#3056D3"
                            stroke="#3056D3"
                            strokeWidth="0.4"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  Keep me signed in
                </label>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => switchMode('reset')}
                  className="text-primary cursor-pointer text-sm font-medium hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </>
        )}

        {status === 'done' && mode === 'signin' && (
          <div
            role="alert"
            className="mb-6 rounded-sm border border-red-500/40 bg-red-500/10 px-6 py-3 text-base text-red-600 dark:text-red-400"
          >
            We could not find your email and password in our database.
          </div>
        )}

        {status === 'done' && mode === 'reset' && (
          <div
            role="status"
            className="border-primary/40 bg-primary/10 text-primary mb-6 rounded-sm border px-6 py-3 text-base"
          >
            If an account exists for that email, a reset link is on its way.
          </div>
        )}

        <TurnstileField ref={turnstileRef} onToken={setTurnstileToken} className="mb-8" />

        <div className="mb-6">
          <button type="submit" disabled={status === 'pending' || !turnstileToken} className={submitClassName}>
            {mode === 'signin'
              ? status === 'pending'
                ? 'Signing in...'
                : 'Sign in'
              : status === 'pending'
                ? 'Sending...'
                : 'Send reset link'}
          </button>
        </div>
      </form>

      {mode === 'reset' && (
        <p className="mb-6 text-center">
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className="text-primary cursor-pointer text-sm font-medium hover:underline"
          >
            Back to sign in
          </button>
        </p>
      )}
    </div>
  );
}
