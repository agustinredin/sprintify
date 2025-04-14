import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TasksNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The task you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
      </p>
      <Link href="/software">
        <Button>Return to Projects</Button>
      </Link>
    </div>
  )
}
