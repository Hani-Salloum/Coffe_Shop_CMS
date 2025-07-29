"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface ModernDatePickerProps {
  date?: Date
  onDateChange?: (date?: Date) => void
  label?: string
  placeholder?: string
  className?: string
  wrapperClassName?: string
  labelClassName?: string
  disabled?: boolean
  disabledDates?: Date[] | { from: Date } | { to: Date } | { before: Date } | { after: Date }
}

export function HDatePicker({
  date,
  onDateChange,
  label,
  placeholder = "Select a date",
  className,
  wrapperClassName,
  labelClassName,
  disabled,
  disabledDates,
}: ModernDatePickerProps) {
  const id = React.useId()

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      {/* {label && (
        <Label htmlFor={id} className={cn("text-sm font-medium text-gray-500 dark:text-gray-400", labelClassName)}>
          {label}
        </Label>
      )} */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal rounded-xl shadow-sm transition-all",
              !date && "text-muted-foreground",
              className,
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white dark:bg-gray-900 dark:text-white w-auto p-0 rounded-xl shadow-lg" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            //@ts-ignore
            disabled={disabled || disabledDates}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
