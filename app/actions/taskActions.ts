"use server"

import { sql } from "@vercel/postgres"
import type { IResponse, ITask } from "../lib/interfaces"
import { getUserSession } from "./userActions"
import { revalidatePath } from "next/cache"

export async function getTasksByProjectId(projectId: string): Promise<IResponse<ITask[]>> {
  try {
    const user = await getUserSession()

    if (!user) {
      return {
        code: "error",
        error: "User not authenticated",
        response: [],
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
        response: [],
      }
    }

    // Fetch tasks for the project
    const tasksQuery = await sql`
      SELECT 
        id, 
        name, 
        description, 
        priority, 
        type, 
        estimated_hours, 
        sprint_id,
        project_id,
        status
      FROM tasks 
      WHERE project_id = ${projectId}
      ORDER BY 
        CASE 
          WHEN priority = 'high' THEN 1
          WHEN priority = 'medium' THEN 2
          WHEN priority = 'low' THEN 3
          ELSE 4
        END,
        id ASC
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
      response: [],
    }
  }
}

export async function getTaskById(projectId: string, taskId: number): Promise<IResponse<ITask>> {
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

    // Fetch the task
    const taskQuery = await sql`
      SELECT 
        id, 
        name, 
        description, 
        priority, 
        type, 
        estimated_hours, 
        sprint_id,
        project_id,
        status
      FROM tasks 
      WHERE id = ${taskId} AND project_id = ${projectId}
    `

    if (taskQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Task not found",
      }
    }

    return {
      code: "success",
      response: taskQuery.rows[0] as ITask,
    }
  } catch (err) {
    console.error("Error fetching task:", err)
    return {
      code: "error",
      error: "Failed to fetch task. Please try again later.",
    }
  }
}

export async function getProjectTaskCounts(projectId: string): Promise<IResponse<number>> {
  try {
    const user = await getUserSession()

    if (!user) {
      return {
        code: "error",
        error: "User not authenticated",
        response: 0,
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
        response: 0,
      }
    }

    // Get total task count
    const countQuery = await sql`
      SELECT COUNT(*) as count
      FROM tasks
      WHERE project_id = ${projectId}
    `

    const count = Number.parseInt(countQuery.rows[0]?.count || "0")

    return {
      code: "success",
      response: count,
    }
  } catch (err) {
    console.error("Error fetching task count:", err)
    return {
      code: "error",
      error: "Failed to fetch task count. Please try again later.",
      response: 0,
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
        response: { backlog: 0, todo: 0, inprogress: 0, done: 0 },
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
        response: { backlog: 0, todo: 0, inprogress: 0, done: 0 },
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
      response: { backlog: 0, todo: 0, inprogress: 0, done: 0 },
    }
  }
}


export async function createTask(params: ITask): Promise<IResponse<ITask>> {
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
      WHERE id = ${params.project_id} AND user_id = ${user.id}
    `

    if (projectQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Project not found or access denied",
      }
    }

    // Get the current maximum ID
    const maxIdQuery = await sql`
      SELECT COALESCE(MAX(id), 0) as max_id FROM tasks
    `

    const maxId = Number.parseInt(maxIdQuery.rows[0].max_id)
    const newId = maxId + 1

    // Insert the new task
    const insertQuery = await sql`
      INSERT INTO tasks (
        name, 
        description, 
        priority, 
        type, 
        estimated_hours, 
        project_id,
        status
      ) VALUES (
        ${params.name},
        ${params.description || null},
        ${params.priority || null},
        ${params.type || null},
        ${params.estimated_hours || null},
        ${params.project_id},
        ${"backlog"} -- Default status for new tasks
      )
      RETURNING *
    `

    const newTask = insertQuery.rows[0] as ITask

    // Revalidate the project page to show the new task
    revalidatePath(`/software/project/${params.project_id}`)

    return {
      code: "success",
      response: newTask,
    }
  } catch (err) {
    console.error("Error creating task:", err)
    return {
      code: "error",
      error: "Failed to create task. Please try again later.",
    }
  }
}

export async function updateTask(task: ITask): Promise<IResponse<ITask>> {
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
      WHERE id = ${task.project_id} AND user_id = ${user.id}
    `

    if (projectQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Project not found or access denied",
      }
    }

    // Update the task
    const updateQuery = await sql`
      UPDATE tasks
      SET 
        name = ${task.name},
        description = ${task.description || null},
        priority = ${task.priority || null},
        type = ${task.type || null},
        estimated_hours = ${task.estimated_hours || null},
        sprint_id = ${task.sprint_id || null},
        status = ${task.status || "backlog"}
      WHERE id = ${task.id} AND project_id = ${task.project_id}
      RETURNING *
    `

    if (updateQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Task not found or could not be updated",
      }
    }

    const updatedTask = updateQuery.rows[0] as ITask

    // Revalidate the project page to show the updated task
    revalidatePath(`/software/project/${task.project_id}`)

    return {
      code: "success",
      response: updatedTask,
    }
  } catch (err) {
    console.error("Error updating task:", err)
    return {
      code: "error",
      error: "Failed to update task. Please try again later.",
    }
  }
}

export async function deleteTask(projectId: string, taskId: number): Promise<IResponse<void>> {
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

    // Delete the task
    const deleteQuery = await sql`
      DELETE FROM tasks
      WHERE id = ${taskId} AND project_id = ${projectId}
    `

    if (deleteQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Task not found or could not be deleted",
      }
    }

    // Revalidate the project page
    revalidatePath(`/software/project/${projectId}`)

    return {
      code: "success",
    }
  } catch (err) {
    console.error("Error deleting task:", err)
    return {
      code: "error",
      error: "Failed to delete task. Please try again later.",
    }
  }
}


export async function completeTask(projectId: string, taskId: number): Promise<IResponse<ITask>> {
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

    // Update the task status to done
    const updateQuery = await sql`
      UPDATE tasks
      SET status = 'done'
      WHERE id = ${taskId} AND project_id = ${projectId}
      RETURNING *
    `

    if (updateQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Task not found or could not be updated",
      }
    }

    const updatedTask = updateQuery.rows[0] as ITask

    // Revalidate the project page to show the updated task
    revalidatePath(`/software/project/${projectId}`)

    return {
      code: "success",
      response: updatedTask,
    }
  } catch (err) {
    console.error("Error completing task:", err)
    return {
      code: "error",
      error: "Failed to complete task. Please try again later.",
    }
  }
}

export async function revertTask(projectId: string, taskId: number): Promise<IResponse<ITask>> {
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

    // Update the task status to inprogress
    const updateQuery = await sql`
      UPDATE tasks
      SET status = 'inprogress'
      WHERE id = ${taskId} AND project_id = ${projectId}
      RETURNING *
    `

    if (updateQuery.rowCount === 0) {
      return {
        code: "error",
        error: "Task not found or could not be updated",
      }
    }

    const updatedTask = updateQuery.rows[0] as ITask

    // Revalidate the project page to show the updated task
    revalidatePath(`/software/project/${projectId}`)

    return {
      code: "success",
      response: updatedTask,
    }
  } catch (err) {
    console.error("Error reverting task:", err)
    return {
      code: "error",
      error: "Failed to revert task. Please try again later.",
    }
  }
}

