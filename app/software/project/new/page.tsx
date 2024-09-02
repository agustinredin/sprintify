import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlusIcon, UsersIcon, CalendarDaysIcon } from "@/components/ui/icons";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default async function Component() {

    await new Promise((re, rej) => setTimeout(() => re(true), 5000))

  return (
    <Card className="w-full max-w-2xl flex flex-col mx-auto my-8">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>
          Set up a new project for your Scrum team on Sprintify.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="gap-4 space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" placeholder="Enter project name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="end-date">Estimated End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    <CalendarDaysIcon className="mr-2 h-4 w-4" />
                    <span>Select end date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Estimated Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal">
                    <CalendarDaysIcon className="mr-2 h-4 w-4" />
                    <span>Select start date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="gap-4 space-y-2">
            <Label htmlFor="members">Project Members</Label>
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-accent flex w-full justify-start font-normal">
              Select Team Member
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-background rounded-lg shadow-lg">
            <DropdownMenuLabel className="px-4 py-2 text-sm font-medium text-muted-foreground">
              Team Members
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
              John Doe
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
              Jane Smith
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
              Bob Johnson
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
              Sarah Lee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Create Project</Button>
      </CardFooter>
    </Card>
  );
}
