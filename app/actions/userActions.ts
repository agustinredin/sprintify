"use server"
import { hash, compare } from "bcryptjs"
import { sql } from "@vercel/postgres"
import { v4  } from "uuid"
import { cookies } from "next/headers"
import { IEmail, IResponse, IUser, Strict } from "@/app/lib/interfaces"
import ConfirmRegisterEmail from "@/components/custom/ConfirmRegisterEmail"
import { sendEmail } from "./emailActions"
import ResetPasswordEmail from "@/components/custom/ResetPasswordEmail"
import { isValidPassword } from "../lib/utils"
import { Account, Profile } from "next-auth"

const userCookie = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 18000000,
}

export const getUserById = async (id: string) => {
  const data = await sql`SELECT * from users where id=${id}`
  const result = (data.rows[0] as IUser) ?? null
  return result
}

export const getUserByEmail = async (email: string) => {
  const data = await sql`SELECT * from users where email=${email}`
  const result = (data.rows[0] as IUser) ?? null
  return result
}

//eslint disable react-prop-types

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

export const getUserSession = async (): Promise<IUser | null> => {
  const userAsString = cookies().get(userCookie.name)?.value
  if (!userAsString) return null
  const user = JSON.parse(userAsString) as IUser
  console.log("GET session for user:", user.id)
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
        error: "Please enter valid fields for e-mail and password.",
      }

    const data = await sql`SELECT * from USERS where email=${email}`
    const result = (data.rows[0] as IUser) ?? null

    let mismatch = !result || !(await compare(password, result.password))

    if (mismatch) {
      return {
        code: "error",
        error: "Wrong e-mail or password.",
      }
    }

    let unverified = !result.verified

    if (unverified) {
      return {
        code: "info",
        error: "Your account is not verified. Verify it via e-mail before logging in.",
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

    if (!isValidPassword(password)) {
      return {
        error:
          "Password must be at least 8 characters long, contain at least one uppercase character, one lowercase character and a number.",
      }
    }

    const selectQuery = await sql`
    SELECT * from USERS where email=${email}`

    const selectResult = selectQuery.rowCount

    if (selectResult && selectResult > 0) {
      return { code: "info", error: "This user already has an account. Try logging in." }
    }

    const hashedPassword = await hash(password || "", 10)
    const id = v4() // Generate a new UUID
    const insertQuery = await sql`
    INSERT INTO USERS (ID, name, email, password, role_id, admin_id, verified)
    VALUES (${id}, ${user}, ${email}, ${hashedPassword}, null, null, false)
    RETURNING *`

    const insertResult = insertQuery.rows[0] as IUser

    let confirmRegisterRequest: IEmail = {
      from: "Acme <onboarding@resend.dev>",
      to: ["agustintomasredin@gmail.com"], //TODO: email
      subject: "Sprintify - Confirm your Email",
      body: ConfirmRegisterEmail({ id }),
    }

    const emailResponse = await sendEmail(confirmRegisterRequest)
    if (emailResponse?.error) {
      return {
        code: "error",
        error: "Error sending e-mail confirmation. Refresh or try again later.",
      }
    }

    return {
      response: insertResult.id,
      code: "success",
    }
  } catch (err) {
    return {
      code: "error",
      error: "Error creating user. Refresh or try again later.",
    }
  }
}

export const createOAuthUser = async (account: Strict<Profile>): Promise<IResponse<Boolean>> => {
  try {
    //oauth default password (wont be required)
    const { user, email, password } = {
      user: account.name,
      email: account.email,
      password: `${account.name}__${account.email}__${account.sub}`,
    }

    const selectQuery = await sql`SELECT * from USERS where email=${email}`

    const selectResult = selectQuery.rowCount

    //user already has an OAuth account
    if (selectResult && selectResult > 0) {
      return {
        response: true,
        code: "success",
      }
    }

    const hashedPassword = await hash(password || "", 10)
    const id = v4() // Generate a new UUID
    const insertQuery = await sql`
    INSERT INTO USERS (ID, name, email, password, role_id, admin_id, verified)
    VALUES (${id}, ${user}, ${email}, ${hashedPassword}, null, null, true)
    RETURNING *`

    return {
      response: true,
      code: "success",
    }
  } catch (err) {
    return {
      code: "error",
      error: "Error creating user from OAuth. Refresh or try again later.",
    }
  }
}

export const verifyUser = async (id: string): Promise<IResponse<Boolean>> => {
  let user = await getUserById(id)

  if (!user) {
    return {
      code: "error",
      response: false,
      error: `User ID ${id} not found on verification.`,
    }
  }

  let updateQuery = await sql`UPDATE users SET verified = true WHERE id = ${id}`
  return {
    code: "success",
    response: true,
  }
}

export const resetUserPasswordRequest = async (email: string): Promise<IResponse<string>> => {
  try {
    const selectQuery = await sql`
      SELECT * from USERS where email=${email}`

    const selectResult = selectQuery.rowCount

    if (selectResult && selectResult == 0) {
      return { code: "info", response: "User does not exist." }
    }

    const user = selectQuery.rows[0] as IUser

    let confirmRegisterRequest: IEmail = {
      from: "Acme <onboarding@resend.dev>",
      to: ["agustintomasredin@gmail.com"], //TODO: email
      subject: "Sprintify - Reset your password",
      body: ResetPasswordEmail({ id: user.id }),
    }

    const emailResponse = await sendEmail(confirmRegisterRequest)
    if (emailResponse?.error) {
      return {
        code: "error",
        error: "Error sending password reset e-mail. Refresh or try again later.",
      }
    }

    return {
      code: "success",
      response: "Reset password e-mail sent. Please, check your inbox.",
    }
  } catch (err) {
    return {
      code: "error",
      error: "An error occured attempting to send your reset password E-mail. Refresh or try again later.",
    }
  }
}

export const resetUserPassword = async (formData: FormData): Promise<IResponse<string>> => {
  try {
    const { newPasswordEmail, newPassword, newPasswordConfirm } = {
      newPasswordEmail: formData.get("new-password-email")?.toString(),
      newPassword: formData.get("new-password")?.toString(),
      newPasswordConfirm: formData.get("new-password-confirm")?.toString(),
    }

    let mismatch = newPassword != newPasswordConfirm
    if (mismatch) {
      return {
        code: "error",
        error: "New passwords do not match. Please, check carefully.",
      }
    }

    if (!isValidPassword(newPassword ?? "")) {
      return {
        error:
          "Password must be at least 8 characters long, contain at least one uppercase character, one lowercase character and a number.",
      }
    }

    const hashedPassword = await hash(newPassword || "", 10)
    const updateQuery = sql`UPDATE users SET password = ${hashedPassword} WHERE email=${newPasswordEmail}`

    return {
      response: "Password reset successfully. Now log in to your account.",
      code: "success",
    }
  } catch (err) {
    return {
      code: "error",
      error: "Error logging in. Refresh or try again later.",
    }
  }
}
