"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface ModernTableProps<T extends Record<string, any>> {
  data: T[]
  columns: Column<T>[]
  pageSize?: number
  page?: number
  itemsCount?: number
  onPageChange?: (page: number) => void
  pageSizeOptions?: number[]
  searchable?: boolean
  searchPlaceholder?: string
  className?: string
  emptyState?: React.ReactNode
}

export function HTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  searchable = false,
  searchPlaceholder = "Search...",
  className,
  onPageChange,
  page,
  itemsCount,
  emptyState,
}: ModernTableProps<T>) {
  const [pageIndex, setPageIndex] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(initialPageSize)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof T | null; direction: "asc" | "desc" | null }>({
    key: null,
    direction: null,
  })

  // Filter data based on search query
  // const filteredData = React.useMemo(() => {
  //   if (!searchQuery) return data

  //   return data.filter((item) => {
  //     return Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase()))
  //   })
  // }, [data, searchQuery])

  // Sort data
  // const sortedData = React.useMemo(() => {
  //   if (!sortConfig.key || !sortConfig.direction) return filteredData

  //   return [...filteredData].sort((a, b) => {
  //     const aValue = a[sortConfig.key!]
  //     const bValue = b[sortConfig.key!]

  //     if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
  //     if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
  //     return 0
  //   })
  // }, [filteredData, sortConfig])

  // Pagination
  // const paginatedData = React.useMemo(() => {
  //   const start = pageIndex * pageSize
  //   const end = start + pageSize
  //   return sortedData.slice(start, end)
  // }, [sortedData, pageIndex, pageSize])

  // const pageCount = Math.ceil(itemsCount / pageSize)

  // const handleSort = (key: keyof T) => {
  //   setSortConfig((current) => {
  //     if (current.key === key) {
  //       if (current.direction === "asc") return { key, direction: "desc" }
  //       if (current.direction === "desc") return { key: null, direction: null }
  //     }
  //     return { key, direction: "asc" }
  //   })
  // }

  // const handlePageSizeChange = (value: string) => {
  //   const newPageSize = Number(value)
  //   setPageSize(newPageSize)
  //   setPageIndex(0) // Reset to first page when changing page size
  // }

  // Reset to first page when search changes
  // React.useEffect(() => {
  //   setPageIndex(0)
  // }, [searchQuery])

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl shadow-sm"
          />
        </div>
      )}

      <div className={cn("rounded-xl  shadow-sm overflow-hidden", className)}>
        <Table className="!overflow-x-scroll">
          <TableHeader className="bg-secondary text-primary">
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className="bg-muted/50">
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {/* {column.sortable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 p-0 ml-1"
                        onClick={() => handleSort(column.accessorKey)}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )} */}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-muted/20" : ""} border-t border-t-gray-400`}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.cell ? column.cell(row) : String(row[column.accessorKey] || "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyState || "No results found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* {pageCount > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            
          </div>

          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Page {page} of {pageCount}
            </p>
            <div className="flex items-center space-x-1">
              <Button
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={() => onPageChange(Math.max(0, page - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={() => onPageChange(Math.min(pageCount, page + 1))}
                disabled={page === pageCount}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}
