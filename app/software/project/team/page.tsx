'use client'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react"
import { getUserById } from '@/app/actions/userActions'

export default function Component() {
  const [sortColumn, setSortColumn] = useState('clientName')
  const [sortDirection, setSortDirection] = useState('asc')

  const teamMembers = [
    { id: 1, name: 'Ralph Edwards', country: 'England', email: 'ralph@gmail.com', projectName: 'Task Management', projectType: 'Mobile App', taskProgress: 80, status: 'Completed', date: '15/08/2023' },
    { id: 2, name: 'Courtney Henry', country: 'Germany', email: 'courtney@gmail.com', projectName: 'Marketplace', projectType: 'Web App', taskProgress: 60, status: 'In Progress', date: '16/08/2023' },
    { id: 3, name: 'Cameron Williamson', country: 'United States', email: 'cameron@gmail.com', projectName: 'Crypto', projectType: 'Dashboard', taskProgress: 30, status: 'On Hold', date: '07/05/2023' },
  ]

  // teamMembers = http://localhost:3000/software/project/team

  const sortedMembers = [...teamMembers].sort((a : any, b : any) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (column : any) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <Card className="w-full p-6 bg-background text-foreground">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Project ACME</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            Progress type: Project
          </Button>
          <Button variant="outline">
            Sort
          </Button>
          <Button variant="outline">
            More filters
          </Button>
          <Button variant="outline">
            Send Feedback
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
              Client Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
            </TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Task Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {member.name}
                </div>
              </TableCell>
              <TableCell>{member.country}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <div>
                  {member.projectName}
                  <div className="text-sm text-gray-500">{member.projectType}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      member.status === 'Completed' ? 'bg-green-500' :
                      member.status === 'In Progress' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${member.taskProgress}%` }}
                  ></div>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  member.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  member.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {member.status}
                </span>
              </TableCell>
              <TableCell>{member.date}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline">
          Previous
        </Button>
        <span>Page 1 of 10</span>
        <Button variant="outline">
          Next
        </Button>
      </div>
    </Card>
  )
}
