"use client"

import Link from "next/link"
import { Bell, Home, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTranslations, useLocale } from "@/contexts/locale-context"
import { getUserRole } from "@/lib/auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface UnifiedHeaderProps {
  onMenuClick?: () => void
  role?: "admin" | "supplier" | "client"
}

export function UnifiedHeader({ onMenuClick, role: propRole }: UnifiedHeaderProps) {
  const t = useTranslations()
  const { dir } = useLocale()
  const router = useRouter()
  const [currentRole, setCurrentRole] = useState<string | null>(null)

  useEffect(() => {
    setCurrentRole(propRole || getUserRole())
  }, [propRole])

  const role = currentRole || "client"

  const homeHref = role === "admin" ? "/dashboard" : role === "supplier" ? "/supplier-dashboard" : "/client-dashboard"

  const roleLabel = role === "admin" ? t.admin || "أدمن" : role === "supplier" ? t.supplier : t.client

  return (
    <header className="sticky top-0 z-40 flex h-14 sm:h-16 items-center justify-between border-b-2 border-border bg-background px-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden touch-manipulation"
          onClick={onMenuClick}
          aria-label={dir === "rtl" ? "فتح القائمة" : "Open menu"}
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        {/* Home Button - Always visible */}
        <Link href={homeHref}>
          <Button
            variant="ghost"
            size="icon"
            title={dir === "rtl" ? "الصفحة الرئيسية" : "Home"}
            className="touch-manipulation"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>

        <div className="hidden xs:block">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">{t.dashboard || "لوحة التحكم"}</h2>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative touch-manipulation"
          onClick={() => {
            const notifHref =
              role === "admin"
                ? "/dashboard/notifications"
                : role === "supplier"
                  ? "/supplier-dashboard/notifications"
                  : "/client-dashboard/notifications"
            router.push(notifHref)
          }}
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <Badge
            variant="destructive"
            className="absolute -top-0.5 sm:-top-1 -end-0.5 sm:-end-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-[10px] sm:text-xs"
          >
            3
          </Badge>
        </Button>

        {/* User Profile */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          <div className={dir === "rtl" ? "text-start" : "text-end"}>
            <p className="text-xs sm:text-sm font-medium">{dir === "rtl" ? "أحمد محمد" : "Ahmed Mohammed"}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">{roleLabel}</p>
          </div>
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs sm:text-sm">
              {dir === "rtl" ? "أم" : "AM"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile Avatar Only */}
        <Avatar className="md:hidden h-8 w-8 sm:h-9 sm:w-9">
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
            {dir === "rtl" ? "أم" : "AM"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
