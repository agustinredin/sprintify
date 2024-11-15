// "use client"

// import * as React from "react"
// import * as TooltipPrimitive from "@radix-ui/react-tooltip"

// import { cn } from "@/app/lib/utils"

// const TooltipProvider = TooltipPrimitive.Provider

// const Tooltip = TooltipPrimitive.Root

// const TooltipTrigger = TooltipPrimitive.Trigger

// const TooltipContent = React.forwardRef<
//   React.ElementRef<typeof TooltipPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
// >(({ className, sideOffset = 4, ...props }, ref) => (
//   <TooltipPrimitive.Content
//     ref={ref}
//     sideOffset={sideOffset}
//     className={cn(
//       "z-50 overflow-hidden rounded-md border bg-popover px-4 py-2 text-md text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-50 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
//       className,
//     )}
//     {...props}
//   />
// ))
// TooltipContent.displayName = TooltipPrimitive.Content.displayName

// export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

// export function TooltipWrapper({
//   children,
//   title,
//   side,
// }: {
//   children: React.ReactNode
//   title: String
//   side: "top" | "right" | "bottom" | "left"
// }) {
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>{children}</TooltipTrigger>
//         <TooltipContent side={side}>{title}</TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   )
// }

"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/app/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName


interface ReusableTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delayDuration?: number
}

export default function Component({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 200,
}: ReusableTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}