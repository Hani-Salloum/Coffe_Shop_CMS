'use client'

import { useLanguage } from '@/providers'
import LanguageDropdown from './LanguageDropdown'
import NotificationsDropdown from './NotificationsDropdown'
import ProfileDropdown from './ProfileDropdown'
import ThemeToggle from './ThemeToggle'

export function Header() {
  const { direction } = useLanguage()

  return (
    <header className="bg-primary">
      <div className="flex h-16 items-center px-4">
        <div className={`flex items-center gap-2 ${direction === "rtl" ? "mr-auto" : "ml-auto"}`}>
          {/* <ThemeToggle /> */}
          <LanguageDropdown />
          {/* <NotificationsDropdown /> */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}