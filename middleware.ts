import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // ============================================
  // LOCALHOST HANDLING (NO DB CALLS - STATIC ROUTING)
  // ============================================
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    // Direct access to /app routes - allow through
    if (pathname.startsWith('/app')) {
      return NextResponse.next()
    }
    // Direct access to /storefront routes - allow through
    if (pathname.startsWith('/storefront')) {
      return NextResponse.next()
    }
    // Direct access to /marketing routes - allow through
    if (pathname.startsWith('/marketing')) {
      return NextResponse.next()
    }
    // Root path - let app/page.tsx handle it (no rewrite needed)
    if (pathname === '/') {
      return NextResponse.next()
    }
    // Default: allow through (for API routes, static files, etc.)
    return NextResponse.next()
  }

  // ============================================
  // PRODUCTION DOMAIN HANDLING (STRING MATCHING ONLY)
  // ============================================

  // Handle app subdomain: app.turestaurantedigital.com -> /app/dashboard
  if (hostname.startsWith('app.')) {
    if (pathname === '/') {
      url.pathname = '/app/dashboard'
    } else {
      url.pathname = `/app${pathname}`
    }
    return NextResponse.rewrite(url)
  }

  // Handle main domain: turestaurantedigital.com -> /marketing
  if (
    hostname === 'turestaurantedigital.com' ||
    hostname === 'www.turestaurantedigital.com'
  ) {
    url.pathname = `/marketing${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  // Handle www subdomain: www.turestaurantedigital.com -> /marketing
  if (hostname.startsWith('www.')) {
    url.pathname = `/marketing${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  // Handle other subdomains: [slug].turestaurantedigital.com -> /storefront/[slug]
  // Only if it's not the main domain
  if (hostname.includes('.')) {
    const parts = hostname.split('.')
    const subdomain = parts[0]
    
    // Skip if it's the main domain or www
    if (subdomain && subdomain !== 'turestaurantedigital' && subdomain !== 'www' && subdomain !== 'app') {
      url.pathname = `/storefront/${subdomain}${pathname === '/' ? '' : pathname}`
      return NextResponse.rewrite(url)
    }
  }

  // Default: allow through
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
