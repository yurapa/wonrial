# WONRIAL Deployment & DNS Guide

**Last Updated**: 2026-07-28
**Version**: 26.07.3
**Applies To**: hosting, DNS zone, and email delivery for `wonrial.com`

## Hosting

Vercel, auto-deployed from GitHub.

| Vercel environment | Branch | Domains |
|---|---|---|
| Production | `main` | `wonrial.com` (+3 aliases) |
| Preview | all unassigned branches | `wonrial.vercel.app` |
| Development | Vercel CLI | none |

Production and Preview are genuinely separate environments, so `VERCEL_ENV` differs between
them and environment variables can be scoped per environment. `src/utils/contact-email.ts`
relies on this to label outbound mail.

## Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `GROQ_API_KEY` | `/api/chat` | |
| `RESEND_API_KEY` | `/api/contact` | A **sending-only** key cannot read the Domains API; create a full-access key if you need that |
| `CONTACT_TO_EMAIL` | `/api/contact` | Inbox receiving contact tickets |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `/contact` form | Public; picks which Turnstile widget renders |
| `TURNSTILE_SECRET_KEY` | `/api/contact` | Secret; verifies the token server-side |
| `NEXT_PUBLIC_GTM_ID` | analytics | Optional; analytics is skipped when unset |

Set them in Vercel per environment, and in local `.env` (git-ignored).

## Cloudflare Turnstile

Two widgets, so production and non-production have separate keys and separate analytics. A dev
secret leaks more easily — it lives in local `.env` files and in preview settings — and with one
shared widget that leak would also defeat verification in production.

| Widget | Hostnames | Used by |
|---|---|---|
| `WONRIAL PROD` | `wonrial.com`, `www.wonrial.com` | Vercel Production |
| `WONRIAL DEV` | `wonrial.vercel.app`, `localhost` | Vercel Preview and local |

Both use the Managed widget mode with pre-clearance off.

The environment split is done entirely by the environment variables — Vercel scopes them per
environment, so the code never branches on which widget to use. Set the PROD pair in Vercel
Production and the DEV pair in Vercel Preview and in local `.env`.

Turnstile tokens are single-use: every form resets the widget after a submit, otherwise a retry
fails with a token Cloudflare has already redeemed.

The widget is rendered by `@marsidev/react-turnstile` through
`src/components/turnstile/turnstile-field.tsx`, which is the only place the site key appears.
Forms hold the token in state and keep submit disabled until it arrives, so a visitor who
submits before the challenge resolves no longer gets the 403 meant for bots.

The library renders explicitly rather than letting Cloudflare's script scan the DOM once on
load. That is what allows the widget to work inside the login modal, whose content mounts only
when the modal opens.

## DNS zone

Registrar **and** DNS: Namecheap (BasicDNS). Migrated from GoDaddy on 2026-07-28; before that
the domain was registered at Namecheap while `ns51/ns52.domaincontrol.com` still served the
zone, which meant Namecheap's Advanced DNS panel had no effect on the live domain.

A stale GoDaddy zone still answers for `wonrial.com` on those nameservers (March snapshot,
SOA serial `2026032600`), left over from when the domain was registered there. It sits outside
any accessible GoDaddy account and cannot be removed, but it is inert: the registry delegates
to Namecheap, so nothing queries it. Ignore it — do not treat a lookup against
`@ns51.domaincontrol.com` as evidence of the live configuration.

Current records:

| Type | Host | Value | Purpose |
|---|---|---|---|
| A | `@` | `216.198.79.1` | Vercel — **the site goes down without it** |
| CNAME | `www` | `wonrial.com.` | www alias |
| TXT | `@` | `v=spf1 include:zohomail.eu ~all` | SPF for Zoho |
| TXT | `@` | `google-site-verification=s85oM5hn-…` | Search Console |
| MX | `@` | `mx.zoho.eu` (10), `mx2` (20), `mx3` (50) | Zoho inbound |
| TXT | `zmail._domainkey` | Zoho DKIM key | Zoho signing |
| TXT | `resend._domainkey` | Resend DKIM key | Resend signing |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | Resend SPF |
| MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` (10) | Resend bounce handling |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | DMARC monitoring |

DNSSEC is off.

### Zoho mailboxes

Zoho Mail (Mail Free plan) serves inbound mail for the domain. There is one mailbox with two
addresses — `admin@wonrial.com` (the mailbox address) and `info@wonrial.com` (an alias) — so
`CONTACT_TO_EMAIL` may be either; both land in the same place. `info@wonrial.com` is also the
production sender, which means replies to the contact-form confirmation reach a real inbox.

`info-dev@wonrial.com`, the non-production sender, has no Zoho mailbox.

### Why Resend does not disturb Zoho

Resend scopes its SPF and bounce MX to the `send.wonrial.com` subdomain and signs with its own
`resend._domainkey` selector. The root SPF and the Zoho `zmail._domainkey` selector are
therefore untouched, and both senders coexist on one domain.

**A domain may carry only one SPF TXT record per host.** If a provider ever asks for a root
SPF change, merge its `include:` into the existing record rather than adding a second one —
two root SPF records break SPF for every sender on the domain.

## Changing nameservers

Namecheap hides the Host Records editor while custom nameservers are set, so a zone cannot be
pre-populated: switch DNS type first, then paste the records immediately.

The registry NS TTL is 48h, which cushions this — after the switch most resolvers keep using
the previous nameservers for hours, so a briefly empty new zone is invisible to nearly
everyone. Verify the new zone directly instead of waiting on propagation:

```bash
NS=dns1.registrar-servers.com
dig +short A wonrial.com @$NS
dig +short MX wonrial.com @$NS
dig +short TXT zmail._domainkey.wonrial.com @$NS
```

Namecheap can take a few seconds to publish a freshly saved record, so re-query before
concluding that one failed to save.

## Adding a sending domain in Resend

1. Resend → Domains → Add Domain → `wonrial.com`.
2. Copy the DKIM/SPF records into the Namecheap zone. The dashboard truncates long values with
   `[…]`; that marker is decorative, but confirm a copied DKIM key is 216 characters and
   parses before relying on it:
   ```bash
   echo -n "<key>" | base64 -d | openssl rsa -pubin -inform DER -noout -text
   ```
3. Click **Verify DNS Records**.

Until the domain reads Verified, every send returns 403 and `/api/contact` responds
`502 send_failed` with the real cause logged server-side.
