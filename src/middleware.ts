import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { decodeToken } from './lib/utils';
import { Role } from './constants/types';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const accessToken = cookieStore.get('access_token')?.value || null;
  const account = decodeToken(accessToken || '');
  console.log(accessToken);
  
  if (request.nextUrl.pathname.startsWith('/me') && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (request.nextUrl.pathname.startsWith('/login') && accessToken) {
    console.log("redirecting... home page")
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Nếu là Admin thì chỉ được vào route /admin
  // if (!request.nextUrl.pathname.startsWith('/admin') && account?.role === Role.Admin) {
  //   return NextResponse.redirect(new URL('/admin', request.url));
  // }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (account?.role === Role.Admin) {
      return NextResponse.next()
    }
    else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/manager')) {
    if (account?.role === Role.Manager) {
      return NextResponse.next()
    }
    else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/me', '/admin/:path*', '/manager/:path*'],
}