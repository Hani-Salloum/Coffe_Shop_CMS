import { useState } from "react";
import { Dropdown } from "./dropdown";
import { NotificationItem } from "./notification";
import { Bell } from "lucide-react";
import { useLanguage } from "@/providers";

export default function NotificationsDropdown() {
    const { t } = useLanguage()
    const [showNotifications, setShowNotifications] = useState(false)

    return (
        <Dropdown
            isOpen={showNotifications}
            setIsOpen={setShowNotifications}
            trigger={
              <button className="relative rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                  3
                </span>
                <span className="sr-only">{t("header.notifications")}</span>
              </button>
            }
            content={
              <div className="w-80 rounded-md  py-1 shadow-lg bg-[#fbfbfb] ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                <div className="px-4 py-2 font-medium border-b dark:border-gray-700">
                  Notifications
                  <span className="ml-2 rounded-full bg-blue-600 px-1.5 py-0.5 text-xs text-white">3</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <NotificationItem
                    title="New message"
                    description="You have received a new message from John Doe"
                    time="5 min ago"
                    isRead={false}
                  />
                  <NotificationItem
                    title="Project update"
                    description="Your project 'Dashboard' has been updated"
                    time="2 hours ago"
                    isRead={false}
                  />
                  <NotificationItem
                    title="Account security"
                    description="Your password was changed successfully"
                    time="1 day ago"
                    isRead={true}
                  />
                </div>
                <div className="border-t px-4 py-2 text-center text-sm font-medium text-blue-600 dark:border-gray-700">
                  View all notifications
                </div>
              </div>
            }
          />
    )
}