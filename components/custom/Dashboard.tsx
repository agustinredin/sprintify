import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InboxIcon, TimerIcon, FlagIcon, CheckIcon } from "@/components/ui/icons"
import { PlusCircle } from "lucide-react"
import type { IProject, ITask } from "@/app/lib/interfaces"
import Link from "next/link"

interface DashboardProps {
  project: IProject
  tasks: ITask[]
}

export default function Dashboard({ project, tasks }: DashboardProps) {
  // Calculate task counts by status
  const taskCounts = {
    backlog: tasks.filter((task) => task.status === "backlog").length,
    todo: tasks.filter((task) => task.status === "todo").length,
    inprogress: tasks.filter((task) => task.status === "inprogress").length,
    done: tasks.filter((task) => task.status === "done").length,
  }

  // Format dates for display
  const startDate = new Date(project.start_date).toLocaleDateString()
  const endDate = new Date(project.end_date).toLocaleDateString()

  // Calculate project progress
  const totalTasks = tasks.length
  const completedTasks = taskCounts.done
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Group tasks by status for Kanban display
  const backlogTasks = tasks.filter((task) => task.status === "backlog").slice(0, 2)
  const todoTasks = tasks.filter((task) => task.status === "todo").slice(0, 2)
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress").slice(0, 2)
  const doneTasks = tasks.filter((task) => task.status === "done").slice(0, 2)

  return (
    <section className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>
                {startDate} - {endDate}
              </CardDescription>
            </div>
            <Link href={`/project/${project.id}/tasks/new`}>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>Progress</div>
                <div>{progressPercentage}%</div>
              </div>
              <div className="h-2 w-full bg-muted rounded-full">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Key metrics for your Scrum project.</CardDescription>
            <div className="ml-auto text-sm text-muted-foreground">{totalTasks > 0 ? "100%" : "0%"} of total tasks</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
                <InboxIcon className="h-6 w-6 text-muted-foreground" />
                <div className="text-2xl font-bold">{taskCounts.backlog}</div>
                <div className="text-sm text-muted-foreground">Backlog</div>
              </div>
              <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
                <TimerIcon className="h-6 w-6 text-muted-foreground" />
                <div className="text-2xl font-bold">{taskCounts.todo}</div>
                <div className="text-sm text-muted-foreground">To Do</div>
              </div>
              <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
                <FlagIcon className="h-6 w-6 text-muted-foreground" />
                <div className="text-2xl font-bold">{taskCounts.inprogress}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
                <CheckIcon className="h-6 w-6 text-muted-foreground" />
                <div className="text-2xl font-bold">{taskCounts.done}</div>
                <div className="text-sm text-muted-foreground">Done</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kanban Board</CardTitle>
            <CardDescription>Manage your project tasks with the Kanban board.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2 py-4 md:py-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Backlog</div>
                  <Badge variant="secondary" className="text-xs">
                    {taskCounts.backlog}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  {backlogTasks.length > 0 ? (
                    backlogTasks.map((task) => (
                      <Card key={task.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{task.name}</div>
                          <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">{task.estimated_hours} hours</div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground p-4 text-center">No tasks in backlog</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 py-4 md:py-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">To Do</div>
                  <Badge variant="secondary" className="text-xs">
                    {taskCounts.todo}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  {todoTasks.length > 0 ? (
                    todoTasks.map((task) => (
                      <Card key={task.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{task.name}</div>
                          <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">{task.estimated_hours} hours</div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground p-4 text-center">No tasks to do</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 py-4 md:py-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">In Progress</div>
                  <Badge variant="secondary" className="text-xs">
                    {taskCounts.inprogress}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  {inProgressTasks.length > 0 ? (
                    inProgressTasks.map((task) => (
                      <Card key={task.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{task.name}</div>
                          <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">{task.estimated_hours} hours</div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground p-4 text-center">No tasks in progress</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 py-4 md:py-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Done</div>
                  <Badge variant="secondary" className="text-xs">
                    {taskCounts.done}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  {doneTasks.length > 0 ? (
                    doneTasks.map((task) => (
                      <Card key={task.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{task.name}</div>
                          <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">{task.estimated_hours} hours</div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground p-4 text-center">No completed tasks</div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link href={`/project/${project.id}/tasks`}>
                <Button variant="outline">View All Tasks</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:col-span-1 gap-4 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Project Name</div>
                <div>{project.name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Start Date</div>
                <div>{startDate}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">End Date</div>
                <div>{endDate}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Tasks</div>
                <div>{totalTasks}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Completion</div>
                <div>{progressPercentage}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Tasks by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(taskCounts).map(([status, count]) => (
                <div key={status} className="flex items-center space-x-4">
                  <div className="w-24 capitalize">{status}</div>
                  <div className="flex-1">
                    <div className="h-2 w-full bg-muted rounded-full">
                      <div
                        className={`h-2 rounded-full ${getStatusColor(status)}`}
                        style={{ width: totalTasks > 0 ? `${(count / totalTasks) * 100}%` : "0%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm">{count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href={`/project/${project.id}/tasks/new`}>
                <Button className="w-full justify-start" variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </Link>
              <Link href={`/project/${project.id}/edit`}>
                <Button className="w-full justify-start" variant="outline">
                  Edit Project Details
                </Button>
              </Link>
              <Link href={`/project/${project.id}/sprints`}>
                <Button className="w-full justify-start" variant="outline">
                  Manage Sprints
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Helper functions
function getPriorityVariant(priority: string): "default" | "destructive" | "outline" {
  switch (priority?.toLowerCase()) {
    case "high":
      return "destructive"
    case "medium":
      return "default"
    default:
      return "outline"
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "backlog":
      return "bg-gray-500"
    case "todo":
      return "bg-blue-500"
    case "inprogress":
      return "bg-yellow-500"
    case "done":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

