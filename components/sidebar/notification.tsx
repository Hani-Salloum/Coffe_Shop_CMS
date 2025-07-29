'use client'

interface NotificationItemProps {
  title: string
  description: string
  time: string
  isRead: boolean
}

export function NotificationItem({ title, description, time, isRead = false }: NotificationItemProps) {
  return (
    <div
      className={`relative cursor-pointer border-b px-4 py-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ${
        !isRead ? "bg-blue-50 dark:bg-gray-700/50" : ""
      }`}
    >
      <div className="flex justify-between">
        <p className="text-sm font-medium">{title}</p>
        <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
      </div>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{description}</p>
      {!isRead && <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-blue-600" />}
    </div>
  )
}