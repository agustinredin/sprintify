import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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