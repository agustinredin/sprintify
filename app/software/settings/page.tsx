import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { XIcon, CircleCheckIcon } from '@/components/ui/icons'

export default function Page() {
  return (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Security</h2>
        <div className="flex items-center p-4 bg-green-100 border border-green-200 rounded-md shadow-md">
          <CircleCheckIcon className="w-6 h-6 text-green-600" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-green-800">You have successfully logged out everyone</h3>
            <p className="text-sm text-green-700">Since now, everyone will need to log in again to their account.</p>
          </div>
          <Button variant="ghost" className="ml-auto">
            <XIcon className="w-6 h-6 text-green-600" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white border rounded-md shadow-md">
          <div>
            <h3 className="text-lg font-medium">Enforce two-step verification</h3>
            <p className="text-sm text-muted-foreground">Require a security key or code in addition to password.</p>
          </div>
          <Switch id="two-step-verification" defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4 bg-white border rounded-md shadow-md">
          <div>
            <h3 className="text-lg font-medium">Logout everyone</h3>
            <p className="text-sm text-muted-foreground">This will require everyone to log in to the system.</p>
          </div>
          <Button variant="outline">Logout everyone</Button>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Current sessions</h3>
        <p className="text-sm text-muted-foreground">These devices are currently signed in to people&apos;s accounts.</p>
        <div className="flex space-x-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All people" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All people</SelectItem>
              <SelectItem value="admins">Admins</SelectItem>
              <SelectItem value="users">Users</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All browsers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All browsers</SelectItem>
              <SelectItem value="chrome">Chrome</SelectItem>
              <SelectItem value="firefox">Firefox</SelectItem>
              <SelectItem value="safari">Safari</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card className="mt-4 shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Most recent activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Olivia Rhye" />
                    <AvatarFallback>OR</AvatarFallback>
                  </Avatar>
                  <span>Olivia Rhye</span>
                </TableCell>
                <TableCell>Chrome on Mac OS X</TableCell>
                <TableCell>United Kingdom</TableCell>
                <TableCell>Current session</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Lana Steiner" />
                    <AvatarFallback>LS</AvatarFallback>
                  </Avatar>
                  <span>Lana Steiner</span>
                </TableCell>
                <TableCell>Chrome on Windows 7</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>Current session</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Candice Wu" />
                    <AvatarFallback>CW</AvatarFallback>
                  </Avatar>
                  <span>Candice Wu</span>
                </TableCell>
                <TableCell>Chrome on Windows 10</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>Yesterday, 11:21 am</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Drew Cano" />
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                  <span>Drew Cano</span>
                </TableCell>
                <TableCell>Chrome on Mac OS X</TableCell>
                <TableCell>Poland</TableCell>
                <TableCell>Current session</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Kate Morrison" />
                    <AvatarFallback>KM</AvatarFallback>
                  </Avatar>
                  <span>Kate Morrison</span>
                </TableCell>
                <TableCell>Chrome on iOS 14</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>Week ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Orlando Diggs" />
                    <AvatarFallback>OD</AvatarFallback>
                  </Avatar>
                  <span>Orlando Diggs</span>
                </TableCell>
                <TableCell>Chrome on iOS 14</TableCell>
                <TableCell>France</TableCell>
                <TableCell>Week ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Olivia Rhye" />
                    <AvatarFallback>OR</AvatarFallback>
                  </Avatar>
                  <span>Olivia Rhye</span>
                </TableCell>
                <TableCell>Chrome on Mac OS X</TableCell>
                <TableCell>United Kingdom</TableCell>
                <TableCell>Current session</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Lana Steiner" />
                    <AvatarFallback>LS</AvatarFallback>
                  </Avatar>
                  <span>Lana Steiner</span>
                </TableCell>
                <TableCell>Chrome on Windows 7</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>Week ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}



