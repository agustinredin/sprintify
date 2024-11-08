"use client"

import { Suspense, useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SprintifyIcon } from "@/components/ui/icons"
import { loginUser, createUser } from "../actions/userActions"
import { useToast } from "@/components/context/ToastContext"
import Loader from '@/components/ui/loader'
import { sleep } from "../lib/utils"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' disabled={pending} className='my-2 w-full'>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  )
}

type AuthView = "login" | "forgotPassword" | "register"

export default function Page() {
  const { showToast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [view, setView] = useState<AuthView>("login")

  useEffect(() => {

    const confirmUser = searchParams.get("confirmUser")
    if (confirmUser) {
      handleConfirmUser(confirmUser)
    }
  })
  
  const handleConfirmUser = async (confirmUser: string) => {
    showToast("success", "Email confirmed. Now log in to your account.", 5000)
    setView("login")
  }
  
  const [, loginDispatch] = useFormState(loginAction, null)
  const [, forgotPasswordDispatch] = useFormState(forgotPasswordAction, null)
  const [, registerDispatch] = useFormState(registerAction, null)
  
  async function loginAction(prevState: unknown, formData: FormData): Promise<void> {
    const result = await loginUser(formData)
    if (result.error) {
      showToast("error", result.error, 5000)
      return
    }
    setTimeout(() => router.push("/software"), 1500)
    showToast("success", "Logged in successfully. Redirecting...", 5000)
    return
  }

  async function forgotPasswordAction(prevState: unknown, formData: FormData): Promise<void> {
    const email = formData.get("email")
    if (!email) {
      showToast("error", "Email is required", 5000)
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    return
  }

  async function registerAction(prevState: unknown, formData: FormData): Promise<void> {
    const result = await createUser(formData)
    if (result.error) {
      showToast("error", result.error, 5000)
      return
    }
    showToast("success", "Registered successfully. Please check your email to confirm registration.", 5000)
    return
  }

  return (
    <Suspense fallback={<Loader/>}>
      <div className='absolute top-4 left-4'>
        <Link href='#' className='flex items-center justify-center' prefetch={false}>
          <SprintifyIcon className='w-10 h-10' />
          <h1 className='pl-2 text-3xl font-bold tracking-tight text-accent'>Sprintify</h1>
          <span className='sr-only'>Sprintify</span>
        </Link>
      </div>
      <div className='h-screen flex items-center justify-center'>
        <Card className='w-full max-w-md mx-auto'>
          <CardHeader>
            <CardTitle>
              {view === "login" ? "Login" : view === "forgotPassword" ? "Forgot Password" : "Register"}
            </CardTitle>
          </CardHeader>
          {view === "login" && <LoginForm dispatch={loginDispatch} setView={setView} />}
          {view === "forgotPassword" && <ForgotPasswordForm dispatch={forgotPasswordDispatch} setView={setView} />}
          {view === "register" && <RegisterForm dispatch={registerDispatch} setView={setView} />}
        </Card>
      </div>
    </Suspense>
  )
}

type FormProps = {
  dispatch: (formData: FormData) => void
  setView: (view: AuthView) => void
}

function LoginForm({ dispatch, setView }: FormProps) {
  return (
    <form action={dispatch}>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' name='email' type='email' placeholder='Enter your email' required />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' name='password' type='password' placeholder='Enter your password' required />
        </div>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <SubmitButton />
        <Button variant='link' onClick={() => setView("forgotPassword")}>
          Forgot Password?
        </Button>
        <Button variant='link' onClick={() => setView("register")}>
          Don&apos;t have an account? Register
        </Button>
      </CardFooter>
    </form>
  )
}

function ForgotPasswordForm({ dispatch, setView }: FormProps) {
  return (
    <form action={dispatch}>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='forgot-email'>Email</Label>
          <Input id='forgot-email' name='email' type='email' placeholder='Enter your email' required />
        </div>
        <p className='text-sm text-muted-foreground'>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-4'>
        <SubmitButton />
        <Button variant='link' onClick={() => setView("login")}>
          Back to Login
        </Button>
      </CardFooter>
    </form>
  )
}

function RegisterForm({ dispatch, setView }: FormProps) {
  return (
    <form action={dispatch}>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='user'>Name</Label>
          <Input id='user' name='user' placeholder='Enter your name' required />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='register-email'>Email</Label>
          <Input id='register-email' name='email' type='email' placeholder='Enter your email' required />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='register-password'>Password</Label>
          <Input id='register-password' name='password' type='password' placeholder='Create a password' required />
        </div>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <SubmitButton />
        <Button variant='link' onClick={() => setView("login")}>
          Already have an account? Login
        </Button>
      </CardFooter>
    </form>
  )
}
