import type { Metadata } from "next"
import "@/app/globals.css"
import { Bricolage_Grotesque } from "next/font/google"
import { Inter } from "next/font/google"
import { cn } from "@/app/lib/utils"
import { ToastProvider } from "@/components/context/ToastContext"
import { Suspense } from "react"
import Loader from "@/components/ui/loader"
import {PropsWithChildren} from 'react';



const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Sprintify",
  description: "Scrum Manager App",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={cn("antialiased", fontHeading.variable, fontBody.variable)}>
        <ToastProvider>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ToastProvider>
      </body>
    </html>
  )
}
