"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UnifiedSidebar } from "@/components/layout/unified-sidebar"
import { UnifiedHeader } from "@/components/layout/unified-header"
import { isAuthenticated } from "@/lib/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex h-screen overflow-hidden">
      <UnifiedSidebar role="admin" open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <UnifiedHeader role="admin" onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto bg-background p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
