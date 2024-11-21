import { sql } from "@vercel/postgres"

export const dynamic = "force-dynamic" // static by default, unless reading the request

export async function GET(request: Request) {
  try {
    const result = await sql`SELECT * from ejemploproductos`
    console.log(result)
    return new Response(JSON.stringify(result.rows))
  } catch (error) {
    return new Response(`error: ${error}`)
  }
}
