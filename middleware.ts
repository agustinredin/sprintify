import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { deleteUserSession, verifyUserSession } from "./app/actions/userActions"
import { sql } from "@vercel/postgres"

export default async function middleware(req: NextRequest) {
  // TODO: lógica de protección de rutas según rol y aplicar en este sql
  // const protectedRoutes = (await sql`select * from protectedroutes`).rows as ;
  // const currentPath = req.nextUrl.pathname;
  // const isProtectedRoute = protectedRoutes.filter(i => i.nam);

  // return NextResponse.redirect(new URL("/signup", req.url))

  // const protectedRoutes = ["/software"]
  // const currentPath = req.nextUrl.pathname
  // const isProtectedRoute = protectedRoutes.includes(currentPath)
  // const verified = await verifyUserSession()
  // if (isProtectedRoute && !verified) 
  //   return NextResponse.redirect(new URL("/signup", req.url))
    

  // if (req.url.includes('/signup')  && verified)
  //   return NextResponse.redirect(new URL("/software", req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
