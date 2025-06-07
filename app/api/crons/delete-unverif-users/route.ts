import { sql } from "@vercel/postgres"

export const dynamic = "force-dynamic" // static by default, unless reading the request

export async function GET(request: Request) {
  try {
    const result = await sql`DELETE FROM users WHERE verified = false OR verified is NULL`
    return new Response(`CRON job executed. Unverified users deleted: ${result.rowCount ?? 0}`)
  } catch (error) {
    return new Response(`CRON job error: ${error}`)
  }
}
