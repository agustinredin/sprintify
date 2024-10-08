/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/RJtaVSU2T4L
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileTextIcon, PlusIcon, TagIcon, XIcon, ZapIcon } from "@/components/ui/icons"

export default function Component() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>New Backlog Item</CardTitle>
        <CardDescription>Add a new item to your product backlog.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="id">ID</Label>
            <Input id="id" disabled placeholder="Automatically assigned" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter a name for the item" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Provide a description">
            
          </Textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <div>
                  <ZapIcon className="h-4 w-4" />
                </div>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select>
              <SelectTrigger>
                <div>
                  <TagIcon className="h-4 w-4" />
                </div>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="feature">Feature</SelectItem>
                <SelectItem value="improvement">Improvement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hours">Estimated Hours</Label>
          <Input id="hours" type="number" placeholder="Enter estimated hours" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <XIcon className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button type="submit">
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Backlog Item
        </Button>
      </CardFooter>
    </Card>
  )
}

