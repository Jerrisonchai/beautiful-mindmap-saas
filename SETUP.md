# Beautiful Mindmap SaaS - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env and update:
# - DATABASE_URL: Your PostgreSQL connection string
# - JWT_SECRET: A random secure string (at least 32 characters)
```

### 3. Set Up Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access the App
- Landing Page: http://localhost:3000
- Editor: http://localhost:3000/editor
- Login: http://localhost:3000/login

---

## 📦 Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** 14+ (or use a cloud provider like Supabase, Neon, Railway)
- **npm** or **yarn**

---

## 🔧 Database Setup Options

### Option A: Local PostgreSQL
1. Install PostgreSQL
2. Create database: `CREATE DATABASE beautiful_mindmap;`
3. Update `.env` with your local credentials

### Option B: Cloud PostgreSQL (Recommended for production)
**Supabase (Free tier):**
1. Go to supabase.com
2. Create a new project
3. Copy the connection string from Settings > Database
4. Update `.env` with the Supabase connection string

**Neon (Free tier):**
1. Go to neon.tech
2. Create a new project
3. Copy the connection string
4. Update `.env`

---

## 🧪 Testing Authentication

### Register a New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Save a Mindmap (requires token)
```bash
curl -X POST http://localhost:3000/api/mindmaps \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My Mindmap","nodes":{...}}'
```

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
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   └── register/route.ts
│   │   │   └── mindmaps/
│   │   │       └── [id]/route.ts
│   │   ├── editor/
│   │   │   └── page.tsx    # Main editor
│   │   ├── login/
│   │   │   └── page.tsx    # Login/Signup page
│   │   └── layout.tsx      # Root layout with AuthProvider
│   ├── components/
│   │   └── TemplateSelector.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx # Authentication context
│   └── lib/
│       ├── export.ts       # Export functions
│       └── templates.ts    # Template definitions
├── .env                    # Environment variables
└── package.json
```

---

## 🚨 Important Notes

1. **Security**: Change `JWT_SECRET` in production!
2. **Database**: Never commit `.env` file to git
3. **CORS**: Add proper CORS headers in production
4. **Rate Limiting**: Implement rate limiting for API routes
5. **HTTPS**: Use HTTPS in production

---

## 📚 Next Steps

After setup:
1. ✅ Test login/signup flow
2. ✅ Create a mindmap and verify auto-save
3. ✅ Test template selection
4. ✅ Try export features
5. ✅ Test real-time collaboration (open multiple tabs)

---

**Need help?** Check the docs or open an issue!
