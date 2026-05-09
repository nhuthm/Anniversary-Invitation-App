# Anniversary Invitation App

A small React + Vite app that lets her pick our 3-month anniversary date plan
(dinner + activity) and emails the result via Resend.

## Local development

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`
3. `npm run dev` — runs the Vite dev server on http://localhost:5173

> The send button calls `/api/send-invitation`, which is a Vercel serverless
> function. The Vite dev server alone won't run it. To exercise the real send
> flow locally, install the Vercel CLI and run `vercel dev` instead of `npm run dev`.

## Behavior

- Selections (dinner + activity) are persisted in `localStorage` under
  `anniversary-invitation:selection`, so reloads keep the choices.
- "Send it" POSTs to `/api/send-invitation`, which uses Resend to email
  `huynhminhnhut@gmail.com`. Recipient and sender name are configured at the top
  of `src/App.tsx`.
- The function sends from `onboarding@resend.dev` (Resend's test sender). It
  only delivers to the email address that owns the Resend account. To send to
  any address, verify a custom domain in Resend and update the `from` field in
  `api/send-invitation.ts`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, import the repo. Framework preset auto-detects as **Vite**.
3. Add an environment variable: `RESEND_API_KEY` = your Resend key.
4. Deploy. The `api/` directory becomes serverless functions automatically.
