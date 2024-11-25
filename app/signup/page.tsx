"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SprintifyIcon } from "@/components/ui/icons"
import { loginUser, createUser, verifyUser, resetUserPasswordRequest, getUserById, resetUserPassword, getUserSession } from "../actions/userActions"
import { useToast } from "@/components/context/ToastContext"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { signIn } from 'next-auth/react'
import Tooltip from "@/components/ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { getServerSession } from "next-auth"
import { sleep } from "../lib/utils"
import Loader from "@/components/ui/loader"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' disabled={pending} className='my-2 w-full'>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  )
}

type AuthView = "login" | "forgotPassword" | "resetPassword" | "register"

export default function Page() {
  const { showToast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [view, setView] = useState<AuthView>("login")
  const [userHasConfirmed, setUserHasConfirmed] = useState<Boolean>(false)
  const [passwordHasReset, setPasswordHasReset] = useState<Boolean>(false)
  const [resetPasswordEmailValue, setResetPasswordEmailValue] = useState<string>("")

  const handleConfirmUser = useCallback(
    async (confirmUserId: string) => {
      const result = await verifyUser(confirmUserId)
      if (result.error) {
        showToast("error", result.error, 5000)
        return
      }

      showToast("success", "E-mail confirmed. Now log in to your account.", 5000)
    },
    [showToast],
  )

  const handleResetPassword = useCallback(
    async (resetPasswordUserId: string) => {
      const result = await getUserById(resetPasswordUserId)

      if (!result) {
        showToast("error", "User not found in database. Please contact support.", 5000)
        setView("login")
        return
      }

      setResetPasswordEmailValue(result.email)
      setView("resetPassword")
    },
    [showToast],
  )

  const handleGitHubSignIn = async () => {
    showToast('info', 'Signing in with GitHub...', 5000)
    await signIn('github')
  }

  useEffect(() => {

    const checkUserSession = async () => {
      const session = await getUserSession()
      if (session) {
        router.push("/software")
      }
    }
    checkUserSession()

    if (!userHasConfirmed) {
      const confirmUserId = searchParams.get("confirmUserId")
      if (confirmUserId) {
        handleConfirmUser(confirmUserId)
        setUserHasConfirmed(true)
      }
    }
    if (!passwordHasReset) {
      const resetPasswordUserId = searchParams.get("resetPasswordUserId")
      if (resetPasswordUserId) {
        handleResetPassword(resetPasswordUserId)
        setPasswordHasReset(true)
      }
    }

    //GitHub auth
    if (searchParams.get("githubAuthorize")) {
      router.push("/software")
    }
  }, [searchParams, handleConfirmUser, userHasConfirmed, handleResetPassword, passwordHasReset, router])

  const [, loginDispatch] = useFormState(loginAction, null)
  const [, forgotPasswordDispatch] = useFormState(forgotPasswordAction, null)
  const [, resetPasswordDispatch] = useFormState(resetPasswordAction, null)
  const [, registerDispatch] = useFormState(registerAction, null)

  async function loginAction(prevState: unknown, formData: FormData): Promise<void> {
    const result = await loginUser(formData)

    if (result.error) {
      showToast("error", result.error, 5000)
      return
    }

    if (result.error && result.code == "info") {
      showToast("info", result.error, 5000)
    }

    setTimeout(() => router.push("/software"), 1000)
    showToast("success", "Logged in successfully. Redirecting...", 5000)
    return
  }

  async function forgotPasswordAction(prevState: unknown, formData: FormData): Promise<void> {
    const email = formData.get("email")?.toString()
    if (!email) {
      showToast("error", "E-mail is required", 5000)
      return
    }
    const result = await resetUserPasswordRequest(email)

    if (result.error) {
      showToast("error", result.error, 5000)
      return
    }

    if (result.response && result.code == "info") {
      showToast("info", result.response, 5000)
      return
    }

    showToast("success", result.response ?? "", 5000)
  }

  async function registerAction(prevState: unknown, formData: FormData): Promise<void> {
    const result = await createUser(formData)
    if (result.error) {
      showToast("error", result.error, 5000)
      return
    }
    if (result.error && result.code == "info") {
      showToast("info", result.error, 5000)
      setView("login")
    }

    showToast("success", "Registered successfully. Please check your e-mail to confirm registration.", 5000)
    return
  }

  async function resetPasswordAction(prevState: unknown, formData: FormData): Promise<void> {
    const result = await resetUserPassword(formData)
    if (result.error) {
      showToast("error", result.error, 5000)
      return
    }
    if (result.error && result.code == "info") {
      showToast("info", result.error, 5000)
      setView("login")
    }

    showToast("success", result.response ?? '', 5000)
    setView('login')
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
              {view === "login"
                ? "Login"
                : view === "forgotPassword"
                ? "Forgot Password"
                : view === "resetPassword"
                ? "Reset password"
                : "Register"}
            </CardTitle>
          </CardHeader>
          {view === "login" && <LoginForm dispatch={loginDispatch} setView={setView} />}
          {view === "forgotPassword" && <ForgotPasswordForm dispatch={forgotPasswordDispatch} setView={setView} />}
          {view === "resetPassword" && (
            <ResetPasswordForm dispatch={resetPasswordDispatch} email={resetPasswordEmailValue} />
          )}
          {view === "register" && <RegisterForm dispatch={registerDispatch} setView={setView} />}
          {(view === "register" || view == "login") && (
            <CardFooter className='space-y-4'>
              <div className='w-full'>
                <div className='relative flex h-7 items-center justify-center gap-2 pb-2'>
                  <div className='w-6 border-t border-yellow-darker dark:border-[#B9B9C6]'></div>
                  <span className='flex-shrink font-primary text-sm text-yellow-darker dark:text-[#B9B9C6]'>or</span>
                  <div className='w-6 border-t border-yellow-darker dark:border-[#B9B9C6]'></div>
                </div>
                <div className='flex items-center justify-center'>
                  <Tooltip content='Sign In with GitHub' className="bg-accent">
                    <button onClick={handleGitHubSignIn}>
                      <GitHubLogoIcon className='w-8 h-8 text-primary/80 hover:text-accent hover:cursor-pointer' />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </Suspense>
  )
}

type FormProps = {
  dispatch: (formData: FormData) => void
  setView: (view: AuthView) => void
  email?: string
}

function LoginForm({ dispatch, setView }: FormProps) {
  return (
    <form action={dispatch}>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>E-mail</Label>
          <Input id='email' name='email' type='email' placeholder='Enter your e-mail' required />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' name='password' type='password' placeholder='Enter your password' required />
        </div>
      </CardContent>
      <CardFooter className='flex flex-col px-6 py-4'>
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
          <Label htmlFor='forgot-email'>E-mail</Label>
          <Input id='forgot-email' name='email' type='email' placeholder='Enter your email' required />
        </div>
        <p className='text-0'>
          Enter your e-mail address and we&apos;ll send you a link to reset your password.
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

function ResetPasswordForm({ dispatch, email = '' }: Omit<FormProps, "setView">) {
  return (
    <form action={dispatch}>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <p className=''>E-mail: {email}</p>
          <Input name='new-password-email' type='hidden' value={email}></Input>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='register-password'>New Password</Label>
          <Input name='new-password' type='password' placeholder='Create a new password' required />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='register-password'>Confirm New Password</Label>
          <Input name='new-password-confirm' type='password' placeholder='Confirm new password' required />
        </div>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <SubmitButton />
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
          <Label htmlFor='register-email'>E-mail</Label>
          <Input id='register-email' name='email' type='email' placeholder='Enter your e-mail' required />
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
