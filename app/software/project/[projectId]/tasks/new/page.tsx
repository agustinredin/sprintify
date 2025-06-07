"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PlusIcon, XIcon } from "lucide-react"
import { createTask } from "@/app/actions/taskActions"
import { useToast } from "@/components/context/ToastContext"

export default function NewTaskPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()
  const project_id = params.projectId as string

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    type: "",
    estimatedHours: "",
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

      const result = await createTask({
        id: 0,
        project_id: project_id,
        name: formData.name,
        description: formData.description,
        priority: formData.priority,
        type: formData.type,
        estimated_hours: formData.estimatedHours ? Number.parseFloat(formData.estimatedHours) : null,
        status: 'backlog',
        sprint_id: null
      })

      if (result.code === "error") {
        showToast("error", result.error || "Failed to create task", 3000)
      } else {
        showToast("success", "Task created successfully", 3000)
        router.push(`/software/project/${project_id}`)
      }
    } catch (error) {
      console.error("Error creating task:", error)
      showToast("error", "An unexpected error occurred", 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-xl mx-auto my-8">
        <CardHeader>
          <CardTitle>New Task</CardTitle>
          <CardDescription>Add a new task to your project.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter a name for the task"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(value) => handleSelectChange("priority", value)}>
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
              <Select onValueChange={(value) => handleSelectChange("type", value)}>
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
          <div className="space-y-2">
            <Label htmlFor="estimatedHours">Estimated Hours</Label>
            <Input
              id="estimatedHours"
              type="number"
              placeholder="Enter estimated hours"
              value={formData.estimatedHours}
              onChange={handleChange}
              min="0"
              step="0.5"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleCancel}>
            <XIcon className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              "Creating..."
            ) : (
              <>
                <PlusIcon className="mr-2 h-4 w-4" />
                Create Task
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
