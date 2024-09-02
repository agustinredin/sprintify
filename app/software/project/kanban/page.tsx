"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Column = {
  id: string;
  title: string;
  count: Number;
};

type Task = {
  id: Number;
  title: string;
  column: string;
  assignee: User;
  description: string;
  labels: TaskLabel[];
  daysAgo: Number;
};

interface User {
  name: string;
  avatar: string;
}

interface TaskLabel {
  text: string;
  color: string;
}

const columns = [
  { id: "inbox", title: "Inbox", count: 2 },
  { id: "upNext", title: "Up Next", count: 5 },
  { id: "inProgress", title: "In Progress", count: 2 },
  { id: "blocked", title: "Blocked", count: 0 },
  { id: "review", title: "Review", count: 0 },
];

const tasks = [
  {
    id: 1,
    title: "UI toggle for event blocks.",
    column: "inbox",
    assignee: {
      name: "Glenn Jones",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    description:
      "minor ui: can we have an alt here where it shows 3 blocks (stage, accessible seating, general admission). no need to show seats, just the blocks",
    labels: [{ text: "Bluejay", color: "bg-blue-500" }],
    daysAgo: 2,
  },
  {
    id: 2,
    title: "Page loading clarification needed.",
    column: "inbox",
    assignee: {
      name: "Leandro Varanda",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    description:
      "@dave can you please clarify which pages will load once we click to Notifications and For Owners?",
    labels: [{ text: "GDWP", color: "bg-yellow-500" }],
    daysAgo: 5,
  },
  {
    id: 3,
    title: "Update Ticket Designs in Mock.",
    column: "upNext",
    assignee: {
      name: "Brantley Mathis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    description:
      "@prakash could you please update the ticket designs across this mock to match the new ticket clones?",
    labels: [{ text: "Scam", color: "bg-green-500" }],
    daysAgo: 0,
  },
  {
    id: 4,
    title: "Revert to Pop Over Version",
    column: "upNext",
    assignee: {
      name: "Dream Tucker",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    description:
      "We talked to the engs, can we revert back to the pop over version from before? thanks!",
    labels: [{ text: "LaunchPad", color: "bg-purple-500" }],
    daysAgo: 2,
  },
  {
    id: 5,
    title: "Include lien waiver questionnaire statement.",
    column: "inProgress",
    assignee: {
      name: "Ivan Erickson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    description:
      "The questionnaire/sworn statement for this lien waiver should be shown on here somehow",
    labels: [{ text: "Internal", color: "bg-indigo-500" }],
    daysAgo: 0,
  },
  {
    id: 6,
    title: "Button Styling Concerns",
    column: "inProgress",
    assignee: {
      name: "Tori Bates",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    description: "I don't love the styling of this button",
    labels: [{ text: "Bluejay", color: "bg-blue-500" }],
    daysAgo: 2,
  },
];

export default function KanbanBoard() {
  return (
    <div className="container bg-transparent mx-auto">
      <h1 className="text-2xl font-bold mb-4">Good morning, John</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {columns.map((column) => (
          <ColumnCard key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}

const ColumnCard = ({ column }: { column: Column }) => (
  <div className="bg-background rounded-lg">
    <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
      {column.title}
      <span className="text-sm font-normal text-muted-foreground">
        {Number(column.count)}
      </span>
    </h2>
    <div>
      {tasks
        .filter((task) => task.column === column.id)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  </div>
);

const TaskCard = ({ task }: { task: Task }) => {
  const [selectedTask, setSelectedTask] = React.useState<Task>();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Card
        className="mb-4 cursor-pointer"
        onClick={() => handleTaskClick(task)}
      >
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-2">{task.title}</h3>
          <div className="flex items-center mb-2">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage
                src={task.assignee.avatar}
                alt={task.assignee.name}
              />
              <AvatarFallback>
                {task.assignee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {task.assignee.name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {task.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {task.labels.map((label, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${label.color} text-white`}
                >
                  {label.text}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {task.daysAgo === 0 ? "Today" : `${task.daysAgo} days ago`}
            </span>
          </div>
        </CardContent>
      </Card>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[40%] z-50 overflow-auto transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedTask && (
          <Card className="m-16 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={selectedTask.assignee.avatar}
                      alt={selectedTask.assignee.name}
                    />
                    <AvatarFallback>
                      {selectedTask.assignee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {selectedTask.assignee.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Assignee</p>
                  </div>
                </div>
                <p>{selectedTask.description}</p>
                <div className="flex space-x-2">
                  {selectedTask.labels.map((label, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={`${label.color} text-white`}
                    >
                      {label.text}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Added:{" "}
                  {selectedTask.daysAgo === 0
                    ? "Today"
                    : `${selectedTask.daysAgo} days ago`}
                </p>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Save changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};
