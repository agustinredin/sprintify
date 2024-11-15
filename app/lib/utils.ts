import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AuthOptions } from "next-auth"
import GithubProvider from 'next-auth/providers/github'

export const nextAuthOptions: AuthOptions = {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
    ],
  };
  
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lastPathFromURL(url: string) {
  var n = url.lastIndexOf('/')
  return url.substring(n + 1) || ''
}

export async function sleep(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms))
}

export function isValidPassword(password : string) {
  const isLongEnough = password.length > 7
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  let valid = isLongEnough && hasUpperCase && hasLowerCase && hasNumber

  return valid;
}