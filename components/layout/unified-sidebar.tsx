"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  ShoppingBag,
  ClipboardList,
  History,
  Home,
  Menu,
  Store,
  Tag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useTranslations, useLocale } from "@/contexts/locale-context"
import { LanguageToggle } from "@/components/language-toggle"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import supabase from "@/lib/supabase"

interface UnifiedSidebarProps {
  role?: "admin" | "supplier" | "client"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function UnifiedSidebar({ role: propRole, open, onOpenChange }: UnifiedSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations()
  const { dir } = useLocale()
  const { toast } = useToast()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState<"admin" | "supplier" | "client">("client")

  useEffect(() => {
    if (propRole) {
      setCurrentRole(propRole)
    }
  }, [propRole])

  useEffect(() => {
    if (open !== undefined) {
      setIsMobileOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsMobileOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const role = currentRole

  // Admin navigation – حالياً عنصر واحد يودّي للوحة الأدمن القديمة /dashboard
  const adminNavigation = [
    {
      name: t.dashboard || "لوحة التحكم",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    // لما تضيف صفحات إدارة مستخدمين/موردين للأدمن، زِد عناصر هنا بمسارات حقيقية
    // { name: t.users || "المستخدمين", href: "/dashboard/users", icon: Users },
  ]

  // Supplier navigation (مركّزة على المنتجات اليومية + العروض/المزادات)
  const supplierNavigation = [
    {
      name: dir === "rtl" ? "المنتجات اليومية" : "Daily Products",
      href: "/supplier-dashboard",
      icon: Package,
    },
    {
      name: dir === "rtl" ? "العروض والمزادات" : "Offers & Auctions",
      href: "/supplier-dashboard/offers",
      icon: Tag,
    },
    {
      name: dir === "rtl" ? "الطلبات" : "Orders",
      href: "/supplier-dashboard/orders",
      icon: ClipboardList,
    },
    {
      name: dir === "rtl" ? "السجل" : "History",
      href: "/supplier-dashboard/history",
      icon: History,
    },
    {
      name: t.notifications || "الإشعارات",
      href: "/supplier-dashboard/notifications",
      icon: Bell,
    },
    {
      name: t.settings || "الإعدادات",
      href: "/supplier-dashboard/settings",
      icon: Settings,
    },
  ]

  // Client navigation (الموردون والمنتجات اليومية + العروض والمزادات)
  const clientNavigation = [
    {
      name:
        dir === "rtl"
          ? "الموردون والمنتجات اليومية"
          : "Suppliers & Daily Products",
      href: "/client-dashboard",
      icon: Store,
    },
    {
      name: dir === "rtl" ? "العروض والمزادات" : "Offers & Auctions",
      href: "/client-dashboard/offers",
      icon: Tag,
    },
    {
      name: dir === "rtl" ? "طلباتي" : "My Orders",
      href: "/client-dashboard/orders",
      icon: ShoppingCart,
    },
    {
      name: dir === "rtl" ? "السجل" : "History",
      href: "/client-dashboard/history",
      icon: History,
    },
    {
      name: t.notifications || "الإشعارات",
      href: "/client-dashboard/notifications",
      icon: Bell,
    },
    {
      name: t.settings || "الإعدادات",
      href: "/client-dashboard/settings",
      icon: Settings,
    },
  ]

  const navigation =
    role === "admin" ? adminNavigation : role === "supplier" ? supplierNavigation : clientNavigation

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast({
      title: dir === "rtl" ? "تم تسجيل الخروج" : "Logged Out",
      description: dir === "rtl" ? "تم تسجيل خروجك بنجاح" : "You have been logged out successfully",
    })
    router.push("/login")
    handleOpenChange(false)
  }

  const roleLabel =
    role === "admin"
      ? t.admin || "أدمن"
      : role === "supplier"
      ? dir === "rtl"
        ? "مورد"
        : "Supplier"
      : dir === "rtl"
      ? "عميل"
      : "Client"

  const SidebarContent = () => (
    <div className="flex h-full w-full flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 sm:h-16 items-center gap-2 sm:gap-3 border-b-2 border-border px-4 sm:px-6">
        <div className="p-1.5 sm:p-2 bg-primary rounded-lg">
          <PackageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-primary">{t.appName || "حاوية"}</h1>
          <p className="text-xs text-muted-foreground">{roleLabel}</p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 sm:px-3 py-3 sm:py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleOpenChange(false)}
                className={cn(
                  "flex items-center gap-2 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 text-sm font-medium transition-all",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "min-h-[44px] touch-manipulation",
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-sidebar-foreground",
                )}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="flex-1 text-sm sm:text-base">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-3 sm:p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <LanguageToggle />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title={t.logout || "تسجيل الخروج"}
            className="shrink-0"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <Sheet open={isMobileOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="lg:hidden touch-manipulation">
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side={dir === "rtl" ? "right" : "left"} className="p-0 w-[280px] sm:w-[300px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 border-e-2 border-border bg-sidebar h-full">
        <SidebarContent />
      </aside>
    </>
  )
}

export function MobileMenuButton() {
  return (
    <div className="lg:hidden">
      <Button variant="ghost" size="icon" className="touch-manipulation">
        <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  )
}
