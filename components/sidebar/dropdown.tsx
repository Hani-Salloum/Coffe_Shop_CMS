//@ts-nocheck
'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '../../providers'

export function Dropdown({ trigger, content, isOpen, setIsOpen }) {
  const dropdownRef = useRef(null)
  const { direction } = useLanguage()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    // Only add the event listener when the dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && <div className={`absolute ${direction === "rtl" ? 'left' : "right"}-0 mt-2 z-50`}>{content}</div>}
    </div>
  )
}