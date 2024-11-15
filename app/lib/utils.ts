import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useToast } from "@/components/context/ToastContext"

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