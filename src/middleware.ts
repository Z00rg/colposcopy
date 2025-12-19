import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Конфигурация путей
const AUTH_ROUTES = ['/sign-in', '/sign-up'];
const REFRESH_COOKIE_NAME = 'refresh';

// 2. Заголовки безопасности
const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block',
};

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const refreshCookie = request.cookies.get(REFRESH_COOKIE_NAME);
    const isAuthPath = AUTH_ROUTES.some(route => pathname.startsWith(route));

    let response: NextResponse;

    // --- ЛОГИКА АВТОРИЗАЦИИ ---
    if (refreshCookie) {
        // Если залогинен — не пускаем на страницы логина/регистрации
        if (isAuthPath) {
            response = NextResponse.redirect(new URL('/', request.url));
        } else {
            response = NextResponse.next();
        }
    } else {
        // Если НЕ залогинен — не пускаем никуда, кроме страниц логина
        if (isAuthPath) {
            response = NextResponse.next();
        } else {
            const signInUrl = new URL('/sign-in', request.url);
            signInUrl.searchParams.set('redirect', pathname);
            response = NextResponse.redirect(signInUrl);
        }
    }

    // --- ДОБАВЛЕНИЕ SECURITY HEADERS ---
    Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: [
        /*
         * Исключаем все пути, которые не являются страницами:
         * - api (запросы к бэкенду)
         * - _next (статика и чанки Next.js)
         * - статические файлы (картинки, шрифты и т.д.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|well-known)).*)',
    ],
};