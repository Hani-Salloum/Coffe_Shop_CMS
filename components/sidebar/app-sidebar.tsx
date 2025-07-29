'use client'

import Link from 'next/link'
import {  BarChart3, Users, FileText, Settings, ChevronRight, ChevronLeft, Check, UsersIcon, ShieldUser, BadgeDollarSign, BadgeHelp, Building2, LayoutPanelLeft, Receipt, Reply, CircleArrowOutUpLeft, Coffee, Tractor, User, Images, MessageCircleQuestion, Mails, BadgeInfo, Phone } from 'lucide-react'
import { Header } from './header'
import { useLanguage, useSidebar } from '@/providers'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image'


interface SidebarItemProps {
  icon: React.ReactNode,
  label: string,
  href: string
}

function SidebarItem({ icon, label, href }: SidebarItemProps) {
  const { isCollapsed, collapse, decollapse } = useSidebar()
  const isMobile = useMediaQuery({ maxWidth: 950 });
  
    if(isMobile) collapse()
    else decollapse()

  return (
    <Link
      href={href}
      className="flex items-center rounded-md px-2 py-2 text-third hover:bg-secondary dark:text-gray-300 dark:hover:bg-gray-800"
    >
      <span className="mx-3 flex h-5 w-5 items-center justify-center">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  )
}

export function AppSidebar({ children } : Readonly<{ children: React.ReactNode }>) {
  const { isCollapsed, toggleSidebar } = useSidebar()
  const { direction, t } = useLanguage()

  return (
    <div className="flex min-h-screen w-full bg-third text-gray-900 dark:text-gray-400">
      <aside
        className={`fixed top-0 ${direction === "rtl" ? "right-0" : "left-0"} z-40 h-screen transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-50 dark:bg-primary dark:border-gray-800`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 bg-primary">
            {!isCollapsed && (
              <Link href={'/dashboard'}>
                <div className="flex items-center gap-2 pt-2">
                  <Image src={'/logo.jpg'} alt='logo' width={60} height={60} className='rounded-2xl' />
                  {/* <span className="text-lg font-semibold dark:text-white">3al Makshoof</span>
                  <Check className='size-8 text-[#27ae60]' /> */}
                </div>
              </Link>
            )}
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-auto bg-primary py-4">
            <nav className="space-y-1 px-2">
              <SidebarItem icon={<Coffee />} label={t("sidebar.items")} href="/dashboard/item-management" />
              <SidebarItem icon={<LayoutPanelLeft />} label={t("sidebar.categories")} href="/dashboard/category-management" />
              <SidebarItem icon={<Tractor />} label={t("sidebar.farms")} href="/dashboard/farm-management" />
              <SidebarItem icon={<User />} label={t("sidebar.baristas")} href="/dashboard/barista-management" />
              <SidebarItem icon={<Images />} label={t("sidebar.gallery")} href="/dashboard/gallery-management" />
              <SidebarItem icon={<MessageCircleQuestion />} label={t("sidebar.faqs")} href="/dashboard/faq-management" />
              <SidebarItem icon={<Mails />} label={t("sidebar.mailCollector")} href="/dashboard/mail-collector" />
              <SidebarItem icon={<BadgeInfo />} label={t("sidebar.about")} href="/dashboard/about-management" />
              <SidebarItem icon={<Phone />} label={t("sidebar.contact")} href="/dashboard/contact-management" />
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${
          isCollapsed ? (direction === "rtl" ? "mr-16" : "ml-16") : direction === "rtl" ? "mr-64" : "ml-64"
        }`}
      >
        <Header />
        <main className="flex-1 p-4 w-full">{children}</main>
      </div>
    </div>
  )
}