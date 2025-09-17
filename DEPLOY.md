## Deployment Guide (Vercel + Supabase)

1) Prerequisites
- Create a Supabase project (DB + Storage). Note project URL and keys.
- Create Google OAuth credentials (Web) with callback: https://YOUR_VERCEL_DOMAIN/api/auth/callback/google
- SMTP credentials for Email sign-in (or use Resend/other provider)

2) Required environment variables
Add the following in Vercel Project Settings → Environment Variables (Production and Preview):
- DATABASE_URL
- NEXTAUTH_URL = https://YOUR_VERCEL_DOMAIN
- NEXTAUTH_SECRET (generate a secure value)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- EMAIL_SERVER, EMAIL_FROM
- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (server only)
- SUPABASE_STORAGE_BUCKET (e.g., aiartistry)
- OPENAI_API_KEY (optional for real image/design), STABILITY_API_KEY, RUNWAY_API_KEY

3) Build and runtime
- Vercel will install dependencies and run `postinstall` → `prisma generate`.
- Ensure `DATABASE_URL` points to your Supabase Postgres.
- Run migrations once from local or Vercel CLI:
  - Locally: `npx prisma migrate deploy` (uses .env DATABASE_URL)

4) Supabase Storage
- Ensure the bucket specified by SUPABASE_STORAGE_BUCKET exists and is public. The app will auto-create if missing using the service role key.

5) NextAuth Providers
- Google: set authorized redirect URI to `https://YOUR_VERCEL_DOMAIN/api/auth/callback/google`.
- Email: set EMAIL_SERVER and EMAIL_FROM.

6) Domains and Images
- `next.config.ts` allows images from `*.supabase.co` and `*.amazonaws.com`.

7) Local development
- Copy `.env.example` to `.env.local` and fill values.
- `npm run dev` and open http://localhost:3000

8) Notes
- Replace placeholder provider calls in `lib/ai.ts` with real API integrations.
- Monitor logs in Vercel and Supabase for errors.
