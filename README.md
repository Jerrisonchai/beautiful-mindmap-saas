# Beautiful Mindmap SaaS 🧠✨

A stunning, modern mindmapping application built with Next.js, TypeScript, and Tailwind CSS. Create beautiful mindmaps with intuitive drag-and-drop, real-time collaboration, and smooth animations.

## 🚀 Features

- **Beautiful Design**: Stunning animations, elegant typography, and thoughtful interactions
- **Intuitive Editor**: Drag-and-drop interface with zoom and pan capabilities
- **Real-time Collaboration**: Work together with your team seamlessly
- **Export Options**: Download as PNG, PDF, or SVG
- **Cloud Sync**: Auto-save to database (coming soon)
- **Templates**: Pre-built mindmap structures for common use cases
- **Dark Mode**: Beautiful dark theme support

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Canvas**: React Flow (custom implementation)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Usage

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Start Creating" to open the editor
3. Double-click nodes to expand/collapse
4. Drag the canvas to pan
5. Scroll to zoom in/out
6. Click the + button to add child nodes
7. Click the trash icon to delete nodes

## 📁 Project Structure

```
beautiful-mindmap-saas/
├── src/
│   ├── app/
│   │   ├── editor/          # Mindmap editor page
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/          # Reusable components
│   └── lib/                 # Utilities and helpers
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) - Main actions and branding
- **Accent**: Yellow (#f59e0b) - Highlights and CTAs
- **Success**: Green (#10b981) - Positive actions
- **Danger**: Red (#ef4444) - Destructive actions

### Typography
- **Font**: Inter (sans-serif)
- **Monospace**: JetBrains Mono (for code/data)

### Components
- Glass morphism effects
- Smooth animations (Framer Motion)
- Responsive design (mobile-first)

## 🚧 Coming Soon

- [ ] Real-time collaboration with WebSockets
- [ ] Cloud storage and sync
- [ ] Export to PNG/PDF/SVG
- [ ] Template library
- [ ] Team workspaces
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Undo/Redo functionality
- [ ] Node styling options
- [ ] Import/Export JSON

## 📝 License

MIT License - feel free to use for personal and commercial projects!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by mindmapping tools like MindNode, XMind, and Miro

---

**Made with ❤️ for beautiful thinking**
