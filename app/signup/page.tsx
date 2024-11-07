"use client"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SprintifyIcon } from "@/components/ui/icons"
import { loginUser, createUser, verifyUserSession } from "../actions/userActions"
import { redirect, useRouter, useSearchParams } from "next/navigation"

//TODO: próximos pasos
//1: modificar createUser para que no cree la sesión, y mover la parte de lógica y creación de TOKEN a nueva f() verifyUser
//2: crear proceso/CRON JOB para que cada 24 horas se eliminen los user que no esten verificados
//3: ver por qué el mail no tiene formato y arreglar
//4: agregar verificación de si existe usuario avisar
//5: implementar google signup y google login con nextAuth: https://www.youtube.com/watch?v=YCEnpcCYlyo
//6: agregar password reset email + vista con verificaciones de si existe el usuario

export default function Component() {
  const searchParams = useSearchParams()
  console.log('confirmUser', searchParams.get("confirmUser"))
  useEffect(() => {
    const confirmUser = searchParams.get("confirmUser")
    if (confirmUser) {
      setView("login")
      handleConfirmUser(confirmUser)
    }
  }, [searchParams])

  const router = useRouter()

  const handleConfirmUser = async (confirmUser : string) =>  {
    // alert(`paso por login action. user:${confirmUser}`)
    loginAction(undefined, null, true)
  }

  async function loginAction(prevState: any, formData: FormData | any, isUserConfirmation: boolean = false) {
    if (isUserConfirmation) {
      return {
        success: "Email confirmed. Now log in to your account.",
      }
    }
    const result = await loginUser(formData)
    if (result.error) {
      return {
        error: result.error,
      }
    }

    setTimeout(() => {
      router.push("/software")
    }, 1500)

    return {
      success: "Logged in successfully. Redirecting...",
    }
  }

  async function forgotPasswordAction(prevState: any, formData: FormData) {
    const email = formData.get("email")
    if (!email) {
      return { error: "Email is required" }
    }
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: "Password reset email sent!" }
  }

  async function registerAction(prevState: any, formData: FormData) {
    const result = await createUser(formData)
    //TODO: reskin mensaje primero, primero confirmation y despues CREATE USER
    if (result.error) {
      return {
        error: result.error,
      }
    }

    // setTimeout(() => router.push("/software"), 1500)

    return { success: "Registered successfully. Please, check your e-mail account to confirm registration." }
  }

  function SubmitButton() {
    const { pending } = useFormStatus()
    return (
      <Button type='submit' disabled={pending} className='my-2 w-full'>
        {pending ? "Submitting..." : "Submit"}
      </Button>
    )
  }

  const [view, setView] = useState<"login" | "forgotPassword" | "register">("login")
  const [loginState, loginDispatch] = useFormState(loginAction, null)
  const [forgotPasswordState, forgotPasswordDispatch] = useFormState(forgotPasswordAction, null)
  const [registerState, registerDispatch] = useFormState(registerAction, null)

  return (
    <>
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
          {view === "login" && (
            <form action={loginDispatch}>
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
                {loginState?.error && <p className='text-sm text-red-500'>{loginState.error}</p>}
                {loginState?.success && <p className='text-sm text-green-500'>{loginState.success}</p>}
              </CardFooter>
            </form>
          )}
          {view === "forgotPassword" && (
            <form action={forgotPasswordDispatch}>
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
                {forgotPasswordState?.error && <p className='text-sm text-red-500'>{forgotPasswordState.error}</p>}
                {forgotPasswordState?.success && (
                  <p className='text-sm text-green-500'>{forgotPasswordState.success}</p>
                )}
              </CardFooter>
            </form>
          )}
          {view === "register" && (
            <form action={registerDispatch}>
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
                  <Input
                    id='register-password'
                    name='password'
                    type='password'
                    placeholder='Create a password'
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className='flex flex-col'>
                <SubmitButton />
                <Button variant='link' onClick={() => setView("login")}>
                  Already have an account? Login
                </Button>
                {registerState?.error && <p className='text-sm text-red-500'>{registerState.error}</p>}
                {registerState?.success && <p className='text-sm text-green-500'>{registerState.success}</p>}
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </>
  )
}
