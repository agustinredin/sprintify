import { notFound } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { getProjectById } from "@/app/actions/projectActions"
import { getTasksByProjectId } from "@/app/actions/taskActions"
import type { ITask } from "@/app/lib/interfaces"

interface KanbanBoardPageProps {
  params: {
    projectId: string
  }
}

export default async function KanbanBoardPage({ params }: KanbanBoardPageProps) {
  const projectId = params.projectId

  // Fetch project data
  const projectResult = await getProjectById(projectId)

  if (!projectResult.response || projectResult.code === "error") {
    notFound()
  }

  const project = projectResult.response

  // Fetch all tasks for this project
  const tasksResult = await getTasksByProjectId(projectId)
  const tasks = tasksResult.response || []

  // Group tasks by status
  const backlogTasks = tasks.filter((task) => task.status === "backlog")
  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress")
  const doneTasks = tasks.filter((task) => task.status === "done")

  // Calculate task counts
  const taskCounts = {
    backlog: backlogTasks.length,
    todo: todoTasks.length,
    inprogress: inProgressTasks.length,
    done: doneTasks.length,
    total: tasks.length,
  }

  // Format dates for display
  const startDate = new Date(project.start_date).toLocaleDateString()
  const endDate = new Date(project.end_date).toLocaleDateString()

  return (
    <Suspense fallback={<Loader />}>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-muted-foreground">
                {startDate} - {endDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/software/project/${projectId}/tasks/new`}>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </Link>
              <Link href={`/software/project/${projectId}`}>
                <Button variant="outline">Back to Project</Button>
              </Link>
            </div>
          </div>

          {/* Project Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Task Overview</CardTitle>
              <CardDescription>Current status of all tasks in this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <span className="text-2xl font-bold">{taskCounts.total}</span>
                  <span className="text-sm text-muted-foreground">Total Tasks</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <span className="text-2xl font-bold">{taskCounts.backlog}</span>
                  <span className="text-sm text-muted-foreground">Backlog</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <span className="text-2xl font-bold">{taskCounts.todo}</span>
                  <span className="text-sm text-muted-foreground">To Do</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <span className="text-2xl font-bold">{taskCounts.inprogress}</span>
                  <span className="text-sm text-muted-foreground">In Progress</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <span className="text-2xl font-bold">{taskCounts.done}</span>
                  <span className="text-sm text-muted-foreground">Done</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kanban Board */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Kanban Board</CardTitle>
              <CardDescription>Drag and drop tasks to update their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Backlog Column */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-muted p-3 rounded-md sticky top-0">
                    <div className="text-sm font-medium">Backlog</div>
                    <Badge variant="secondary" className="text-xs">
                      {taskCounts.backlog}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-3 min-h-[50vh] max-h-[70vh] overflow-y-auto pb-4 pr-1">
                    {backlogTasks.length > 0 ? (
                      backlogTasks.map((task) => <TaskCard key={task.id} task={task} projectId={projectId} />)
                    ) : (
                      <div className="text-sm text-muted-foreground p-4 text-center bg-muted/50 rounded-md">
                        No tasks in backlog
                      </div>
                    )}
                  </div>
                </div>

                {/* To Do Column */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-muted p-3 rounded-md sticky top-0">
                    <div className="text-sm font-medium">To Do</div>
                    <Badge variant="secondary" className="text-xs">
                      {taskCounts.todo}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-3 min-h-[50vh] max-h-[70vh] overflow-y-auto pb-4 pr-1">
                    {todoTasks.length > 0 ? (
                      todoTasks.map((task) => <TaskCard key={task.id} task={task} projectId={projectId} />)
                    ) : (
                      <div className="text-sm text-muted-foreground p-4 text-center bg-muted/50 rounded-md">
                        No tasks to do
                      </div>
                    )}
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-muted p-3 rounded-md sticky top-0">
                    <div className="text-sm font-medium">In Progress</div>
                    <Badge variant="secondary" className="text-xs">
                      {taskCounts.inprogress}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-3 min-h-[50vh] max-h-[70vh] overflow-y-auto pb-4 pr-1">
                    {inProgressTasks.length > 0 ? (
                      inProgressTasks.map((task) => <TaskCard key={task.id} task={task} projectId={projectId} />)
                    ) : (
                      <div className="text-sm text-muted-foreground p-4 text-center bg-muted/50 rounded-md">
                        No tasks in progress
                      </div>
                    )}
                  </div>
                </div>

                {/* Done Column */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-muted p-3 rounded-md sticky top-0">
                    <div className="text-sm font-medium">Done</div>
                    <Badge variant="secondary" className="text-xs">
                      {taskCounts.done}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-3 min-h-[50vh] max-h-[70vh] overflow-y-auto pb-4 pr-1">
                    {doneTasks.length > 0 ? (
                      doneTasks.map((task) => <TaskCard key={task.id} task={task} projectId={projectId} />)
                    ) : (
                      <div className="text-sm text-muted-foreground p-4 text-center bg-muted/50 rounded-md">
                        No completed tasks
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  )
}

interface TaskCardProps {
  task: ITask
  projectId: string
}

function TaskCard({ task, projectId }: TaskCardProps) {
  return (
    <Link href={`/software/project/${projectId}/tasks/${task.id}/edit`}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{task.name}</div>
          <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
        </div>
        {task.description && <div className="mt-2 text-xs text-muted-foreground line-clamp-2">{task.description}</div>}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {task.estimated_hours ? `${task.estimated_hours} hours` : "No estimate"}
          </div>
          {task.type && (
            <Badge variant="outline" className="text-xs">
              {task.type}
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  )
}

// Helper function to determine badge variant based on priority
function getPriorityVariant(priority: string | null): "default" | "destructive" | "outline" {
  switch (priority?.toLowerCase()) {
    case "high":
      return "destructive"
    case "medium":
      return "default"
    default:
      return "outline"
  }
}
