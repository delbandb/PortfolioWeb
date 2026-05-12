# Standalone Portfolio

This folder is the extracted frontend-only version of the portfolio app, with the Replit and monorepo-specific setup removed.

## What stayed

- `src/App.tsx`
- `src/main.tsx`
- `src/index.css`
- `src/components/PageLayout.tsx`
- `src/components/CyberBackground.tsx`
- `src/components/ParticleField.tsx`
- `src/pages/*`
- `src/assets/hero-background.png`
- `public/favicon.svg`
- `public/opengraph.jpg`

## What was intentionally removed

- Replit runtime plugins and env requirements
- Workspace-only package references
- Monorepo config
- Backend and API packages
- Generic unused UI scaffolding from the original `src/components/ui`
- `.replit`, `.replit-artifact`, `replit.md`, and the root workspace files

## If you want to publish this as your own repo

1. Copy this `standalone-portfolio` folder into a new repository.
2. Run `npm install` or `pnpm install`.
3. Replace the placeholder content in `src/pages`.
4. Replace the hero image in `src/assets/hero-background.png`.
5. Update the page title and metadata in `index.html`.

## Contact backend

The contact form is wired for a real backend flow:

- The React form posts to `VITE_CONTACT_ENDPOINT`.
- The Node backend receives the message at `/api/contact`.
- Every message is saved to `messages/contact-messages.jsonl`.
- If `RESEND_API_KEY` is configured, the backend sends the message to your email.
- If `CONTACT_FORWARD_URL` is configured, the backend forwards the message to that webhook.

### Run locally

1. Copy `.env.example` to `.env`.
2. Set `VITE_CONTACT_ENDPOINT=http://127.0.0.1:8787/api/contact`.
3. In one terminal, run `npm run contact:server`.
4. In another terminal, run `npm run dev`.

### Receive messages by email

The included backend supports email through Resend using only built-in Node `fetch`, so no extra package is required.

Set these in `.env`:

```text
RESEND_API_KEY=your_backend_api_key
CONTACT_TO_EMAIL=delbandbehdadfar@yahoo.com
CONTACT_FROM_EMAIL=Portfolio Contact <your_verified_sender@yourdomain.com>
```

Never put `RESEND_API_KEY`, SMTP passwords, MySQL passwords, or webhook secrets in a `VITE_*` variable. `VITE_*` variables are bundled into the browser.

### Webhook option

If you prefer Discord, Slack, Make, Zapier, or another automation tool, set:

```text
CONTACT_FORWARD_URL=https://your-webhook-url
```

### MySQL option

Do not connect MySQL directly from React. If you want MySQL, add database writing inside `server/contact-server.mjs` or replace it with a backend API that receives the form message, writes to MySQL, and sends a notification.

## Deploy Online

The simplest production setup is one Node web service that serves both the React build and the contact API:

- Website: `https://delbandbehdadfar.dev`
- Contact API: `https://delbandbehdadfar.dev/api/contact`
- Health check: `https://delbandbehdadfar.dev/api/health`

This avoids CORS problems because the frontend and backend use the same domain.

### Render setup

This repo includes `render.yaml` for Render Blueprint deployments.

If deploying manually on Render:

- Service type: Web Service
- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Environment variables:
  - `CONTACT_HOST=0.0.0.0`
  - `VITE_CONTACT_ENDPOINT=/api/contact`
  - `CONTACT_TO_EMAIL=delbandbehdadfar96@gmail.com`
  - `CONTACT_ALLOWED_ORIGIN=https://delbandbehdadfar.dev`
  - `CONTACT_REQUIRE_NOTIFICATION=true`
  - `RESEND_API_KEY=your_backend_api_key`
  - `CONTACT_FROM_EMAIL=Portfolio Contact <your_verified_sender@yourdomain.com>`

Render provides the `PORT` variable automatically. The server reads it in production.

### Domain setup

After buying `delbandbehdadfar.dev`:

1. Add `delbandbehdadfar.dev` as a custom domain on the Render web service.
2. Add `www.delbandbehdadfar.dev` too if you want the `www` version.
3. Copy the DNS records Render gives you into your domain registrar.
4. Wait for Render to verify the domain and issue HTTPS certificates.

### Email setup

The backend currently supports Resend through the REST API. Create a Resend API key and put it only in the backend environment variable `RESEND_API_KEY`.

For best deliverability, verify your domain in Resend and use a sender such as:

```text
Portfolio Contact <contact@delbandbehdadfar.dev>
```

During early testing, Resend's sandbox/onboarding sender may work only for limited recipients. A verified sender domain is the proper production setup.

If Resend returns an error saying it can only send testing emails to your own account, either:

- Set `CONTACT_TO_EMAIL=delbandbehdadfar96@gmail.com` for immediate testing.
- Or verify `delbandbehdadfar.dev` in Resend, set the DNS records in Cloudflare, and use a sender such as `Portfolio Contact <contact@delbandbehdadfar.dev>`.

## Original repo areas you do not need for the frontend-only version

- `artifacts/api-server/`
- `lib/`
- `scripts/`
- `.replit`
- `replit.md`
- `pnpm-workspace.yaml`
- `tsconfig.base.json`
- `artifacts/portfolio/.replit-artifact/`
