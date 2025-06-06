"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, SelectRangeEventHandler } from "react-day-picker"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/app/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { CalendarDaysIcon } from "./icons"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  label?: string
}

function Calendar({ label, id, className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const [value, setValue] = React.useState<Date | undefined>()
  const [shown, setShown] = React.useState<boolean>()

  const handleSetValue = (day: Date | undefined) => {
    setValue(day)
    setShown(false)
  }

  return (
    <>
      <Input type='hidden' value={value?.toString() || ''} id={id} />
      <Label htmlFor={id}>{label}</Label>
      <Popover open={shown}>
        <PopoverTrigger asChild onClick={() => setShown(!shown)}>
          <Button variant='outline' className='w-full justify-start font-normal'>
            <CalendarDaysIcon className='mr-2 h-4 w-4' />
            <span>{value?.toDateString() || `Select ${label || "date"}`}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <DayPicker
            onDayClick={handleSetValue}
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              // cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
              day_range_end: "day-range-end",
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-muted text-muted-foreground",
              day_outside:
                "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
              ...classNames,
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
              IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
            }}
            {...props}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
