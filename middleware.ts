import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // DEBUG: Log middleware execution
  console.log('[MIDDLEWARE]', {
    hostname,
    pathname,
    userAgent: request.headers.get('user-agent')?.substring(0, 50),
  })

  // ============================================
  // LOCALHOST HANDLING (WITH SUBDOMAIN SUPPORT)
  // ============================================
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    // Handle subdomains in localhost: lateburger.localhost:3000 -> /storefront/lateburger
    if (hostname.includes('.')) {
      const parts = hostname.split('.')
      const subdomain = parts[0]
      
      // Skip if it's just 'localhost' or '127.0.0.1'
      if (subdomain && subdomain !== 'localhost' && subdomain !== '127' && subdomain !== '0' && subdomain !== '1') {
        // lateburger.localhost:3000 -> /storefront/lateburger
        url.pathname = `/storefront/${subdomain}${pathname === '/' ? '' : pathname}`
        return NextResponse.rewrite(url)
      }
    }
    
    // Handle direct routes: localhost:3000/lateburger -> /storefront/lateburger
    if (pathname.startsWith('/lateburger')) {
      url.pathname = `/storefront/lateburger${pathname.replace('/lateburger', '') || ''}`
      return NextResponse.rewrite(url)
    }
    
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
  // PRODUCTION DOMAIN HANDLING
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
    // Handle direct routes: turestaurantedigital.com/lateburger -> /storefront/lateburger
    if (pathname.startsWith('/lateburger')) {
      url.pathname = `/storefront/lateburger${pathname.replace('/lateburger', '') || ''}`
      return NextResponse.rewrite(url)
    }
    
    url.pathname = `/marketing${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  // Handle www subdomain: www.turestaurantedigital.com -> /marketing
  if (hostname.startsWith('www.')) {
    url.pathname = `/marketing${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  // Handle storefront subdomains: [slug].turestaurantedigital.com -> /(storefront)/[slug]
  // Extract subdomain from production domain
  const productionDomain = 'turestaurantedigital.com'
  
  // Remove port if present for comparison
  const hostnameWithoutPort = hostname.split(':')[0]
  
  // Check if hostname matches subdomain pattern: [slug].turestaurantedigital.com
  if (hostnameWithoutPort.endsWith(`.${productionDomain}`)) {
    // Extract subdomain: lateburger.turestaurantedigital.com -> lateburger
    const parts = hostnameWithoutPort.split('.')
    const subdomain = parts[0]
    
    console.log('[MIDDLEWARE] Subdomain detection:', {
      hostname,
      hostnameWithoutPort,
      productionDomain,
      parts,
      extractedSubdomain: subdomain,
      pathname,
    })
    
    // Validate subdomain (must not be reserved)
    const reservedSubdomains = ['www', 'app', 'turestaurantedigital', 'api']
    if (subdomain && !reservedSubdomains.includes(subdomain.toLowerCase())) {
      // Rewrite to /(storefront)/[slug] - Next.js route groups use parentheses
      // But the actual path should be /storefront/[slug] for the rewrite
      const newPath = `/storefront/${subdomain}${pathname === '/' ? '' : pathname}`
      console.log('[MIDDLEWARE] Rewriting subdomain to storefront:', {
        from: pathname,
        to: newPath,
        subdomain,
        originalHostname: hostname,
      })
      url.pathname = newPath
      return NextResponse.rewrite(url)
    } else {
      console.log('[MIDDLEWARE] Subdomain is reserved, skipping:', {
        subdomain,
        reservedSubdomains,
      })
    }
  } else {
    console.log('[MIDDLEWARE] Not a subdomain match:', {
      hostname,
      hostnameWithoutPort,
      productionDomain,
      endsWith: hostnameWithoutPort.endsWith(`.${productionDomain}`),
    })
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
