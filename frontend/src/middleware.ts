import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const token = request.cookies.get('accessToken')?.value;

  const publicPaths = ['/auth/login', '/auth/register'];
  const isPublicPath = publicPaths.includes(pathname);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/feed', request.url));
    } else {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
  ],
};