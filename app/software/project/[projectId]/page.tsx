import { notFound } from "next/navigation"
import { Suspense } from "react"
import Loader from "@/components/ui/loader"
import { getProjectById } from "@/app/actions/projectActions"
import Dashboard from "@/components/custom/Dashboard"
import { getTasksByProjectId } from "@/app/actions/taskActions"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projectId = params.projectId
  // Fetch project data
  const projectResult = await getProjectById(projectId)
  if (!projectResult.response || projectResult.code === "error") {
    notFound()
  }

  const project = projectResult.response

  // Fetch tasks for this project
  const tasksResult = await getTasksByProjectId(projectId)
  const tasks = tasksResult.response || []

  return (
    <Suspense fallback={<Loader />}>
      <Dashboard project={project} tasks={tasks} />
    </Suspense>
  )
}

