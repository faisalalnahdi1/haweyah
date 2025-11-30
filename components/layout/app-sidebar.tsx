"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Package,
  Gavel,
  ShoppingCart,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  PackageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useTranslations, useLocale } from "@/contexts/locale-context"
import { LanguageToggle } from "@/components/language-toggle"
import { logout, getUserRole } from "@/lib/auth"

export function AppSidebar() {
  const pathname = usePathname()
  const t = useTranslations()
  const { dir } = useLocale()
  const userRole = getUserRole()

  const navigation = [
    {
      name: t.dashboard || "لوحة التحكم",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "supplier", "client"],
    },
    {
      name: t.users || "المستخدمين",
      href: "/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      name: t.offers || "العروض",
      href: "/offers",
      icon: Package,
      roles: ["admin", "supplier", "client"],
    },
    {
      name: t.auctions || "المزادات",
      href: "/auctions",
      icon: Gavel,
      roles: ["admin", "supplier", "client"],
    },
    {
      name: t.orders || "الطلبات",
      href: "/orders",
      icon: ShoppingCart,
      roles: ["admin", "supplier", "client"],
    },
    {
      name: t.analytics || "التحليلات",
      href: "/analytics",
      icon: BarChart3,
      roles: ["admin", "supplier"],
    },
    {
      name: t.notifications || "الإشعارات",
      href: "/notifications",
      icon: Bell,
      roles: ["admin", "supplier", "client"],
    },
    {
      name: t.settings || "الإعدادات",
      href: "/settings",
      icon: Settings,
      roles: ["admin", "supplier", "client"],
    },
  ]

  const filteredNavigation = navigation.filter((item) => item.roles.includes(userRole || "client"))

  return (
    <div className="flex h-full w-64 flex-col border-border bg-sidebar border-e-2">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b-2 border-border px-6">
        <div className="p-2 bg-primary rounded-lg">
          <PackageIcon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary">{t.appName || "حاوية"}</h1>
          <p className="text-xs text-muted-foreground">{dir === "rtl" ? "منصة الجملة" : "Wholesale Platform"}</p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-sidebar-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", dir === "rtl" ? "ml-auto" : "mr-auto")} />
                <span className="flex-1">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <LanguageToggle />
          <Button variant="ghost" size="icon" onClick={logout} title={t.logout || "تسجيل الخروج"}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
