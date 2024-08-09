import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {InboxIcon, TimerIcon, FlagIcon, CheckIcon } from '@/components/icons'

export default function Page() {
  return (
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Key metrics for your Scrum project.</CardDescription>
                <div className="ml-auto text-sm text-muted-foreground">100% of total tasks</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
                    <InboxIcon className="h-6 w-6 text-muted-foreground" />
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Backlog</div>
                  </div>
                  <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
                    <TimerIcon className="h-6 w-6 text-muted-foreground" />
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">To Do</div>
                  </div>
                  <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
                    <FlagIcon className="h-6 w-6 text-muted-foreground" />
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
                    <CheckIcon className="h-6 w-6 text-muted-foreground" />
                    <div className="text-2xl font-bold">18</div>
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
                        12
                      </Badge>
                    </div>
                    <div className="grid gap-2">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Implement new feature</div>
                          {/* <Avatar size="sm"> */}
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">Backlog</div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Fix bug in login flow</div>
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">Backlog</div>
                      </Card>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4 md:py-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">To Do</div>
                      <Badge variant="secondary" className="text-xs">
                        8
                      </Badge>
                    </div>
                    <div className="grid gap-2">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Refactor API calls</div>
                          {/* <Avatar size="sm"> */}
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                            <AvatarFallback>LJ</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">To Do</div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Update design system</div>
                          {/* <Avatar size="sm"> */}
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                            <AvatarFallback>ES</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">To Do</div>
                      </Card>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4 md:py-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">In Progress</div>
                      <Badge variant="secondary" className="text-xs">
                        5
                      </Badge>
                    </div>
                    <div className="grid gap-2">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Implement new dashboard</div>
                          {/* <Avatar size="sm"> */}
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                            <AvatarFallback>OW</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">In Progress</div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Optimize performance</div>
                          {/* <Avatar size="sm"> */}
                            <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                            <AvatarFallback>NW</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">In Progress</div>
                      </Card>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4 md:py-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Done</div>
                      <Badge variant="secondary" className="text-xs">
                        18
                      </Badge>
                    </div>
                    <div className="grid gap-2">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Implement new feature</div>
                          {/* <Avatar size="sm" /> */}
                          <Avatar/>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline">View All</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Key performance metrics for your project.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <LinechartChart className="aspect-[4/3]" /> */}
              </CardContent>
            </Card>
            <Card className="my-4">
              <CardHeader>
                <CardTitle>Latest User Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
  )
}



