import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import AdapterUser, { User as nextAuthUser, AuthOptions, User, Account, Profile } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { createOAuthUser, createUserSession, getUserByEmail, getUserById } from "../actions/userActions"
import { Strict } from "./interfaces"

export const nextAuthOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: User
      account: Account | null
      profile?: Profile
      email?: { verificationRequest?: boolean }
      credentials?: Record<string, any>
    }) {
      if (account?.provider === "github" && profile?.email) {        
        try {
          const user = await getUserByEmail(profile.email) // Add your custom check here
          if (!user) {
            await createOAuthUser(profile as Strict<Profile>)
          } else {
            await createUserSession(user)
          }
          return true 
        } catch  {
          return false
        }
      }
      return false
    },
  },
  secret: process.env.NEXTAUTH_SECRET
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lastPathFromURL(url: string) {
  var n = url.lastIndexOf("/")
  return url.substring(n + 1) || ""
}

export async function sleep(ms: number) {
  console.log("sleeping:", ms)
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export function isValidPassword(password: string) {
  const isLongEnough = password.length > 7
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  let valid = isLongEnough && hasUpperCase && hasLowerCase && hasNumber

  return valid
}
