import { Loader2 } from "lucide-react"

export default function Loader() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground">Loading...</p>
      </div>
    </div>
  )
}
