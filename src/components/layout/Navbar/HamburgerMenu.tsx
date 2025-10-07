"use client"
import { Menu } from "lucide-react"
import React, { useState } from "react"
import SideBarMenu from "./SideBarMenu"

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="flex">
        <SideBarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex p-3">
          <div>
            <button
              aria-label="Menu"
              className={`sb-button `}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className={`h-7 w-7 md:h-9 text-luxuryGold`} />
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default HamburgerMenu
