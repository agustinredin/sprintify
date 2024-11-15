"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChartIcon,
  BoltIcon,
  CalendarIcon,
  CheckIcon,
  CircuitBoardIcon,
  ImportIcon,
  MailsIcon,
  RocketIcon,
  SprintifyIcon,
  UsersIcon,
  XIcon,
} from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { lastPathFromURL, sleep } from "@/app/lib/utils"
import { FormEvent, useState } from "react"
import Spinner from "@/components/ui/spinner"
import { sendEmail } from "./actions/emailActions"
import { IEmail } from "./lib/interfaces"

export default function Page() {
  console.log('Sprintify landing page. Version of software: 0.1.0')
  console.log('Last updated: 15.11.2024')
  console.log('this is an auto-push test. Commited!')

  const params = usePathname()
  if (params != null) {
    if (lastPathFromURL(params) != "") scroll(lastPathFromURL(params))
  }

  function handleScroll(event: any) {
    let targetId = lastPathFromURL(event.target.getAttribute("data-scroll"))
    scroll(targetId)
  }

  function scroll(target: string) {
    const targetDiv = document.getElementById(target)
    targetDiv?.scrollIntoView({
      behavior: "smooth",
    })
  }

  const [loading, setLoading] = useState(false)
  async function handleContactSubmit(e: FormEvent) {
    setLoading(true)
    e.preventDefault()

    const errorClasses = [
      "ring",
      "ring-red-300",
      "hover:ring",
      "hover:ring-red-500",
      "focus:ring",
      "focus:ring-red-600",
      "active:ring",
      "active:ring-red-600",
      "focus-visible:ring",
      "focus-visible:ring-red-600",
    ]

    const formElements = {
      name: document.getElementById("name") as HTMLInputElement,
      email: document.getElementById("email") as HTMLInputElement,
      message: document.getElementById("message") as HTMLInputElement,
    }

    ;(Object.values(formElements) as Array<HTMLInputElement>).map((element: HTMLInputElement) => {
      element.classList.remove(...errorClasses)
    })

    let anyEmpty = (Object.values(formElements) as Array<HTMLInputElement>).filter(
      (e) => !e || !e.value || e.value.length == 0,
    )

    anyEmpty.map((emptyElement: HTMLInputElement) => {
      emptyElement.classList.add(...errorClasses)
    })

    if (anyEmpty.length) {
      setLoading(false)
      alert("Please complete all fields.")
      return
    }

    let email: IEmail = {
      from: "Acme <onboarding@resend.dev>",
      to: ["agustintomasredin@gmail.com"],
      subject: "Sprintify - Client Query",
      body: `<b>Name: ${formElements.name.value}</b> 
        <i>Email: ${formElements.email.value}</i>
        <p>Message: ${formElements.message.value}</p>`,
    }

    const emailResponse = await sendEmail(email)

    if (emailResponse?.error) {
      console.log(emailResponse?.error)
      alert("There has been an error submitting your query. Please try again.")
    } else {
      alert("Query submitted!")
    }

    setLoading(false)
  }

  return (
    <div className='flex scroll-smooth flex-col min-h-[100dvh] container w-[90vw] md:w-[80vw] mx-auto'>
      <header className='py-10 h-14 flex items-center'>
        <Link href='#' className='flex items-center justify-center' prefetch={false}>
          <SprintifyIcon className='w-10 h-10' />
          <h1 className='pl-2 text-3xl font-bold tracking-tight text-accent'>Sprintify</h1>
          <span className='sr-only'>Sprintify</span>
        </Link>
        <nav className='ml-auto items-center flex gap-4 sm:gap-6'>
          <span
            data-scroll='features'
            onClick={handleScroll}
            className='cursor-pointer text-lg font-medium hover:underline underline-offset-4'>
            Features
          </span>
          <span
            data-scroll='why-choose'
            onClick={handleScroll}
            className='cursor-pointer text-lg font-medium hover:underline underline-offset-4'>
            Why Sprintify
          </span>
          <span
            data-scroll='pricing'
            onClick={handleScroll}
            className='cursor-pointer text-lg font-medium hover:underline underline-offset-4'>
            Pricing
          </span>
          <span
            data-scroll='contact'
            onClick={handleScroll}
            className='cursor-pointer text-lg font-medium hover:underline underline-offset-4'>
            Contact
          </span>
          <Link 
          href='/signup'
          target='_blank'>
            <Button variant='outline' size='lg'>
              Log in
            </Button>
          </Link>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full py-8 md:py-12 lg:py-20'>
          <div className='container'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]'>
              <div className='flex flex-col justify-start space-y-4 pt-4'>
                <div className='space-y-2 w-[80%]'>
                  <h1 className='text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-br from-accent via-primary to-black'>
                    Streamline Your Scrum Workflow with Sprintify
                  </h1>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                    Sprintify is a powerful Scrum workflow management tool that helps your team stay organized,
                    productive, and on track.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Link
                    href='#'
                    className='inline-flex h-10 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                    prefetch={false}>
                    Get Started
                  </Link>
                  <Link
                    href='#'
                    className='inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                    prefetch={false}>
                    Learn More
                  </Link>
                </div>
              </div>
              <Image
                src='/hero.png'
                width={550}
                height={550}
                alt='Hero'
                className='mx-auto overflow-hidden sm:w-full lg:order-last'
              />
            </div>
          </div>
        </section>
        <section id='features' className='w-full rounded-md py-12 md:py-24 lg:py-32 bg-secondary/10'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Key Features of Sprintify</h2>
                <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Sprintify offers a comprehensive set of features to streamline your Scrum workflow.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12'>
              <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='rounded-full bg-accent p-4'>
                  <CircuitBoardIcon className='h-6 w-6 text-primary-foreground' />
                </div>
                <h3 className='text-lg font-bold'>Kanban Board</h3>
                <p className='text-muted-foreground text-center'>
                  Visualize your team&apos;s workflow with a customizable Kanban board.
                </p>
              </div>
              <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='rounded-full bg-accent p-4'>
                  <CalendarIcon className='h-6 w-6 text-primary-foreground' />
                </div>
                <h3 className='text-lg font-bold'>Sprint Planning</h3>
                <p className='text-muted-foreground text-center'>
                  Easily plan and manage your team&apos;s sprints with Sprintify&apos;s built-in tools.
                </p>
              </div>
              <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='rounded-full bg-accent p-4'>
                  <BarChartIcon className='h-6 w-6 text-primary-foreground' />
                </div>
                <h3 className='text-lg font-bold'>Reporting</h3>
                <p className='text-muted-foreground text-center'>
                  Generate detailed reports to track your team&apos;s progress and productivity.
                </p>
              </div>
              <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='rounded-full bg-accent p-4'>
                  <UsersIcon className='h-6 w-6 text-primary-foreground' />
                </div>
                <h3 className='text-lg font-bold'>Team Collaboration</h3>
                <p className='text-muted-foreground text-center'>
                  Streamline communication and collaboration with your team members.
                </p>
              </div>
              <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='rounded-full bg-accent p-4'>
                  <MailsIcon className='h-6 w-6 text-primary-foreground' />
                </div>
                <h3 className='text-lg font-bold'>Notifications</h3>
                <p className='text-muted-foreground text-center'>
                  Stay up-to-date with real-time notifications on task updates and deadlines.
                </p>
              </div>
              <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='rounded-full bg-accent p-4'>
                  <ImportIcon className='h-6 w-6 text-primary-foreground' />
                </div>
                <h3 className='text-lg font-bold'>Integrations</h3>
                <p className='text-muted-foreground text-center'>
                  Seamlessly integrate Sprintify with your favorite tools and platforms.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='why-choose' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12'>
              <Image
                src='/why-sprintify.png'
                width='550'
                height='310'
                alt='Why Choose Sprintify'
                className='mx-auto overflow-hidden rounded-xl sm:w-full'
              />
              <div className='flex flex-col justify-start space-y-4'>
                <div className='space-y-2'>
                  <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Why Choose Sprintify?</h2>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                    Sprintify is the ultimate Scrum workflow management tool, designed to help your team stay organized,
                    productive, and on track.
                  </p>
                </div>
                <ul className='grid gap-4'>
                  <li className='flex items-start gap-4'>
                    <div className='rounded-full bg-accent p-3 flex items-center justify-center'>
                      <CheckIcon className='h-5 w-5 text-primary-foreground' />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold'>Streamlined Workflow</h3>
                      <p className='text-muted-foreground'>
                        Sprintify&apos;s intuitive Kanban board and sprint planning tools help your team stay organized
                        and on top of their tasks.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start gap-4'>
                    <div className='rounded-full bg-accent p-3 flex items-center justify-center'>
                      <RocketIcon className='h-5 w-5 text-primary-foreground' />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold'>Increased Productivity</h3>
                      <p className='text-muted-foreground'>
                        With real-time notifications, team collaboration tools, and detailed reporting, Sprintify helps
                        your team work smarter and achieve more.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start gap-4'>
                    <div className='rounded-full bg-accent p-3 flex items-center justify-center'>
                      <BoltIcon className='h-5 w-5 text-primary-foreground' />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold'>Agile Adaptability</h3>
                      <p className='text-muted-foreground'>
                        Sprintify&apos;s flexible and customizable features allow your team to adapt to changing needs
                        and priorities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id='pricing' className='w-full  rounded-md py-12 md:py-24 lg:py-32 bg-secondary/10'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Pricing</h2>
                <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Choose the plan that best fits your team&apos;s needs.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:gap-12'>
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Perfect for small teams just getting started with Scrum.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-baseline justify-center gap-2'>
                      <span className='text-4xl font-bold'>$9</span>
                      <span className='text-muted-foreground'>/month</span>
                    </div>
                    <ul className='space-y-2 text-muted-foreground'>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Kanban Board
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Sprint Planning
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Basic Reporting
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Team Collaboration
                      </li>
                      <li className='flex items-center gap-2'>
                        <XIcon className='h-4 w-4 text-red-500' />
                        Advanced Integrations
                      </li>
                    </ul>
                    <Button className='bg-accent'>Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>Unlock advanced features for larger teams and enterprises.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-baseline justify-center gap-2'>
                      <span className='text-4xl font-bold'>$29</span>
                      <span className='text-muted-foreground'>/month</span>
                    </div>
                    <ul className='space-y-2 text-muted-foreground'>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Kanban Board
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Sprint Planning
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Advanced Reporting
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Team Collaboration
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        Advanced Integrations
                      </li>
                    </ul>
                    <Button className='bg-accent'>Get Started</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id='contact' className='py-32 px-6 md:px-12 lg:px-24 rounded-md relative'>
          <div className='max-w-5xl mx-auto space-y-8'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold'>Contact Us</h2>
              <p className='text-muted-foreground'>
                Have questions or need help getting started? Get in touch with our team.
              </p>
            </div>
            <form className='bg-card p-6 rounded-lg shadow-md'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input id='name' placeholder='Enter your name' />
                <Input id='email' type='email' placeholder='Enter your email' />
              </div>
              <Textarea id='message' placeholder='Enter your message' className='mt-6' />
              <Button className='mt-6 w-full text-xl bg-accent' onClick={handleContactSubmit}>
                {loading ? <Spinner size='sm' /> : "Submit"}
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className='py-4 px-6 flex items-center justify-between'>
        <p className='text-sm'>&copy; 2024 Sprintify. All rights reserved.</p>
        <div className='flex items-center gap-4'>
          <Link href='#' className='text-sm hover:underline' prefetch={false}>
            Privacy Policy
          </Link>
          <Link href='#' className='text-sm hover:underline' prefetch={false}>
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  )
}
