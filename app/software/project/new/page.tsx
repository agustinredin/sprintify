"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button, SubmitButton } from "@/components/ui/button"
import { Suspense } from "react"
import Loader from "@/components/ui/loader"
import { useFormState } from "react-dom"
import { createProject } from "@/app/actions/projectActions"
import { useToast } from "@/components/context/ToastContext"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"

export default function Component() {
  const { showToast } = useToast()
  const router = useRouter()

  const [, createProjectDispatch] = useFormState(createProjectAction, null)

  async function createProjectAction(prevState: unknown, formData: FormData): Promise<void> {
    const result = await createProject(formData)
    if (result.error) {
      showToast("error", result.error, 5000)
      return
    }
    if (result.response && typeof result.response === "object" && "id" in result.response) {
      router.replace(`/software/project/${result.response.id}`)
      showToast("success", "Project created.", 3000)
    } else {
      router.replace("/software")
      showToast("success", "Project created.", 3000)
    }
    return
  }

  return (
    <Suspense fallback={<Loader />}>
      <form action={createProjectDispatch}>
        <Card className="w-full max-w-2xl flex flex-col mx-auto my-8">
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
            <CardDescription>Set up a new project on Sprintify.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="gap-4 space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" name="name" placeholder="Enter project name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromDate">Start date</Label>
                  <Calendar id="fromDate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toDate">End date</Label>
                  <Calendar id="toDate" />
                </div>
              </div>
              {/* <div className='gap-4 space-y-2'>
                <Label htmlFor='members'>Project Members</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='flex w-full justify-start font-normal'>
                      Select Team Member
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-[38rem] bg-background rounded-lg shadow-lg'>
                    <DropdownMenuLabel className='px-4 py-2 text-sm font-medium text-muted-foreground'>
                      Team Members
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground'>
                      John Doe
                    </DropdownMenuItem>
                    <DropdownMenuItem className='px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground'>
                      Jane Smith
                    </DropdownMenuItem>
                    <DropdownMenuItem className='px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground'>
                      Bob Johnson
                    </DropdownMenuItem>
                    <DropdownMenuItem className='px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground'>
                      Sarah Lee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <SubmitButton text="Create project" />
          </CardFooter>
        </Card>
      </form>
    </Suspense>
  )
}

