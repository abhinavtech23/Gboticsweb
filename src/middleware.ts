import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'gbotics_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // We can't do full JWT verification in middleware edge runtime easily
    // but the token existence check is the first gate. 
    // Full role check happens in the admin page server component.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
