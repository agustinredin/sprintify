"use server"

import { sql } from "@vercel/postgres"
import type { IResponse, ITask } from "../lib/interfaces"
import { getUserSession } from "./userActions"

export async function getTasksByProjectId(projectId: string): Promise<IResponse<ITask[]>> {
  try {
    const user = await getUserSession()

    if (!user) {
      return {
        code: "error",
        error: "User not authenticated",
      }
    }

    // First verify the project belongs to the user
    const projectQuery = await sql`
      SELECT id FROM projects 
      WHERE id = ${projectId} AND user_id = ${user.id}
    `

    if (projectQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Project not found or access denied",
      }
    }

    // Fetch tasks for the project
    const tasksQuery = await sql`
      SELECT * FROM tasks 
      WHERE project_id = ${projectId}
      ORDER BY priority DESC, id ASC
    `

    return {
      code: "success",
      response: tasksQuery.rows as ITask[],
    }
  } catch (err) {
    console.error("Error fetching tasks:", err)
    return {
      code: "error",
      error: "Failed to fetch tasks. Please try again later.",
    }
  }
}

export async function getTaskCountsByStatus(projectId: string): Promise<IResponse<Record<string, number>>> {
  try {
    const user = await getUserSession()

    if (!user) {
      return {
        code: "error",
        error: "User not authenticated",
      }
    }

    // Verify project belongs to user
    const projectQuery = await sql`
      SELECT id FROM projects 
      WHERE id = ${projectId} AND user_id = ${user.id}
    `

    if (projectQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Project not found or access denied",
      }
    }

    // Get task counts by status
    const countsQuery = await sql`
      SELECT status, COUNT(*) as count
      FROM tasks
      WHERE project_id = ${projectId}
      GROUP BY status
    `

    // Convert to a more usable format
    const statusCounts: Record<string, number> = {
      backlog: 0,
      todo: 0,
      inprogress: 0,
      done: 0,
    }

    countsQuery.rows.forEach((row: any) => {
      if (row.status) {
        statusCounts[row.status.toLowerCase()] = Number.parseInt(row.count)
      }
    })

    return {
      code: "success",
      response: statusCounts,
    }
  } catch (err) {
    console.error("Error fetching task counts:", err)
    return {
      code: "error",
      error: "Failed to fetch task counts. Please try again later.",
    }
  }
}

