import { type NextRequest, NextResponse } from "next/server"
import { verifyUserSession } from "./app/actions/userActions"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  //static 
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.') //.css, .js, .png, etc.
  ) {
    return NextResponse.next()
  }
  
  //TODO: fetchear protected routes y verificar segun usuario y rol si este puede ver o no
  const protectedRoutes = ["/software"]
  const isProtectedRoute = protectedRoutes.includes(pathname)
  const verified = await verifyUserSession()

  //verbose para debuggear bien
  if (isProtectedRoute && !verified) {
    return NextResponse.redirect(new URL("/signup", req.url))
  }

  if (pathname.startsWith('/signup') && verified) {
    return NextResponse.redirect(new URL("/software", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}