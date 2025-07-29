"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ModernCheckboxProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  label?: string
  description?: string
  wrapperClassName?: string
  labelClassName?: string
  id?: string
}

export function HCheckbox({
  label,
  description,
  className,
  wrapperClassName,
  labelClassName,
  id,
  ...props
}: ModernCheckboxProps) {
  const checkboxId = React.useId()

  return (
    <div className={cn("flex items-start space-x-2", wrapperClassName)}>
      <Checkbox id={id || checkboxId} className={cn("mt-1 rounded-md transition-all", className)} {...props} />
      <div>
        {label && (
          <Label htmlFor={id || checkboxId} className={cn("text-sm font-medium", labelClassName)}>
            {label}
          </Label>
        )}
        {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
    </div>
  )
}
