import { useState } from "react"
import { Dropdown } from "./dropdown"
import { Globe } from "lucide-react"
import { useLanguage } from "@/providers"

export default function LanguageDropdown() {
    const { t, language, setLanguage } = useLanguage()
    const [showLanguageMenu, setShowLanguageMenu] = useState(false)
    
    return (
        <Dropdown
            isOpen={showLanguageMenu}
            setIsOpen={setShowLanguageMenu}
            trigger={
              <button className="rounded-full cursor-pointer p-2 text-third hover:bg-secondary">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t("header.language")}</span>
              </button>
            }
            content={
              <div className="w-48 rounded-md bg-third text-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                <button
                  onClick={() => {
                    setLanguage("en")
                    setShowLanguageMenu(false)
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    language === "en" ? "bg-secondary" : ""
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage("ar")
                    setShowLanguageMenu(false)
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    language === "ar" ? "bg-secondary" : ""
                  }`}
                >
                  العربية
                </button>
              </div>
            }
          />
    )
}