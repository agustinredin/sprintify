import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Page() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kanban Board for project ACME</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Sprint Backlog</h3>
            <Badge variant="outline" className="text-accent-foreground bg-accent">
              12
            </Badge>
          </div>
          <div className="grid gap-4">
            <Card className="bg-muted/10 p-4">
              <CardContent>
                <h4 className="text-base font-medium">Implement new API endpoint</h4>
                <p className="text-sm text-muted-foreground">Create a new API endpoint to handle user registration.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">John Doe</span>
                  </div>
                  <Badge variant="outline" className="text-accent-foreground bg-accent">
                    3d
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/10 p-4">
              <CardContent>
                <h4 className="text-base font-medium">Refactor login flow</h4>
                <p className="text-sm text-muted-foreground">Improve the user experience of the login flow.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Sarah Miller</span>
                  </div>
                  <Badge variant="outline" className="text-accent-foreground bg-accent">
                    1w
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">To-do</h3>
            <Badge variant="outline" className="text-accent-foreground bg-accent">
              8
            </Badge>
          </div>
          <div className="grid gap-4">
            <Card className="p-4">
              <CardContent>
                <h4 className="text-base font-medium">Improve onboarding experience</h4>
                <p className="text-sm text-muted-foreground">Streamline the onboarding process for new users.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Emily Wilson</span>
                  </div>
                  <Badge variant="outline" className="text-accent-foreground bg-accent">
                    2d
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardContent>
                <h4 className="text-base font-medium">Implement team dashboard</h4>
                <p className="text-sm text-muted-foreground">Create a dashboard to track team progress and metrics.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Michael Johnson</span>
                  </div>
                  <Badge variant="outline" className="text-accent-foreground bg-accent">
                    5d
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">In Progress</h3>
            <Badge variant="outline" className="text-accent-foreground bg-accent">
              4
            </Badge>
          </div>
          <div className="grid gap-4">
            <Card className="p-4">
              <CardContent>
                <h4 className="text-base font-medium">Integrate with Slack</h4>
                <p className="text-sm text-muted-foreground">Add Slack integration to enable team collaboration.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">John Doe</span>
                  </div>
                  <Badge variant="outline" className="text-accent-foreground bg-accent">
                    1w
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardContent>
                <h4 className="text-base font-medium">Implement user analytics</h4>
                <p className="text-sm text-muted-foreground">Build a user analytics dashboard to track key metrics.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Sarah Miller</span>
                  </div>
                  <Badge variant="outline" className="text-accent-foreground bg-accent">
                    3d
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Done</h3>
            <Badge variant="outline" className="text-accent-foreground bg-accent">
              15
            </Badge>
          </div>
          <div className="grid gap-4">
            <Card className="p-4">
              <CardContent>
                <h4 className="text-base font-medium">Implement new pricing page</h4>
                <p className="text-sm text-muted-foreground">Design and build a new pricing page for the website.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Emily Wilson</span>
                  </div>
                  <Badge variant="outline" className="text-accent-foreground bg-accent">
                    2w
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardContent>
                <h4 className="text-base font-medium">Optimize database queries</h4>
                <p className="text-sm text-muted-foreground">Improve the performance of database queries.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Michael Johnson</span>
                  </div>
                  <Badge variant="outline" className="text-accent-foreground bg-accent">
                    1w
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}