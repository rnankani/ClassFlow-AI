# ClassFlow AI

An AI-powered student copilot that syncs with Google Classroom to help students stay on top of assignments, deadlines, and study plans.

## Features

- **Google Classroom Integration**: One-click OAuth sync with Google Classroom
- **AI-Powered Assignment Analysis**: Automatically organizes and prioritizes assignments
- **Today's Focus**: Clear daily action plan
- **Urgent Work Detection**: Never miss a deadline again
- **Interactive Dashboard**: Beautiful, animated UI with smooth transitions

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- NextAuth.js (Google OAuth)
- Lucide React (icons)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Then fill in your Google OAuth credentials from the [Google Cloud Console](https://console.cloud.google.com/):
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Landing Page Sections

1. **Hero**: Powerful headline with dashboard preview
2. **Pain Points**: Student problems this solves
3. **Benefits**: Key features with icons
4. **How It Works**: 4-step process
5. **Product Preview**: Interactive dashboard mockup
6. **Why Students Love It**: Emotional benefits
7. **Social Proof**: Stats, badges, testimonials
8. **Final CTA**: Strong closing call-to-action

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Classroom API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy credentials to `.env.local`

## Deployment

Ready to deploy to Vercel:

```bash
npm i -g vercel
vercel
```

## License

MIT
