# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## Project Architecture

This is a Next.js 15.4.4 application using the App Router architecture with TypeScript and Tailwind CSS v4.

### Key Structure
- `/src/app/` - App Router pages and layouts using Next.js 13+ conventions
- `/src/app/layout.tsx` - Root layout with Geist font configuration and global styles
- `/src/app/page.tsx` - Homepage component
- `/src/app/globals.css` - Global styles with Tailwind CSS v4 and custom CSS variables for theming
- `/public/` - Static assets (SVG icons, images)

### Technology Stack
- **Framework**: Next.js 15.4.4 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **React**: Version 19.1.0

### Styling System
- Uses Tailwind CSS v4 with the new `@theme` directive for configuration
- Custom CSS variables for light/dark theme support (`--background`, `--foreground`)
- Responsive design with mobile-first approach using Tailwind's responsive prefixes
- Font variables configured via CSS custom properties (`--font-geist-sans`, `--font-geist-mono`)

### Path Aliases
- `@/*` maps to `./src/*` for cleaner imports

### Development Notes
- Uses Turbopack in development for faster builds
- TypeScript configuration includes strict mode and Next.js plugin
- Dark mode support is handled via CSS `prefers-color-scheme` media query
- All components use TypeScript with proper type definitions

## Supabase Setup

This project uses Supabase for the wedding invitation form backend.

### Required Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Database Schema
Create a table called `invitation_responses` with the following structure:
```sql
CREATE TABLE invitation_responses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  attendance VARCHAR(20) NOT NULL CHECK (attendance IN ('attending', 'not_attending')),
  guest_count INTEGER DEFAULT 1,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Architecture
- `/src/lib/supabase.ts` - Server-side Supabase client configuration using Service Role Key
- `/src/lib/actions.ts` - Server Actions for form submissions
- `/src/components/InvitationForm.tsx` - Client-side form component
- `/src/types/supabase.ts` - Auto-generated TypeScript types from Supabase schema
- Server-side operations ensure secure data handling without exposing sensitive keys to the client

## CI/CD and Code Quality

### Static Analysis and Formatting
- **Biome** is used instead of ESLint/Prettier for faster linting and formatting
- Pre-commit hooks ensure code quality with husky and lint-staged
- All code is automatically formatted and checked before commits

### GitHub Actions Workflows
- **CI Pipeline** (`ci.yml`): Runs on push/PR to main branch
  - Code quality checks (Biome)
  - TypeScript type checking
  - Build verification
  - Migration preview for PRs (shows diff in comments)
  - Automatic Supabase migrations (main branch push only)
  - Auto-generated type definitions

### Commands
- `npm run check` - Run Biome linting and formatting checks
- `npm run check:fix` - Auto-fix linting and formatting issues
- `npm run format` - Format code with Biome
- `npx supabase gen types typescript --linked` - Generate TypeScript types from schema

### Migration Workflow (Trunk-based Development)
1. Create migration: `npx supabase migration new migration_name`
2. Test locally: `npx supabase db reset`
3. Create PR to main: Migration diff automatically shown in PR comments
4. Merge to main: Automatic production migration and type generation