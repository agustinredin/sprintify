/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ycgdxVLhTFD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {FilePenIcon} from "@/components/icons"

export default function Page() {
  return (
    <div className="grid gap-6 p-6 md:p-10 md:grid-cols-2">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Scrum Master</CardTitle>
          <CardDescription>
            Responsible for leading the team and ensuring the Scrum process is followed.
          </CardDescription>
          <div className="ml-auto">
            <Button variant="outline" size="icon" className="mr-2">
              <FilePenIcon className="w-4 h-4" />
              <span className="sr-only">Edit Scrum Master</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Scrum Master" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-primary-foreground/80">jdoe@sprintify.com</p>
                <Button variant="outline" size="icon" className="mt-2">
                  <FilePenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit Scrum Master</span>
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">Ongoing Tasks</p>
                <Badge variant="secondary">5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Completed Tasks</p>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Blocked Tasks</p>
                <Badge variant="outline">2</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>QA Team</CardTitle>
          <CardDescription>Responsible for testing and ensuring the quality of the application.</CardDescription>
          <div className="ml-auto">
            <Button variant="outline" size="icon" className="mr-2">
              <FilePenIcon className="w-4 h-4" />
              <span className="sr-only">Edit QA Team</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="QA Engineer" />
                <AvatarFallback>QA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-muted-foreground">jsmith@sprintify.com</p>
                <Button variant="outline" size="icon" className="mt-2">
                  <FilePenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit Jane Smith</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="QA Engineer" />
                <AvatarFallback>QA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Michael Johnson</p>
                <p className="text-sm text-muted-foreground">mjohnson@sprintify.com</p>
                <Button variant="outline" size="icon" className="mt-2">
                  <FilePenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit Michael Johnson</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="QA Engineer" />
                <AvatarFallback>QA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Emily Davis</p>
                <p className="text-sm text-muted-foreground">edavis@sprintify.com</p>
                <Button variant="outline" size="icon" className="mt-2">
                  <FilePenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit Emily Davis</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Development Team</CardTitle>
          <CardDescription>Responsible for the development and implementation of the application.</CardDescription>
          <div className="ml-auto">
            <Button variant="outline" size="icon" className="mr-2">
              <FilePenIcon className="w-4 h-4" />
              <span className="sr-only">Edit Development Team</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Development Engineer" />
                <AvatarFallback>DE</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">David Lee</p>
                <p className="text-sm text-muted-foreground">dlee@sprintify.com</p>
                <Button variant="outline" size="icon" className="mt-2">
                  <FilePenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit David Lee</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Development Engineer" />
                <AvatarFallback>DE</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">schen@sprintify.com</p>
                <Button variant="outline" size="icon" className="mt-2">
                  <FilePenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit Sarah Chen</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Development Engineer" />
                <AvatarFallback>DE</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Alex Nguyen</p>
                <p className="text-sm text-muted-foreground">anguyen@sprintify.com</p>
                <Button variant="outline" size="icon" className="mt-2">
                  <FilePenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit Alex Nguyen</span>
                  <Badge variant="outline" className="bg-green-500 text-white">
                    Active
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-500 text-white">
                    Pending
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

