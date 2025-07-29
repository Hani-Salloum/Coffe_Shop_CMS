// src/components/sidebar/providers.jsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '@/lib/translations'


const LanguageContext = createContext({
  language: 'en',
  direction: 'ltr',
  setLanguage: (key: string) => {},
  t: (key: string) => key,
})

// Theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

// Sidebar context
const SidebarContext = createContext({
  isCollapsed: false,
  toggleSidebar: () => {},
  collapse: () => {},
  decollapse: () => {}
})

// Providers
export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  // Language state
  const [language, setLanguageState] = useState('en')
  const direction = language === 'ar' ? 'rtl' : 'ltr'

  // Theme state
  const [theme, setTheme] = useState('light')

  // Sidebar state
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Initialize from localStorage after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('app-language')
      if (savedLanguage) setLanguageState(savedLanguage)

      const savedTheme = localStorage.getItem('app-theme')
      if (savedTheme) setTheme(savedTheme)

      // Set direction and theme on document
      document.documentElement.setAttribute('dir', direction)
      document.documentElement.setAttribute('lang', language)
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(theme)
    }
  }, [])

  // Update document when language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', direction)
      document.documentElement.setAttribute('lang', language)
    }
  }, [language, direction])

  // Update document when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(theme)
    }
  }, [theme])

  // Language functions
  const setLanguage = (lang: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-language', lang)
    }
    setLanguageState(lang)
  }

  const t = (key: string) => {
    //@ts-ignore
    return translations[language][key] || key
  }

  // Theme functions
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme', newTheme)
    }
    setTheme(newTheme)
  }

  // Sidebar functions
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const collapse = () => {
    setIsCollapsed(true)
  }

  const decollapse = () => {
    setIsCollapsed(false)
  }

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, collapse, decollapse }}>
          {children}
        </SidebarContext.Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  )
}

// Custom hooks
export const useLanguage = () => useContext(LanguageContext)
export const useTheme = () => useContext(ThemeContext)
export const useSidebar = () => useContext(SidebarContext)