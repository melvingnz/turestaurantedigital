# Tu Restaurante Digital

SaaS platform for restaurants in the Dominican Republic.

## Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS + ShadcnUI
- **Brand Color**: Orange #FF5F1F
- **Database**: Supabase (PostgreSQL, Auth)
- **Icons**: Lucide-React

## Project Structure

This is a "Logical Monorepo" with 3 distinct views handled by Middleware:

1. **Marketing** (`/marketing`): The public sales page
2. **Admin** (`/app`): Dashboard for restaurant owners
3. **Storefront** (`/storefront/[slug]`): The actual ordering interface for end-customers

## Routing

The middleware handles multi-tenancy:
- `app.turestaurantedigital.com` → `/app`
- `turestaurantedigital.com` or `www.turestaurantedigital.com` → `/marketing`
- `[slug].turestaurantedigital.com` → `/storefront/[slug]`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- Marketing page: `app/(marketing)/page.tsx`
- Admin dashboard: `app/app/` (to be implemented)
- Storefront: `app/storefront/[slug]/` (to be implemented)
