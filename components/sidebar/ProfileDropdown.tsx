import { useLanguage } from "@/providers";
import { Dropdown } from "./dropdown";
import { useState } from "react";
import { User } from "lucide-react";

export default function ProfileDropdown() {
    const { t } = useLanguage()
    const [showProfileMenu, setShowProfileMenu] = useState(false)

    return (
        <Dropdown
            isOpen={showProfileMenu}
            setIsOpen={setShowProfileMenu}
            trigger={
              <button className="rounded-full cursor-pointer p-1 text-third hover:bg-secondary ">
                <User className="h-5 w-5" />
                <span className="sr-only">{t("header.profile")}</span>
              </button>
            }
            content={
              <div className="w-48 rounded-md bg-third text-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                <button className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary">
                  Logout
                </button>
              </div>
            }
          />
    )
}