# ClassFlow AI Setup Guide

## 1. Create `.env.local`

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase Dashboard > Settings > API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase Dashboard > Settings > API

## 2. Run Database Migration

Go to **Supabase Dashboard > SQL Editor** and paste the contents of:
```
supabase/migrations/001_full_schema.sql
```

This creates: `user_profiles`, `google_tokens`, `courses`, `assignments`, `ai_summaries`

## 3. Configure Google OAuth in Supabase

1. Go to **Supabase Dashboard > Authentication > Providers > Google**
2. Enable the Google provider
3. Add your Google Client ID and Secret
4. **IMPORTANT**: Enable "Save provider tokens" (this captures the Google access token)
5. Add these scopes to the provider config:
   - `https://www.googleapis.com/auth/classroom.courses.readonly`
   - `https://www.googleapis.com/auth/classroom.coursework.me`
   - `https://www.googleapis.com/auth/classroom.rosters.readonly`

## 4. Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable the **Google Classroom API**
3. In OAuth consent screen, add the Classroom scopes
4. In Credentials, ensure the OAuth redirect URI includes:
   `https://wmnhvntpjoivwlefojyt.supabase.co/auth/v1/callback`

## 5. Deploy Edge Functions

Install the Supabase CLI if not already:
```bash
npm install -g supabase
```

Set secrets:
```bash
supabase secrets set GOOGLE_CLIENT_ID=your-client-id
supabase secrets set GOOGLE_CLIENT_SECRET=your-client-secret
supabase secrets set FEATHERLESS_API_KEY=your-featherless-api-key
```

Deploy functions:
```bash
supabase functions deploy sync-classroom
supabase functions deploy generate-summary
```

## 6. Run the App

```bash
npm run dev
```

Visit http://localhost:3000, click "Sign in with Google", grant Classroom permissions, and you'll land on the dashboard. Click "Sync Classroom" to import your courses and assignments.
