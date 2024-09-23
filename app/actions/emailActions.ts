"use server"
import { Resend } from "resend"
import { IEmail, IResponse } from "../lib/interfaces"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(email: IEmail): Promise<IResponse<string>> {
  const emailResponse = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email.to,
    subject: email.subject,
    react: typeof email.body == 'string' ? undefined : email.body,
    html: typeof email.body == 'string' ? email.body : undefined
  })

  return {
    response: emailResponse?.data?.id,
    code: emailResponse?.error ? "error" : "success",
    error: emailResponse?.error?.message,
  }
}
