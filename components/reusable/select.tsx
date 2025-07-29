//@ts-nocheck
"use client"

import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Badge } from "../ui/badge"
import { X } from "lucide-react"

interface DynamicSelectProps<T extends Record<string, any>> {
  options: T[]
  valueProperty: keyof T
  labelProperty: keyof T
  placeholder?: string
  defaultValue?: string | string[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  label?: string
  className?: string
  disabled?: boolean
  multiple?: boolean
  maxSelections?: number
}

export function HSelect<T extends Record<string, any>>({
  options,
  valueProperty,
  labelProperty,
  placeholder = "Select an option",
  defaultValue,
  label,
  value,
  onChange,
  className,
  disabled = false,
  multiple = false,
  maxSelections,
}: DynamicSelectProps<T>) {
  const selectedValues = Array.isArray(value) 
    ? value 
    : value ? [value] : []

  const handleSingleSelect = (selectedValue: string) => {
    onChange?.(selectedValue)
  }

  const handleMultiSelect = (selectedValue: string) => {
    const newValues = selectedValues.includes(selectedValue)
      ? selectedValues.filter(v => v !== selectedValue)
      : [...selectedValues, selectedValue]
    
    if (maxSelections && newValues.length > maxSelections) {
      return
    }
    
    onChange?.(newValues)
  }

  const removeSelectedValue = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newValues = selectedValues.filter(v => v !== valueToRemove)
    onChange?.(newValues)
  }

  const displayValue = () => {
    if (multiple) {
      if (selectedValues.length === 0) {
        return <span className="text-muted-foreground">{placeholder}</span>
      }

      if (selectedValues.length <= 2) {
        const selectedOptions = options.filter(option => 
          selectedValues.includes(String(option[valueProperty]))
        )
        
        return (
          <div className="flex gap-1 flex-wrap">
            {selectedOptions.map(option => (
              <Badge 
                key={String(option[valueProperty])} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                {String(option[labelProperty])}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={(e) => removeSelectedValue(String(option[valueProperty]), e)}
                />
              </Badge>
            ))}
          </div>
        )
      }

      return (
        <Badge variant="secondary">
          {selectedValues.length} selected
        </Badge>
      )
    }

    const selectedOption = options.find(
      option => String(option[valueProperty]) === selectedValues[0]
    )

    return selectedOption 
      ? String(selectedOption[labelProperty]) 
      : <span className="text-muted-foreground">{placeholder}</span>
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <Label className={cn("text-sm font-medium text-primary dark:text-gray-400")}>
          {label}
        </Label>
      )}
      
      <Select
        defaultValue={defaultValue}
        value={selectedValues[0]} // Shadcn Select expects a single value
        onValueChange={multiple ? undefined : handleSingleSelect}
        disabled={disabled}
      >
        <SelectTrigger className={cn(
          "w-full rounded-xl border-primary transition-all",
          "min-h-10 h-auto",
          selectedValues.length > 2 && "py-2",
          className
        )}>
          <div className="flex flex-wrap items-center gap-1 w-full">
            {displayValue()}
          </div>
        </SelectTrigger>
        
        <SelectContent className="bg-white dark:bg-gray-900 dark:text-white max-h-[300px] overflow-y-auto">
          {options.map((option) => {
            const optionValue = String(option[valueProperty])
            const isSelected = selectedValues.includes(optionValue)
            
            return multiple ? (
              <div
                key={optionValue}
                className={cn(
                  "relative flex items-center gap-2 px-2 py-1.5",
                  "cursor-default select-none rounded-sm",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  disabled && "opacity-50 pointer-events-none"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  handleMultiSelect(optionValue)
                }}
              >
                <Checkbox 
                  checked={isSelected}
                  className="h-4 w-4"
                />
                <span>{String(option[labelProperty])}</span>
                
                {maxSelections && selectedValues.length >= maxSelections && !isSelected && (
                  <span className="text-xs text-muted-foreground ml-auto">
                    Max {maxSelections} selections
                  </span>
                )}
              </div>
            ) : (
              <SelectItem 
                key={optionValue} 
                value={optionValue}
                className="cursor-pointer"
              >
                {String(option[labelProperty])}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
