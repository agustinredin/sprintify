import type { Metadata } from "next"
import "@/app/globals.css"
import { Bricolage_Grotesque } from "next/font/google"
import { Inter } from "next/font/google"
import { cn } from "@/app/lib/utils"
import Header from "@/components/custom/Header"
import Nav from "@/components/custom/Nav"
import { ToastProvider } from "@/components/context/ToastContext"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Provider from "@/components/context/UserContext"
import { Suspense } from "react"
import Loader from "@/components/ui/loader"

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <section className={cn("antialiased", fontHeading.variable, fontBody.variable)}>
      <Header />
      <Nav />
      <main className='flex min-h-screen w-full flex-col'>
        <div className='flex flex-col sm:gap-4 p-4 sm:pl-20 sm:px-6 sm:py-0'>
          <ToastProvider>
              <Provider session={session}>
                <Suspense fallback={<Loader />} />
                {children}
              </Provider>
          </ToastProvider>
        </div>
      </main>
    </section>
  )
}
