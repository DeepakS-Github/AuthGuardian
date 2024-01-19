import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === '/login' || path === '/signup'

    const authToken =  request.cookies.get('auth-token')?.value || '';

    if(isPublicPath && authToken) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if(!isPublicPath && !authToken) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}


export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verify/:path*'
   ]
}