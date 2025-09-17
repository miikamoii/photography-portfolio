# 📸 photoCode_Portfolio

Welcome! This is both a gallery of my photography and a personal sandbox for modern web development. Here, I experiment with new technologies, design patterns, and best practices while building everything with intention and a focus on both form and function.

---

## ✨ Purpose

- **Showcase my photography** in a fast, interactive gallery.
- **Sharpen my development skills** by building custom components and exploring the latest in web tech.

---

## 🔧 Tech Stack

- **Next.js App Router** – full-stack React framework
- **TypeScript** – type safety & maintainability
- **Tailwind CSS** – rapid, responsive styling
- **Framer Motion** – smooth animations & transitions
- **NextAuth** – secure guest authentication
- **Upstash Redis** – lightweight user storage

---

## 🚀 Features

- Temporary guest login for private tool access
- Custom before/after image slider
- Responsive, progressive image gallery with lightbox
- Dark/light mode toggle
- Subtle, custom animations for a polished UX

---

## 🛠️ Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser

## 🔑 Environment Variables

Create a .env.local file in the project root and add:

```typescript
NEXTAUTH_SECRET = "your_secret";
```

## 📂 Project Structure

```bash
src/
 ├── app/                 # Next.js App Router
 │   ├── about/           # About page
 │   ├── api/             # NextAuth + guest login APIs
 │   ├── gallery/         # Photography galleries
 │   ├── login/           # Login page
 │   ├── me/              # User profile page
 │   ├── now/             # Now page
 │   └── ...              # Root layout, global styles, etc.
 ├── components/          # Reusable UI components
 ├── lib/                 # Utility libraries (auth, storage, gallery)
 ├── theme/               # Theme provider and toggle
 └── types/               # TypeScript type definitions

public/
 ├── icons/               # SVG icons
 ├── images/              # Original images (gallery, compare, hero, pfp)
 └── optimized/           # Optimized images (webp, blur, data)
```

## 🌍 Deployment

This site is designed to be deployed on Vercel

## 📖 About

The site isn’t just a portfolio, it’s also a place to explore UI patterns, animations, and full-stack features with Next.js.
