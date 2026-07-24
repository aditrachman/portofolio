import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/admin']
const publicPaths = ['/admin/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes
  if (!protectedPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Allow public admin paths
  if (publicPaths.some((p) => pathname === p)) {
    return NextResponse.next()
  }

  // Check for admin_token cookie
  const token = request.cookies.get('admin_token')?.value
  if (!token) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
