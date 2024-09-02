import * as React from "react"

import { cn } from "@/app/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-24 duration-200 w-full rounded-md ring-1 px-3 py-2 text-md resize-none ring-offset-background placeholder:text-muted-foreground focus-visible:bg-background/60 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-1 focus-visible:shadow-lg focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-background/80 hover:outline-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
