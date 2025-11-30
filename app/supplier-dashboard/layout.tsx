"use client"

import type React from "react"
import { useState } from "react"
import { UnifiedSidebar } from "@/components/layout/unified-sidebar"
import { UnifiedHeader } from "@/components/layout/unified-header"

export default function SupplierDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <UnifiedSidebar role="supplier" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <UnifiedHeader role="supplier" onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
