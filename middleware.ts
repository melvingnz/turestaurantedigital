import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Ignore system/hidden files (like favicon, .well-known, etc.)
  if (pathname.includes('/.') || pathname.endsWith('.ico') || pathname.endsWith('.png')) {
    return NextResponse.next()
  }

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
    // Handle subdomains: lateburger.localhost:3000 -> /lateburger (app/(storefront)/[slug])
    if (hostname.includes('.')) {
      const parts = hostname.split('.')
      const subdomain = parts[0]
      
      if (subdomain && subdomain !== 'localhost' && subdomain !== '127' && subdomain !== '0' && subdomain !== '1') {
        url.pathname = `/${subdomain}${pathname === '/' ? '' : pathname}`
        return NextResponse.rewrite(url)
      }
    }
    
    // Direct /lateburger -> /lateburger (already matches [slug])
    if (pathname.startsWith('/lateburger')) {
      return NextResponse.next()
    }
    
    if (pathname.startsWith('/app')) {
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
    // /lateburger on apex -> /lateburger (app/(storefront)/[slug])
    if (pathname.startsWith('/lateburger')) {
      return NextResponse.next()
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
      // Rewrite to /[slug]. app/(storefront)/[slug] maps to /[slug], NOT /storefront/[slug]
      const newPath = `/${subdomain}${pathname === '/' ? '' : pathname}`
      console.log('[MIDDLEWARE] Rewriting subdomain -> [slug]:', {
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
     * Match all request paths except: api, _next/static, _next/image, favicon.ico
     * Include / explicitly so subdomain root (lateburger.turestaurantedigital.com/) runs middleware
     */
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
