import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; //used to extract the pathname from the URL of the incoming request.
  const isPublicPath = path === '/login' || path === '/signup' || path ==='/verifyemail';
  const token = request.cookies.get('token')?.value || '';

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl)); //if the logged in user tries to access login or signup page, he is directed to the home page.
  }
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl)); //if any non logged in user tries to access any internal page, he is redirected to the login page.
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/profile',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail',
  ]
}