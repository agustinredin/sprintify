"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SaveIcon, XIcon, Trash2Icon, CheckCircleIcon, UndoIcon } from "lucide-react"
import { getTaskById, updateTask, deleteTask, completeTask, revertTask } from "@/app/actions/taskActions"
import { useToast } from "@/components/context/ToastContext"
import Loader from "@/components/ui/loader"

export default function EditTaskPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()
  const projectId = params.projectId as string
  const taskId = params.taskId as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCompletingTask, setIsCompletingTask] = useState(false)
  const [isRevertingTask, setIsRevertingTask] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    priority: "",
    type: "",
    estimated_hours: "",
    sprint_id: "",
    project_id: "",
    status: "",
  })

  const isTaskCompleted = formData.status === "done"

  useEffect(() => {
    const loadTask = async () => {
      try {
        const result = await getTaskById(projectId, Number.parseInt(taskId))
        if (result.code === "success" && result.response) {
          setFormData({
            id: result.response.id.toString(),
            name: result.response.name || "",
            description: result.response.description || "",
            priority: result.response.priority || "",
            type: result.response.type || "",
            estimated_hours: result.response.estimated_hours?.toString() || "",
            sprint_id: result.response.sprint_id?.toString() || "",
            project_id: result.response.project_id || "",
            status: result.response.status || "",
          })
        } else {
          showToast("error", result.error || "Failed to load task", 3000)
          router.back()
        }
      } catch (error) {
        console.error("Error loading task:", error)
        showToast("error", "An unexpected error occurred", 3000)
        router.back()
      } finally {
        setIsLoading(false)
      }
    }
    if (isLoading) loadTask()
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name) {
        showToast("error", "Task name is required", 3000)
        setIsSubmitting(false)
        return
      }

      const result = await updateTask({
        id: Number.parseInt(taskId),
        name: formData.name,
        description: formData.description,
        priority: formData.priority,
        type: formData.type,
        estimated_hours: formData.estimated_hours ? Number.parseFloat(formData.estimated_hours) : null,
        sprint_id: formData.sprint_id ? Number.parseInt(formData.sprint_id) : null,
        project_id: projectId,
        status: formData.status,
      })

      if (result.code === "error") {
        showToast("error", result.error || "Failed to update task", 3000)
      } else {
        showToast("success", "Task updated successfully", 3000)
        router.back()

      }
    } catch (error) {
      console.error("Error updating task:", error)
      showToast("error", "An unexpected error occurred", 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCompleteTask = async () => {
    setIsCompletingTask(true)
    try {
      const result = await completeTask(projectId, Number.parseInt(taskId))
      if (result.code === "error") {
        showToast("error", result.error || "Failed to complete task", 3000)
      } else {
        showToast("success", "Task marked as completed", 3000)
        setFormData((prev) => ({ ...prev, status: "done" }))
      }
    } catch (error) {
      console.error("Error completing task:", error)
      showToast("error", "An unexpected error occurred", 3000)
    } finally {
      setIsCompletingTask(false)
    }
  }

  const handleRevertTask = async () => {
    setIsRevertingTask(true)
    try {
      const result = await revertTask(projectId, Number.parseInt(taskId))
      if (result.code === "error") {
        showToast("error", result.error || "Failed to revert task", 3000)
      } else {
        showToast("success", "Task reverted to in progress", 3000)
        setFormData((prev) => ({ ...prev, status: "inprogress" }))
      }
    } catch (error) {
      console.error("Error reverting task:", error)
      showToast("error", "An unexpected error occurred", 3000)
    } finally {
      setIsRevertingTask(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      const result = await deleteTask(projectId, Number.parseInt(taskId))

      if (result.code === "error") {
        showToast("error", result.error || "Failed to delete task", 3000)
      } else {
        showToast("success", "Task deleted successfully", 3000)
        router.back()
      }
    } catch (error) {
      console.error("Error deleting task:", error)
      showToast("error", "An unexpected error occurred", 3000)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-xl mx-auto my-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Edit Task</CardTitle>
            <CardDescription>Update task details.</CardDescription>
          </div>
          {isTaskCompleted ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleRevertTask}
              disabled={isRevertingTask}
              className="ml-auto"
            >
              <UndoIcon className="mr-2 h-4 w-4" />
              {isRevertingTask ? "Reverting..." : "Revert"}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={handleCompleteTask}
              disabled={isCompletingTask}
              className="ml-auto bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircleIcon className="mr-2 h-4 w-4" />
              {isCompletingTask ? "Completing..." : "Mark as completed"}
            </Button>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input id="id" value={formData.id} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} rows={4} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimated_hours">Estimated Hours</Label>
              <Input
                id="estimated_hours"
                type="number"
                value={formData.estimated_hours}
                onChange={handleChange}
                min="0"
                step="0.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sprint_id">Sprint ID</Label>
              <Input
                id="sprint_id"
                value={formData.sprint_id}
                onChange={handleChange}
                placeholder="Leave empty if not assigned to a sprint"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            {isTaskCompleted ? (
              <div className="mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Completed
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  This task is completed. Use the &quot;Revert to In Progress&quot; button to change its status.
                </p>
              </div>
            ) : (
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              <XIcon className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              <Trash2Icon className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <SaveIcon className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
