# WONRIAL Deployment & DNS Guide

**Last Updated**: 2026-07-28
**Version**: 26.07.6
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

## Releasing

`main` is protected: merges go through a pull request and the `Lint and formatting` check has to
pass. Reviews are not required - GitHub will not let you approve your own pull request, and this
is a single-maintainer repository. Administrators can still bypass, deliberately, so a broken
`main` can be repaired without fighting the settings.

Direct `git push` to `main` no longer works. The release commit belongs on `develop` anyway, and
tags are not covered by branch protection.

```bash
# on develop, after the work is merged and validated on preview
npm version --no-git-tag-version <version>   # then restore the CalVer leading zero by hand
#   npm normalises 26.07.5 to 26.7.5; fix package.json, package-lock.json and the docs headers
git commit -am "chore(release): <version>" && git push origin develop

gh pr create --base main --head develop --title "Release <version>" --body "<summary>"
gh pr checks --watch
gh pr merge --merge --subject "<subject>" --body "<body>"

git fetch origin main && git tag -a <version> -m "<notes>" origin/main
git push origin <version>
```

`--merge` keeps a merge commit, so the history still shows which branch went where; squashing
would flatten that. `--subject` and `--body` override GitHub's default "Merge pull request #N".

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

Registrar **and** DNS live with the same provider, on its basic DNS tier. The zone was migrated
in July 2026; before that the domain was registered with one provider while another still
served the zone, so the registrar's DNS panel had no effect on the live domain.

A stale zone from the previous provider may still answer for the domain. It is outside any
account we control and cannot be removed, but it is inert: the registry delegates elsewhere, so
nothing queries it. The practical rule - **never read a lookup aimed at a specific nameserver as
evidence of the live configuration**; query the domain, not a server.

The zone holds, by purpose rather than by value:

| Host | Purpose | Losing it means |
|---|---|---|
| `@` (A) | points the apex at the hosting provider | **the site goes down** |
| `www` (CNAME) | apex alias | www stops resolving |
| `@` (TXT) | SPF for the mailbox provider, plus a search-console token | mail starts failing SPF |
| `@` (MX) | inbound mail, three hosts by priority | the domain stops receiving mail |
| `<selector>._domainkey` (TXT) | one DKIM key per sending provider | that provider's mail goes unsigned |
| `send` (TXT + MX) | the transactional provider's SPF and bounce handling | transactional sending degrades |
| `_dmarc` (TXT) | DMARC, currently monitor-only | no DMARC signal |

Read the live values straight from the zone rather than from here - a copy in a document goes
stale silently, and the authoritative answer is one query away:

```bash
dig +short ANY wonrial.com
dig +short TXT <selector>._domainkey.wonrial.com
```

DNSSEC is off.

### Mailboxes

Inbound mail is served by the provider behind the MX records. `info@wonrial.com` is a real
deliverable address and the production sender, so replies to the contact-form confirmation reach
a person. The non-production sender has no mailbox behind it.

Which address `CONTACT_TO_EMAIL` points at is an environment variable, not a code decision - see
the table above.

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
