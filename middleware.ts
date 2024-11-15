import { type NextRequest, NextResponse } from "next/server"
import { getUserSession } from "./app/actions/userActions"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Improved static file handling
  if (
    pathname.startsWith('/_next') || // Next.js internal routes
    pathname.startsWith('/api') ||   // API routes
    pathname.includes('favicon') ||   // Favicon
    pathname.match(/\.(css|js|jsx|ts|tsx|png|jpg|jpeg|gif|ico|svg)$/) // Static files
  ) {
    return NextResponse.next()
  }
  
  // Protected routes check
  const protectedRoutes = ["/software"]
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  // const verified = await getUserSession()

  // if (isProtectedRoute && !verified) {
  //   return NextResponse.redirect(new URL("/signup", req.url))
  // }

  // if (pathname.startsWith('/signup') && verified) {
  //   return NextResponse.redirect(new URL("/software", req.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Optional: Add specific paths you want to protect
    '/software/:path*',
    '/((?!api|_next|.*\\..*).*)'
  ],
}