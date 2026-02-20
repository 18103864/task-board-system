# Task Board System

## Requirements
- Node.js 18 or higher
- npm

## Setup
1. Install dependencies:
```bash
npm install
```

2. Setup environment:
```bash
cp .env.example .env
```
Then edit `.env` with your database connection details.

3. Setup database:
```bash
npx prisma migrate dev
```

4. Run the app:
```bash
npm run dev
```

5. Open in browser: 
http://localhost:3000

## TECH STACK

- Next.js 16 with App Router
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS v4 & shadcn/ui
- Lucide React (icons)
