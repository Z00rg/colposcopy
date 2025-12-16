import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Пути аутентификации
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

const REFRESH_COOKIE_NAME = 'refresh';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const refreshCookie = request.cookies.get(REFRESH_COOKIE_NAME);
    const isAuthPath = AUTH_ROUTES.some(route => pathname.startsWith(route));

    // 1. Если пользователь залогинен
    if (refreshCookie) {
        if (isAuthPath) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    // 2. Если пользователь не залогинен
    if (!refreshCookie) {
        if (isAuthPath) {
            return NextResponse.next();
        }

        // Если он пытается попасть на ЛЮБОЙ другой путь (включая /), редиректим на /sign-in
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Fallback
    return NextResponse.next();
}

// Конфигурация, указывающая, для каких путей запускать Middleware
export const config = {
    matcher: [
        // Исключаем:
        // 1. _next/static, _next/image, api
        // 2. Файлы с расширениями: .png, .jpg, .jpeg, .svg, .gif, .well-known, и т.д.
        // 3. /favicon.ico
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)|\\.well-known).*)',
    ],
};