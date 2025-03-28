import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();

  }
  const token = request.cookies.get('next-auth.session-token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected-route/:path*', '/another-protected-route/:path*'],
};