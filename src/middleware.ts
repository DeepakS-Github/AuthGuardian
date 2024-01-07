import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === '/login' || path === '/signup'

    const authToken =  request.cookies.get('auth-token')?.value || '';

    if(path === '/'){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if(isPublicPath && authToken) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
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
        '/profile/:path*'
   ]
}