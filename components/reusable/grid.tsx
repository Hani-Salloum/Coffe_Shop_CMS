import type * as React from "react"
import { cn } from "@/lib/utils"

// Row component
interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  gutter?: number
}

export function Row({ children, className, gutter = 0, ...props }: RowProps) {
  const gutterClass = gutter ? `gap-${gutter}` : ""

  return (
    <div className={cn("flex flex-wrap w-full", gutterClass, className)} {...props}>
      {children}
    </div>
  )
}

// Column component
interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  span?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export function Col({ children, className, span, sm, md, lg, xl, ...props }: ColProps) {
  // Create a mapping of column spans to width percentages
  const getWidthClass = (colSpan: number | undefined) => {
    if (!colSpan) return ""

    switch (colSpan) {
      case 1:
        return "w-1/12"
      case 2:
        return "w-2/12"
      case 3:
        return "w-3/12"
      case 4:
        return "w-4/12"
      case 5:
        return "w-5/12"
      case 6:
        return "w-6/12"
      case 7:
        return "w-7/12"
      case 8:
        return "w-8/12"
      case 9:
        return "w-9/12"
      case 10:
        return "w-10/12"
      case 11:
        return "w-11/12"
      case 12:
        return "w-full"
      default:
        return ""
    }
  }

  // Create responsive width classes
  const widthClass = getWidthClass(span)
  const smWidthClass = sm ? `sm:${getWidthClass(sm)}` : ""
  const mdWidthClass = md ? `md:${getWidthClass(md)}` : ""
  const lgWidthClass = lg ? `lg:${getWidthClass(lg)}` : ""
  const xlWidthClass = xl ? `xl:${getWidthClass(xl)}` : ""

  return (
    <div
      className={cn('p-2',span ? widthClass : "w-full", smWidthClass, mdWidthClass, lgWidthClass, xlWidthClass, className)}
      {...props}
    >
      {children}
    </div>
  )
}
