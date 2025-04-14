"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/context/ToastContext"
import Loader from "@/components/ui/loader"
import { getProjectById } from "@/app/actions/projectActions"
import { getTasksByProjectId } from "@/app/actions/taskActions"
import { finishProject } from "@/app/actions/projectActions"

export default function FinishProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()
  const projectId = params.projectId as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [project, setProject] = useState<any>({
    id: '',
    name: '',
    start_date: '',
    end_date: '',
    user_id: '',
    status:'',
    completed_date: ''
})
  const [tasks, setTasks] = useState<any[]>([])
  const [canFinish, setCanFinish] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch project data
        const projectResult = await getProjectById(projectId)
        if (projectResult.code !== "success" || !projectResult.response) {
          console.log(projectResult)
          showToast("error", "Failed to load project", 3000)
          router.push("/software")
          return
        }

        // Fetch tasks
        const tasksResult = await getTasksByProjectId(projectId)
        const projectTasks = tasksResult.response || []

        setProject(projectResult.response)
        setTasks(projectTasks)

        // Check if all tasks are completed
        const allTasksCompleted = projectTasks.length > 0 && projectTasks.every((task) => task.status === "done")

        setCanFinish(allTasksCompleted)
      } catch (error) {
        console.error("Error loading data:", error)
        showToast("error", "An unexpected error occurred", 3000)
        router.push("/software")
      } finally {
        setIsLoading(false)
      }
    }

    if(isLoading) loadData()
  })

  const handleFinishProject = async () => {
    if (!canFinish) {
      showToast("error", "Cannot finish project. Some tasks are not completed.", 3000)
      return
    }

    setIsSubmitting(true)
    try {
      const result = await finishProject(projectId)

      if (result.code === "error") {
        showToast("error", result.error || "Failed to finish project", 3000)
      } else {
        showToast("success", "Project successfully completed!", 3000)
        router.push("/software")
      }
    } catch (error) {
      console.error("Error finishing project:", error)
      showToast("error", "An unexpected error occurred", 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Finish Project</CardTitle>
          <CardDescription>Complete your project and archive it</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-muted-foreground">Started: {new Date(project.start_date).toLocaleDateString()}</p>
            <p className="text-muted-foreground">Ended: {new Date(project.end_date).toLocaleDateString()}</p>
            <p className="mt-2">
              Total Tasks: {tasks.length} | Completed: {tasks.filter((t) => t.status === "done").length}
            </p>
          </div>

          {canFinish ? (
            <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              <p>All tasks are completed. You can now finish this project.</p>
            </div>
          ) : (
            <div className="flex items-center p-4 bg-amber-50 text-amber-700 rounded-lg">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p>You need to complete all tasks before finishing this project.</p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium">What happens when you finish a project?</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>The project will be marked as completed</li>
              <li>It will be moved to your archive</li>
              <li>You can still view the project but cannot modify it</li>
              <li>You can use it as a template for future projects</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button
            onClick={handleFinishProject}
            disabled={!canFinish || isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Processing..." : "Finish Project"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
