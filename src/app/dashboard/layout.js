"use client"

import { useState } from "react"
import { useStore } from "@/hooks/useStore"
import NavbarDash from "@/app/dashboard/components/NavbarDash/NavbarDash"
import DrawerMenu from "@/app/dashboard/components/DrawerMenu/DrawerMenu"

export default function DashboardLayout({ children }) {
  const { user } = useStore()
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <>
      <NavbarDash setOpenMenu={setOpenMenu} />
      <DrawerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      {children}
    </>
  )
}
