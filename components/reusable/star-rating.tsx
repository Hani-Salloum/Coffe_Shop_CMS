"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StarRatingProps {
  /**
   * The current rating value
   */
  value?: number
  /**
   * The maximum rating value
   */
  max?: number
  /**
   * Whether the rating can be changed by the user
   */
  readOnly?: boolean
  /**
   * The size of the stars
   */
  size?: "sm" | "md" | "lg"
  /**
   * The color of the stars
   */
  color?: "default" | "yellow" | "purple" | "blue" | "green" | "red"
  /**
   * Whether to allow half-star ratings
   */
  allowHalf?: boolean
  /**
   * Callback when the rating changes
   */
  onChange?: (value: number) => void
  /**
   * Additional CSS classes
   */
  className?: string
}

export function StarRating({
  value = 0,
  max = 5,
  readOnly = false,
  size = "md",
  color = "default",
  allowHalf = false,
  onChange,
  className,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Size mappings
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  // Color mappings
  const colorMap = {
    default: "text-primary fill-primary dark:text-yellow-500 dark:fill-yellow-500",
    yellow: "text-yellow-400 fill-yellow-400",
    purple: "text-purple-500 fill-purple-500",
    blue: "text-blue-500 fill-blue-500",
    green: "text-green-500 fill-green-500",
    red: "text-red-500 fill-red-500",
  }

  // Calculate the display value (either the hover value or the actual value)
  const displayValue = hoverValue !== null ? hoverValue : value

  // Handle mouse enter on a star
  const handleMouseEnter = (index: number) => {
    if (readOnly) return
    setHoverValue(index)
  }

  // Handle mouse leave from the rating component
  const handleMouseLeave = () => {
    if (readOnly) return
    setHoverValue(null)
  }

  // Handle click on a star
  const handleClick = (index: number) => {
    if (readOnly) return
    onChange?.(index)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault()
      const newValue = Math.min(max, value + (allowHalf ? 0.5 : 1))
      onChange?.(newValue)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault()
      const newValue = Math.max(0, value - (allowHalf ? 0.5 : 1))
      onChange?.(newValue)
    } else if (e.key === "Home") {
      e.preventDefault()
      onChange?.(0)
    } else if (e.key === "End") {
      e.preventDefault()
      onChange?.(max)
    }
  }

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      onMouseLeave={handleMouseLeave}
      role={readOnly ? "img" : "slider"}
      aria-label={readOnly ? `Rating: ${value} out of ${max} stars` : "Rating"}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value} out of ${max} stars`}
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1
        const isActive = starValue <= displayValue
        const isHalfActive = allowHalf && starValue - 0.5 === displayValue
        const isHalfStar = allowHalf && starValue - 0.5 <= displayValue && starValue > displayValue

        return (
          <div
            key={index}
            className={cn(
              "relative transition-transform duration-200",
              !readOnly && "cursor-pointer",
              !readOnly && "hover:scale-110",
              isFocused &&
                starValue === Math.ceil(value) &&
                "ring-2 ring-offset-2 ring-offset-background ring-primary rounded-full",
            )}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onClick={() => handleClick(starValue)}
          >
            <Star
              className={cn(
                "transition-all duration-300",
                sizeMap[size],
                isActive ? colorMap[color] : "text-muted-foreground stroke-[1.5px] fill-none",
              )}
              data-state={isActive ? "filled" : "empty"}
            />

            {/* Half star overlay */}
            {isHalfStar && (
              <div className="absolute inset-0 overflow-hidden w-[50%]">
                <Star className={cn("transition-all duration-300 absolute left-0", sizeMap[size], colorMap[color])} />
              </div>
            )}
          </div>
        )
      })}

      {!readOnly && (
        <span className="ml-2 text-sm text-muted-foreground">{displayValue.toFixed(allowHalf ? 1 : 0)}</span>
      )}
    </div>
  )
}
