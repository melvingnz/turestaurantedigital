import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((c) => to.cookies.set(c.name, c.value))
}

export async function proxy(request: NextRequest) {
  const supabaseResponse = await updateSession(request)
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  if (pathname.includes('/.') || pathname.endsWith('.ico') || pathname.endsWith('.png')) {
    return supabaseResponse
  }

  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    if (hostname.includes('.')) {
      const parts = hostname.split('.')
      const subdomain = parts[0]
      if (subdomain && subdomain !== 'localhost' && subdomain !== '127' && subdomain !== '0' && subdomain !== '1') {
        url.pathname = `/${subdomain}${pathname === '/' ? '' : pathname}`
        const res = NextResponse.rewrite(url)
        copyCookies(supabaseResponse, res)
        return res
      }
    }

    if (pathname.startsWith('/lateburger')) return supabaseResponse
    if (pathname.startsWith('/app')) return supabaseResponse
    if (pathname.startsWith('/marketing')) return supabaseResponse
    if (pathname === '/') return supabaseResponse
    return supabaseResponse
  }

  if (hostname.startsWith('app.')) {
    if (pathname === '/') url.pathname = '/app/dashboard'
    else url.pathname = `/app${pathname}`
    const res = NextResponse.rewrite(url)
    copyCookies(supabaseResponse, res)
    return res
  }

  if (
    hostname === 'turestaurantedigital.com' ||
    hostname === 'www.turestaurantedigital.com'
  ) {
    if (pathname.startsWith('/lateburger')) return supabaseResponse
    url.pathname = `/marketing${pathname === '/' ? '' : pathname}`
    const res = NextResponse.rewrite(url)
    copyCookies(supabaseResponse, res)
    return res
  }

  if (hostname.startsWith('www.')) {
    url.pathname = `/marketing${pathname === '/' ? '' : pathname}`
    const res = NextResponse.rewrite(url)
    copyCookies(supabaseResponse, res)
    return res
  }

  const productionDomain = 'turestaurantedigital.com'
  const hostnameWithoutPort = hostname.split(':')[0]

  if (hostnameWithoutPort.endsWith(`.${productionDomain}`)) {
    const parts = hostnameWithoutPort.split('.')
    const subdomain = parts[0]
    const reservedSubdomains = ['www', 'app', 'turestaurantedigital', 'api']
    if (subdomain && !reservedSubdomains.includes(subdomain.toLowerCase())) {
      url.pathname = `/${subdomain}${pathname === '/' ? '' : pathname}`
      const res = NextResponse.rewrite(url)
      copyCookies(supabaseResponse, res)
      return res
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
