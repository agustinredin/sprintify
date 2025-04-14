import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckSquare, PlusCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { fetchUserProjects } from "../actions/projectActions"
import { getUserSession } from "../actions/userActions"
import { getProjectTaskCounts, getTasksByProjectId } from "../actions/taskActions"
import type { IProject } from "../lib/interfaces"
import { Suspense } from "react"
import Loader from "@/components/ui/loader"

export default async function Component() {
  const user = await getUserSession()

  if (!user) {
    return (
      <section className='py-2'>
        <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
          <h2 className='text-3xl font-bold mb-4'>Sign in to view your projects</h2>
          <p className='text-muted-foreground mb-8'>You need to be signed in to view and manage your projects.</p>
          <Link href='/signup'>
            <Button>Sign In</Button>
          </Link>
        </div>
      </section>
    )
  }

  const projectsResult = await fetchUserProjects(user.id)
  const projects =
    projectsResult.code === "success" && Array.isArray(projectsResult.response) ? projectsResult.response : []

  // Get task counts for all projects
  const projectsWithTaskCounts = await Promise.all(
    projects.map(async (project) => {
      const taskCountsResult = await getProjectTaskCounts(project.id)
      // Ensure taskCount is always a number
      const taskCount =
        taskCountsResult.code === "success" && typeof taskCountsResult.response === "number"
          ? taskCountsResult.response
          : 0

      return {
        ...project,
        taskCount,
      }
    }),
  )

  return (
    <Suspense fallback={<Loader />}>
      <section className='py-2'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold'>{user.name}&apos;s projects</h2>
          <Link href='/software/project/new'>
            <Button>Add New Project</Button>
          </Link>
        </div>

        {projectsWithTaskCounts.length === 0 ? (
          <div className='flex flex-col items-center justify-center min-h-[40vh] text-center px-4'>
            <h3 className='text-xl font-medium mb-4'>No projects yet</h3>
            <p className='text-muted-foreground mb-6'>Create your first project to get started</p>
            <Link href='/software/project/new'>
              <Button>
                <PlusCircle className='mr-2 h-4 w-4' />
                Create Project
              </Button>
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projectsWithTaskCounts.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </Suspense>
  )
}

interface ProjectCardProps {
  project: IProject & { taskCount: number }
}

const ProjectCard = async ({ project }: ProjectCardProps) => {
  const isNew = project.taskCount === 0
  const tasksData = await getTasksByProjectId(project.id)

  // Calculate dates and time remaining
  const startDate = new Date(project.start_date)
  const endDate = new Date(project.end_date)
  const today = new Date()

  // Calculate project duration and days remaining
  const totalDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // Calculate progress percentage based on time
  const daysElapsed = Math.min(
    totalDuration,
    Math.max(0, Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))),
  )
  const progressPercentage = (() => {
    let tasks = tasksData.response
      if (!tasks || tasks.length === 0) {
        return 0; // No tasks means 0% progress
      }
      
      const completedTasks = tasks.filter(task => task.status === 'done').length;
      const totalTasks = tasks.length;
      
      return Math.round((completedTasks / totalTasks) * 100);
    })()

  // Format dates for display
  const formattedStartDate = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  const formattedEndDate = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  // Format time remaining
  let timeRemaining = ""
  if (daysRemaining === 0) {
    timeRemaining = "Due today"
  } else if (daysRemaining < 0) {
    // Handle overdue projects
    const overdueDays = Math.abs(daysRemaining)
    timeRemaining = `${overdueDays} day${overdueDays !== 1 ? "s" : ""} overdue`
  } else if (daysRemaining < 7) {
    timeRemaining = `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""}`
  } else if (daysRemaining < 30) {
    const weeks = Math.ceil(daysRemaining / 7)
    timeRemaining = `${weeks} week${weeks !== 1 ? "s" : ""}`
  } else {
    const months = Math.ceil(daysRemaining / 30)
    timeRemaining = `${months} month${months !== 1 ? "s" : ""}`
  }

  return isNew ? (
    <Link href={`/software/project/${project.id}`}>
      <Card className='w-full h-full border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{project.name}</CardTitle>
          <CardDescription>
            {formattedStartDate} - {formattedEndDate}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center py-8'>
          <div className='rounded-full bg-primary/10 p-6 mb-4'>
            <PlusCircle className='h-12 w-12 text-primary' />
          </div>
          <h3 className='text-xl font-medium mb-2'>Get Started</h3>
          <p className='text-center text-muted-foreground'>Add your first task to begin tracking your project</p>
        </CardContent>
        <CardFooter className='justify-center'>
          <Button variant='outline'>Set Up Project</Button>
        </CardFooter>
      </Card>
    </Link>
  ) : (
    <Link href={`/software/project/${project.id}`}>
      <Card className='w-full h-full hover:shadow-md transition-shadow flex flex-col'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{project.name}</CardTitle>
          <CardDescription>
            {formattedStartDate} - {formattedEndDate}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-6 flex-grow'>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-medium'>Project Progress</span>
              <span className='text-2xl font-bold'>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className='w-1/2 mt-4' />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-muted-foreground' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>Time Remaining</p>
                <p className='text-sm text-muted-foreground'>{timeRemaining}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <CheckSquare className='h-4 w-4 text-muted-foreground' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>Tasks</p>
                <p className='text-sm text-muted-foreground'>{project.taskCount} total</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button variant='outline' className='w-full'>
              View Project
            </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
