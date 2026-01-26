# Bilkul Digital Studio

## Overview

Bilkul Digital Studio is a premium UAE-based digital agency website built as a full-stack web application. The project serves as both a marketing site and an operational CRM system for lead generation. It features an AI-powered demo generator that creates instant website previews, a multi-step lead capture wizard, and an admin panel for managing leads and demo blueprints.

The tech stack follows a modern React + Express architecture with PostgreSQL for data persistence, designed for the Replit environment with hot module replacement during development and optimized production builds.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming ("Aurora Glass 2026" design system)
- **UI Components**: Radix UI primitives wrapped with shadcn/ui (new-york style), extensive custom components
- **Animations**: Framer Motion for page transitions, micro-interactions, and scroll-based effects
- **Forms**: React Hook Form with Zod validation (shared schemas between client/server)

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript compiled via tsx (development) and esbuild (production)
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Build System**: Custom build script that bundles server with esbuild and client with Vite

### Data Storage
- **Database**: PostgreSQL (via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Tables**: 
  - `users` - Authentication (username/password)
  - `leads` - Contact form submissions with status tracking
  - `demoBlueprints` - AI-generated website preview configurations
- **Migrations**: Drizzle Kit with `db:push` for schema synchronization

### Key Design Decisions

1. **Shared Schema Pattern**: Zod schemas derived from Drizzle tables are exported from `shared/schema.ts` and used for both client-side form validation and server-side API validation. This ensures type safety across the stack.

2. **Storage Abstraction**: The `IStorage` interface in `server/storage.ts` abstracts database operations, making it easier to swap implementations or add caching layers.

3. **Development/Production Split**: 
   - Development: Vite dev server with HMR, proxied through Express
   - Production: Pre-built static files served from `dist/public`

4. **Component Structure**: 
   - `components/ui/` - Reusable primitives (buttons, cards, inputs)
   - `components/sections/` - Page-level compositions (Hero, ServicesGrid)
   - `components/layout/` - Structural components (Navbar, Footer)

5. **Premium Visual System**: Custom CSS variables define a dark theme with luminous glass effects, aurora gradients, and subtle animations. The design prioritizes "calm luxury" aesthetics.

## External Dependencies

### Database
- **PostgreSQL**: Required via `DATABASE_URL` environment variable
- **Drizzle Kit**: Schema management and migrations (`drizzle-kit push`)

### Third-Party Services (Configured but may need setup)
- **Resend/Nodemailer**: Email notifications for lead submissions (requires `RESEND_API_KEY` or SMTP credentials). User declined the Resend integration - if email notifications are needed, request `RESEND_API_KEY` as a secret manually.
- **Calendly**: Optional booking integration (via `CALENDLY_URL` env var)

## Admin Panel
- **Passkey**: `bilkul2026` (hardcoded, for MVP only)
- **Features**: 
  - Leads tab: View all contact form submissions, update status (new/contacted/reviewing/closed)
  - Demos tab: View all AI-generated demo prompts with brand info and keywords
  - CSV Export: Export both leads and demos data

### Key NPM Packages
- `drizzle-orm` + `pg`: Database connectivity
- `@tanstack/react-query`: Async state management
- `framer-motion`: Animation library
- `zod` + `drizzle-zod`: Schema validation
- `@radix-ui/*`: Accessible UI primitives
- `react-hook-form`: Form state management

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string (required)
- `ADMIN_PASSWORD`: Password gate for admin panel (optional)
- `OWNER_EMAIL`: Recipient for lead notifications (optional)
- `RESEND_API_KEY`: Email service API key (optional)
- `SITE_URL`: Base URL for email links (optional)