# Task 001: Project Initialization & Foundation Setup

**Status:** Pending  
**Priority:** High  
**Estimated Time:** 2-3 hours  
**Assigned To:** Jules (AI Coding Agent)

---

## 🎯 Objective
Initialize the "Beautiful Mindmap SaaS" repository with a production-ready Next.js 14 starter, configure Tailwind CSS, set up the basic application layout, and create a landing page skeleton.

## 📋 Requirements

### 1. Initialize Next.js Project
- Create a new Next.js 14 project using `create-next-app` with TypeScript.
- Command: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- Ensure `package.json` is committed.

### 2. Configure Tailwind CSS
- Verify `tailwind.config.ts` is set up correctly.
- Add custom color palette to `tailwind.config.ts` based on the PRD themes (Minimalist, Corporate, Creative, Dark Mode, Pastel).
  - Example: Define `colors: { primary: '#6366f1', secondary: '#ec4899', ... }`
- Ensure `globals.css` includes Tailwind directives.

### 3. Basic App Layout
- Create `src/app/layout.tsx` with:
  - Responsive meta tags.
  - Navigation bar (Logo + "Get Started" button).
  - Footer (Copyright + Links).
  - Inter font from `next/font`.

### 4. Landing Page Skeleton
- Create `src/app/page.tsx` with:
  - **Hero Section:** Headline "Turn Ideas into Beautiful Mindmaps in Seconds", Subheadline, CTA Button ("Start Creating").
  - **Features Section:** 3-column grid highlighting "Instant Generation", "Smart Layouts", "Beautiful Templates".
  - **How It Works Section:** 3-step visual guide (Input → Generate → Export).
  - **Footer Section:** Simple links.
- Use Tailwind utility classes for styling. No custom CSS files.

### 5. Directory Structure Verification
Ensure the following structure exists:
```
beautiful-mindmap-saas/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── lib/
├── docs/
├── tasks/
├── prompts/
├── tests/
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Deliverables
1. A fully functional Next.js app running on `localhost:3000`.
2. A clean, responsive landing page with the specified sections.
3. All code committed to the repository with a clear commit message: `feat: Initialize project structure and landing page`.

## ✅ Acceptance Criteria
- [ ] `npm run dev` starts the server without errors.
- [ ] Landing page renders correctly on mobile and desktop.
- [ ] Tailwind classes are applied correctly (colors, spacing, typography).
- [ ] No console errors.
- [ ] Code follows TypeScript best practices.

---

**Instructions for Jules:**
1. Read this task file.
2. Execute the setup commands.
3. Create the necessary files and components.
4. Test the app locally.
5. Commit and push changes.
6. Update this task file status to "Completed" in the repo README or a status file.
