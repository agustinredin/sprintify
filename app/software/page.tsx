import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BarChart, Users, Clock, CheckSquare } from "lucide-react"
import Link from "next/link"
import Tooltip from "@/components/ui/tooltip"
import { sleep } from "../lib/utils"
import { fetchUserProjects } from "../actions/projectActions"
import { getUserSession } from "../actions/userActions"
import { useToast } from "@/components/context/ToastContext"
import { IProject } from "../lib/interfaces"

//TODO:
//2: hacer este dir dinamico con 2 tipos de card: INIT vs ONGOING
//(ongoing es la que ya está, INIT es cuando apenas lo creas)
//3: Hacer vista de tareas simple (kanban?) en vez de dashboard

export default async function Component() {
  // const { showToast } = useToast()
  const user = await getUserSession()
  let projects
  if (user) projects = await fetchUserProjects(user.id)

  // if (projects?.error)
  //   showToast("error", "Error fetching projects. Refresh or try again later.", 5000)

  return (
    <section className='py-2'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-3xl font-bold'>Agustin Redin&apos;s projects</h2>
        <Link href='/software/project/new'>
          <Button>Add New</Button>
        </Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects?.code == "success" &&
          projects?.response?.map((item) => (
            <div key={item.id}>
              <ProjectCard project={item} />
            </div>
          ))}
      </div>
    </section>
  )
}

const ProjectCard = ({ project }: { project: IProject }) => {
  let isNew = false // project.tasks == 0

  return isNew ? (
    <Tooltip content='Go to dashboard' className='bg-primary' sideOffset={10} side='bottom'>
      <Link href={`/software/project/${project.id}`}>
        <Card className='w-full max-w-3xl h-96'>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
            {project.name}
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground">
            </CardDescription>
            </CardHeader>
        </Card>
      </Link>
    </Tooltip>
  ) : (
    <Tooltip content='Go to project dashboard' className='bg-secondary' sideOffset={12} side='bottom'>
      <Link href='/software/project/1'>
        <Card className='w-full max-w-3xl'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>Scrum Management App</CardTitle>
            <CardDescription>Project overview and key metrics</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-6'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-1'>
                <span className='text-sm font-medium'>Project Progress</span>
                <span className='text-2xl font-bold'>68%</span>
              </div>
              <Progress value={58} className='text-green-500 w-1/2 mt-4' />
            </div>

            <div>
              <h3 className='mb-2 text-sm font-medium'>Team Members</h3>
              <div className='flex -space-x-2'>
                <Avatar className='border-2 border-background'>
                  <AvatarImage src='/placeholder.svg?height=32&width=32' alt='Team member' />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <Avatar className='border-2 border-background'>
                  <AvatarImage src='/placeholder.svg?height=32&width=32' alt='Team member' />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <Avatar className='border-2 border-background'>
                  <AvatarImage src='/placeholder.svg?height=32&width=32' alt='Team member' />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <Avatar className='border-2 border-background'>
                  <AvatarImage src='/placeholder.svg?height=32&width=32' alt='Team member' />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <Avatar className='border-2 border-background'>
                  <AvatarFallback>+3</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 text-muted-foreground' />
                <div className='space-y-1'>
                  <p className='text-sm font-medium leading-none'>Time Remaining</p>
                  <p className='text-sm text-muted-foreground'>2 weeks</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <CheckSquare className='h-4 w-4 text-muted-foreground' />
                <div className='space-y-1'>
                  <p className='text-sm font-medium leading-none'>Completed Tasks</p>
                  <p className='text-sm text-muted-foreground'>78 / 120</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Tooltip>
  )
}
