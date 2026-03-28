# 🧠 Beautiful Mindmap SaaS

<div align="center">

**Visual thinking made beautiful.** Create stunning mindmaps with real-time collaboration, cloud sync, and advanced export options.

![Beautiful Mindmap](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)
![License](https://img.shields.io/github/license/Jerrisonchai/beautiful-mindmap-saas)
![Stars](https://img.shields.io/github/stars/Jerrisonchai/beautiful-mindmap-saas?style=social)

[Features](#features) • [Quick Start](#quick-start) • [Demo](#demo) • [Tech Stack](#tech-stack) • [Deployment](#deployment) • [Contributing](#contributing)

</div>

---

## 🌟 Features

### ✨ **Beautiful Design**
- Glass morphism UI with smooth animations
- Professional templates for common use cases
- Intuitive drag-and-drop interface
- Responsive design (desktop & mobile)

### 🤝 **Real-Time Collaboration**
- Multiple users editing simultaneously
- Live cursor presence
- WebSocket-based synchronization
- Connection status indicators

### ☁️ **Cloud Sync & Storage**
- Secure user authentication (JWT)
- Auto-save every 30 seconds
- PostgreSQL database with Prisma ORM
- User-specific mindmap storage

### 📤 **Advanced Export Options**
- **Images:** PNG, SVG (vector)
- **Documents:** PDF, Markdown, Word (.docx)
- **Presentations:** PowerPoint (.pptx)
- **Data:** JSON (simple & enhanced)

### 📋 **Professional Templates**
- Brainstorming sessions
- SWOT analysis
- Project planning
- Study notes
- Goal setting
- Meeting notes

### 🔒 **Security**
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Environment variable management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or cloud provider like Supabase, Neon)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Jerrisonchai/beautiful-mindmap-saas.git
cd beautiful-mindmap-saas

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

### Access the App
- **Landing Page:** http://localhost:3000
- **Editor:** http://localhost:3000/editor
- **Login/Signup:** http://localhost:3000/login

---

## 🎯 Demo

### Screenshots

![Landing Page](docs/screenshots/landing.png)
![Editor](docs/screenshots/editor.png)
![Templates](docs/screenshots/templates.png)

### Live Demo
*A live demo is coming soon!*

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **ws** - WebSocket server

### Export Libraries
- **html2canvas** - PNG/SVG export
- **jspdf** - PDF generation
- **docx** - Word document creation
- **pptxjs** - PowerPoint generation

### Testing
- **Playwright** - E2E testing
- **Visual QA** - Automated screenshot testing

---

## 📁 Project Structure

```
beautiful-mindmap-saas/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── client.ts           # Prisma client
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/       # Login/Register endpoints
│   │   │   └── mindmaps/   # CRUD operations
│   │   ├── editor/         # Main mindmap editor
│   │   ├── login/          # Authentication UI
│   │   └── layout.tsx      # Root layout
│   ├── components/
│   │   └── TemplateSelector.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx # Auth state management
│   └── lib/
│       ├── export.ts       # Basic export functions
│       ├── export-advanced.ts # Advanced exports
│       └── templates.ts    # Template definitions
├── public/                 # Static assets
├── tests/                  # Playwright tests
├── .env.example            # Environment template
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎨 Features Breakdown

### 1. Template Library
- 6 professionally designed templates
- Categorized by use case (Business, Education, Planning, Creative, Personal)
- One-click application
- Customizable after application

### 2. Cloud Sync & Storage
- User authentication with email/password
- Automatic saves every 30 seconds
- Manual save button
- Last saved timestamp display
- User-specific mindmap list (coming soon)

### 3. Advanced Export
- **PDF:** High-quality document export
- **PNG:** 2x scale for crisp images
- **SVG:** Scalable vector graphics
- **Markdown:** Documentation-friendly format
- **Word:** Professional reports with headings
- **PowerPoint:** Ready-to-use presentations
- **JSON:** Full data backup with metadata

### 4. Real-Time Collaboration
- WebSocket-based synchronization
- Multiple users can edit simultaneously
- Connection status indicators
- User presence display

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# - DATABASE_URL
# - JWT_SECRET
```

### Deploy to Railway

1. Connect your GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy automatically

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="your-secure-random-string-min-32-chars"
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
```

---

## 🧪 Testing

```bash
# Run Playwright tests
npx playwright test

# Run tests with UI
npx playwright test --ui

# Generate test report
npx playwright show-report
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write tests for new features
- Update documentation as needed

---

## 📝 Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered mindmap generation
- [ ] Version history & undo/redo
- [ ] Team workspaces
- [ ] Advanced sharing permissions
- [ ] Custom themes
- [ ] Keyboard shortcuts
- [ ] Import from other formats (OPML, FreeMind)
- [ ] Offline mode with PWA

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Database ORM by [Prisma](https://prisma.io/)
- Inspired by mindmapping tools like MindNode, XMind, and Miro

---

## 📧 Contact

- **Author:** Jerrison Chai
- **GitHub:** [@Jerrisonchai](https://github.com/Jerrisonchai)
- **Project:** [Beautiful Mindmap SaaS](https://github.com/Jerrisonchai/beautiful-mindmap-saas)

---

<div align="center">

**Made with ❤️ for beautiful thinking**

⭐ Star this repo if you find it helpful!

</div>
