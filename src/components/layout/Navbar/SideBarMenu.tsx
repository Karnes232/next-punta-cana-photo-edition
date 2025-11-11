"use client"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { X } from "lucide-react"
import SideBarInside from "./SideBarInside"

const Sidebar = dynamic(
  () =>
    import("react-pro-sidebar").then(mod => {
      return mod.Sidebar
    }),
  { ssr: false },
)

const SideBarMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <Sidebar
          backgroundColor="rgb(255, 255, 255, 1)"
          onBackdropClick={() => setIsOpen(false)}
          toggled={isOpen}
          breakPoint="all"
          width="100%"
          rtl
          className={`h-full transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full items-center text-center justify-between">
            <div className="fixed top-5 right-5">
              <button
                className="p-2 text-2xl text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </button>
            </div>

            <SideBarInside setIsOpen={setIsOpen} footer={false} />
          </div>
        </Sidebar>
      </div>
    </>
  )
}

export default SideBarMenu
