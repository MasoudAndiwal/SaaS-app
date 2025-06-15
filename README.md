# The First SaaS

A production-ready SaaS starter built with **Next.js 15**, **React 19**, and **TypeScript 5**. It ships with Clerk authentication, Supabase persistence, AI voice companions, subscriptions, Sentry monitoring, and a modern Tailwind CSS 4 theme so you can start building your own SaaS today.

---

## ✨ Features

• Authentication & user management via [Clerk](https://clerk.com/)  
• Data storage & edge functions powered by [Supabase](https://supabase.com/)  
• AI voice companions through [Vapi](https://vapi.ai/) SDK  
• Type-safe forms with **react-hook-form** + **zod**  
• Radix UI primitives & utility components  
• Dark / light theme toggle with **next-themes**  
• Subscription & billing flow (Stripe-ready)  
• Error tracking & performance with **Sentry**  
• Fully typed end-to-end with **TypeScript**  
• Deploy anywhere that runs Node – Vercel, Netlify, Render …

---

## 🏗️ Tech Stack

| Category     | Tech                                    |
| ------------ | --------------------------------------- |
| Framework    | Next.js 15 (App Router, Server Components) |
| Language     | React 19, TypeScript 5                  |
| Styling      | Tailwind CSS 4, clsx, tailwind-merge    |
| UI / UX      | Radix UI, Lucide icons, Lottie          |
| Auth         | Clerk                                   |
| Database     | Supabase Postgres / Storage             |
| Observability| Sentry                                  |
| AI           | Vapi SDK                                |

---

## 🚀 Quick Start

1. **Clone the repo**

```bash
git clone https://github.com/<your-handle>/the-first-saas.git
cd the-first-saas
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env.local`** and fill in the required environment variables:

```bash
# Clerk
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Vapi
NEXT_PUBLIC_VAPI_KEY=

# Sentry (optional)
SENTRY_DSN=
```

4. **Run the development server**

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. Hot-reload is enabled.

---

## 📂 Project Structure

```
app/            # App Router pages & layouts
components/     # Reusable UI + feature components
constants/      # Static data & enums
lib/            # Server actions, utilities, sdk wrappers
public/         # Static assets
```

---

## 📦 NPM Scripts

| Command          | Purpose                               |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Start dev server with Turbopack        |
| `npm run build`  | Create an optimized production build   |
| `npm run start`  | Run the built app                      |
| `npm run lint`   | Lint the codebase with ESLint          |

---

## 🛫 Deployment

The project can be deployed to any Node-compatible host. The easiest path is [Vercel](https://vercel.com/):

1. Push the repository to GitHub/GitLab.
2. Import the repo in Vercel, set the **Environment Variables** above, and hit **Deploy**.

---

## 🤝 Contributing

1. Fork the repo & create a feature branch.
2. Commit your changes following the [Conventional Commits](https://www.conventionalcommits.org/) spec.
3. Open a PR — please describe _why_ the change is needed.

---

## 📄 License

Released under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

> Built with ❤️ & ☕ by **Masoud Andiwal**.
