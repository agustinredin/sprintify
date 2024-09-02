
'use server'
import 'server-only'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const key = new TextEncoder().encode(process.env.SECRET)

export async function encrypt(payload : JWTPayload) {
  return new SignJWT(payload)
  .setProtectedHeader({alg: 'HS256'})
  .setIssuedAt()
  .setExpirationTime('1day')
  .sign(key)
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256']
    })
    return payload
  }
  catch {
    return null
  }
}

