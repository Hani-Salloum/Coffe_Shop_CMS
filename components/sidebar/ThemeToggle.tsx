import { useLanguage, useTheme } from "@/providers";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { t } = useLanguage()
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">{t("header.theme")}</span>
          </button>
    )
}