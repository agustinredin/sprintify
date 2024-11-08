"use server"
import { hash, compare } from "bcryptjs"
import { sql } from "@vercel/postgres"
import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { IEmail, IResponse, IUser } from "@/app/lib/interfaces"
import ConfirmRegister from "@/components/custom/ConfirmRegister"
import { sendEmail } from "./emailActions"

const userCookie = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 180000,
}

export const createUserSession = async (user: IUser) => {
  const expires = new Date(Date.now() + userCookie.duration)
  console.log("created user session for user id", user.id)
cookies().set(userCookie.name, JSON.stringify(user), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expires,
  })
}

export const verifyUserSession = async () => {
  const userAsString = cookies().get(userCookie.name)?.value
  if (!userAsString) return null
  const user = JSON.parse(userAsString)
  console.log("verified session for user:", user.id)
  return user
}

export const deleteUserSession = async () => {
  cookies().delete(userCookie.name)
  console.log("deleted user session for user id:", userCookie.name)
  return { success: true, message: "Session deleted" }
}

export const loginUser = async (formData: FormData): Promise<IResponse<IUser>> => {
  try {
    const { email, password } = {
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
    }

    if (!email || !password)
      return {
        code: "error",
        error: "Please enter valid fields for email and password.",
      }

    const data = await sql`SELECT * from USERS where email=${email}`
    const result = (data.rows[0] as IUser) ?? null
    
    let mismatch = !result || !(await compare(password, result.password))

    if (mismatch)
    {
        return {
          code: "error",
          error: "Wrong username or password.",
        }
    }

    await createUserSession(result)

    return {
      response: result,
      code: "success",
    }
  } catch (err) {
    return {
      code: "error",
      error: "Error logging in. Refresh or try again later.",
    }
  }
}

export const createUser = async (formData: FormData): Promise<IResponse<string>> => {
  try {
    const { user, email, password } = {
      user: formData.get("user")?.toString(),
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
    }

    if (!user || !email || !password) {
      return { error: "All fields are required" }
    }
    
    const hashedPassword = await hash(password || "", 10)
    const id = uuidv4() // Generate a new UUID
    const data = await sql`
    INSERT INTO USERS (ID, name, email, password, role_id, admin_id, verified)
    VALUES (${id}, ${user}, ${email}, ${hashedPassword}, 'abc123', null, false)
    RETURNING *`

    const result = data.rows[0] as IUser
    await createUserSession(result)

    let confirmRegisterRequest: IEmail = {
      from: "Acme <onboarding@resend.dev>",
      to: ["agustintomasredin@gmail.com"],//TODO: email
      subject: "Sprintify - Confirm your Email",
      body: ConfirmRegister({email})
    }

    const emailResponse = await sendEmail(confirmRegisterRequest)
    console.log(emailResponse)
    if (emailResponse?.error) {
      console.log(emailResponse?.error)
      return {
        code: "error",
        error: "Error sending email confirmation. Refresh or try again later."
      }
    } 

    return {
      response: result.id,
      code: "success",
    }
  } catch (err) {
    console.log(err)
    return {
      code: "error",
      error: "Error creating user. Refresh or try again later.",
    }
  }
}

export const getUserById = async (id: string) => {
  const data = await sql`SELECT * from users where id='${id}'`
  const result = (data.rows[0] as IUser) ?? null
  return result
}

const resetUserPassword = async (email: string): Promise<IResponse<void>> => {
  return {
    code: "success",
  }
}