"use server"

import { sql } from "@vercel/postgres"
import type { IProject, IResponse } from "../lib/interfaces"
import { getUserSession } from "./userActions"
import { redirect } from "next/navigation"
import { v4 } from "uuid"

export async function fetchUserProjects(userId: string): Promise<IResponse<IProject[]>> {
  const query = await sql`SELECT * from projects where user_id=${userId}`

  return {
    code: "success",
    response: query?.rows as IProject[],
  }
}

export async function getProjectById(projectId: string): Promise<IResponse<IProject>> {
  try {
    const user = await getUserSession()
    
    if (!user) redirect("/signup")

    const query = await sql`
      SELECT * FROM projects 
      WHERE id = ${projectId} AND user_id = ${user.id}
    `

    if (query.rowCount === 0) {
      return {
        code: "error",
        error: "Project not found",
      }
    }

    console.log('QUERYROWS', query.rows, 'PROJECTID',projectId)
    return {
      code: "success",
      response: query.rows[0] as IProject,
    }
  } catch (err) {
    console.error("Error fetching project:", err)
    return {
      code: "error",
      error: "Failed to fetch project. Please try again later.",
    }
  }
}

export async function createProject(formData: FormData): Promise<IResponse<IProject | string>> {
  try {
    const { name, fromDate, toDate } = {
      name: formData.get("name")?.toString(),
      fromDate: formData.get("fromDate")?.toString(),
      toDate: formData.get("toDate")?.toString(),
    }
    console.log(name, fromDate, toDate)

    const user = await getUserSession()

    if (!user) redirect("/signup")

    if (!name || !fromDate || !toDate) {
      return {
        code: "error",
        error: "Please complete all fields.",
      }
    }

    const fromDateObj = new Date(fromDate)
    const toDateObj = new Date(toDate)

    if (toDateObj < fromDateObj) {
      return { code: "error", error: "The end date must not be sooner than the start date." }
    }

    const selectQuery = sql`SELECT * from projects where name=${name} AND user_id=${user?.id}`

    const selectResult = (await selectQuery).rowCount

    if (selectResult && selectResult > 0) {
      return { code: "info", error: "You already created a project with this name." }
    }

    const id = v4()

    const insertQuery = await sql`
        INSERT INTO projects (ID, name, start_date, end_date, user_id)
        VALUES (${id}, ${name}, ${fromDateObj.toISOString()}, ${toDateObj.toISOString()}, ${user.id})
        RETURNING *`

    const insertResult = insertQuery.rows[0] as IProject

    return {
      code: "success",
      response: insertResult, // Return the full project object including ID
    }
  } catch (err) {
    console.log("Error creating project: ", err)
    return {
      code: "error",
      error: "Error creating project. Refresh or try again later.",
    }
  }
}

