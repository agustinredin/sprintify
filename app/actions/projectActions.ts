"use server"

import { sql } from "@vercel/postgres"
import type { IProject, IResponse } from "../lib/interfaces"
import { getUserSession } from "./userActions"
import { redirect } from "next/navigation"
import { v4 } from "uuid"
import { revalidatePath } from "next/cache"


export async function fetchUserProjects(userId: string): Promise<IResponse<IProject[] | undefined>> {
  const query = await sql`SELECT * from projects where user_id=${userId} AND status <> 'completed'`

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
    return {
      code: "error",
      error: "Error creating project. Refresh or try again later.",
    }
  }
}


export async function updateProject(formData: FormData): Promise<IResponse<IProject>> {
  try {
    const { id, name, fromDate, toDate } = {
      id: formData.get("id")?.toString(),
      name: formData.get("name")?.toString(),
      fromDate: formData.get("fromDate")?.toString(),
      toDate: formData.get("toDate")?.toString(),
    }

    const user = await getUserSession()

    if (!user) {
      return {
        code: "error",
        error: "User not authenticated",
      }
    }

    if (!id || !name || !fromDate || !toDate) {
      return {
        code: "error",
        error: "Please complete all fields.",
      }
    }

    const fromDateObj = new Date(fromDate)
    const toDateObj = new Date(toDate)

    if (toDateObj < fromDateObj) {
      return {
        code: "error",
        error: "The end date must not be sooner than the start date.",
      }
    }

    // Verify the project belongs to the user
    const projectQuery = await sql`
      SELECT id FROM projects 
      WHERE id = ${id} AND user_id = ${user.id}
    `

    if (projectQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Project not found or access denied",
      }
    }

    // Check if another project with the same name exists (excluding this project)
    const nameCheckQuery = await sql`
      SELECT id FROM projects 
      WHERE name = ${name} AND user_id = ${user.id} AND id != ${id}
    `

    if (nameCheckQuery && !nameCheckQuery['rowCount']) {
      return {
        code: "error",
        error: "You already have another project with this name",
      }
    }

    // Update the project
    const updateQuery = await sql`
      UPDATE projects
      SET 
        name = ${name},
        start_date = ${fromDateObj.toISOString()},
        end_date = ${toDateObj.toISOString()}
      WHERE id = ${id} AND user_id = ${user.id}
      RETURNING *
    `

    if (updateQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Project could not be updated",
      }
    }

    const updatedProject = updateQuery.rows[0] as IProject

    // Revalidate the project page and projects list
    revalidatePath(`/software/project/${id}`)
    revalidatePath("/software")

    return {
      code: "success",
      response: updatedProject,
    }
  } catch (err) {
    console.error("Error updating project:", err)
    return {
      code: "error",
      error: "Failed to update project. Please try again later.",
    }
  }
}

export async function deleteProject(projectId: string): Promise<IResponse<void>> {
  try {
    const user = await getUserSession()

    if (!user) {
      return {
        code: "error",
        error: "User not authenticated",
      }
    }

    // Verify the project belongs to the user
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

    // Delete all tasks associated with the project first
    await sql`
      DELETE FROM tasks
      WHERE project_id = ${projectId}
    `

    // Delete the project
    const deleteQuery = await sql`
      DELETE FROM projects
      WHERE id = ${projectId} AND user_id = ${user.id}
    `

    if (deleteQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Project could not be deleted",
      }
    }

    // Revalidate the projects list
    revalidatePath("/software")

    return {
      code: "success",
    }
  } catch (err) {
    console.error("Error deleting project:", err)
    return {
      code: "error",
      error: "Failed to delete project. Please try again later.",
    }
  }
}


export async function finishProject(projectId: string): Promise<IResponse<void>> {
  try {
    const user = await getUserSession()

    if (!user) {
      return {
        code: "error",
        error: "User not authenticated",
      }
    }

    // Verify the project belongs to the user
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

    // Check if all tasks are completed
    const tasksQuery = await sql`
      SELECT COUNT(*) as total, 
             SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as completed
      FROM tasks
      WHERE project_id = ${projectId}
    `

    const taskStats = tasksQuery.rows[0]

    if (Number.parseInt(taskStats.total) === 0) {
      return {
        code: "error",
        error: "Project has no tasks to complete",
      }
    }

    if (Number.parseInt(taskStats.completed) < Number.parseInt(taskStats.total)) {
      return {
        code: "error",
        error: "All tasks must be completed before finishing the project",
      }
    }

    // Update the project status to completed
    await sql`
      UPDATE projects
      SET status = 'completed', completed_date = NOW()
      WHERE id = ${projectId} AND user_id = ${user.id}
    `

    // Revalidate the projects list
    revalidatePath("/software")

    return {
      code: "success",
    }
  } catch (err) {
    console.error("Error finishing project:", err)
    return {
      code: "error",
      error: "Failed to finish project. Please try again later.",
    }
  }
}
