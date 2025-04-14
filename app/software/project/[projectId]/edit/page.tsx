"use client"

import type React from "react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Suspense, useEffect, useState } from "react"
import Loader from "@/components/ui/loader"
import { useToast } from "@/components/context/ToastContext"
import { useParams, useRouter } from "next/navigation"
import { getProjectById, updateProject, deleteProject } from "@/app/actions/projectActions"
import { SaveIcon, XIcon, Trash2Icon } from "lucide-react"

export default function EditProjectPage() {
  const { showToast } = useToast()
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    start_date: "",
    end_date: "",
    user_id: "",
  })

  useEffect(() => {
    const loadProject = async () => {
      try {
        const result = await getProjectById(projectId)
        if (result.code === "success" && result.response) {
          // Format dates for input fields (YYYY-MM-DD)
          const startDate = new Date(result.response.start_date)
          const endDate = new Date(result.response.end_date)

          setFormData({
            id: result.response.id,
            name: result.response.name,
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
            user_id: result.response.user_id,
          })
        } else {
          showToast("error", result.error || "Failed to load project", 3000)
          router.push("/software")
        }
      } catch (error) {
        console.error("Error loading project:", error)
        showToast("error", "An unexpected error occurred", 3000)
        router.push("/software")
      } finally {
        setIsLoading(false)
      }
    }

    if (isLoading) loadProject()
  }, [isLoading, projectId, router, showToast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.start_date || !formData.end_date) {
        showToast("error", "All fields are required", 3000)
        setIsSubmitting(false)
        return
      }

      // Validate dates
      const startDate = new Date(formData.start_date)
      const endDate = new Date(formData.end_date)

      if (endDate < startDate) {
        showToast("error", "End date cannot be earlier than start date", 3000)
        setIsSubmitting(false)
        return
      }

      // Create FormData object for the server action
      const formDataObj = new FormData()
      formDataObj.append("id", formData.id)
      formDataObj.append("name", formData.name)
      formDataObj.append("fromDate", formData.start_date)
      formDataObj.append("toDate", formData.end_date)

      const result = await updateProject(formDataObj)

      if (result.error) {
        showToast("error", result.error, 3000)
      } else {
        showToast("success", "Project updated successfully", 3000)
        router.push(`/software/project/${projectId}`)
      }
    } catch (error) {
      console.error("Error updating project:", error)
      showToast("error", "An unexpected error occurred", 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone and will delete all associated tasks.",
      )
    ) {
      return
    }

    setIsDeleting(true)

    try {
      const result = await deleteProject(projectId)

      if (result.error) {
        showToast("error", result.error, 3000)
      } else {
        showToast("success", "Project deleted successfully", 3000)
        router.push("/software")
      }
    } catch (error) {
      console.error("Error deleting project:", error)
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
    <Suspense fallback={<Loader />}>
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-2xl flex flex-col mx-auto my-8">
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
            <CardDescription>Update your project details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="gap-4 space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start date</Label>
                  <Input id="start_date" type="date" value={formData.start_date} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End date</Label>
                  <Input id="end_date" type="date" value={formData.end_date} onChange={handleChange} required />
                </div>
              </div>
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
                {isDeleting ? "Deleting..." : "Delete Project"}
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
    </Suspense>
  )
}
