"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Package, Home, ShoppingBag, Gavel, ClipboardList, Settings, LogOut } from "lucide-react"
import { useTranslations, useLocale } from "@/contexts/locale-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function SupplierSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations()
  const { dir } = useLocale()
  const { toast } = useToast()

  const navigation = [
    { name: dir === "rtl" ? "الرئيسية" : "Dashboard", href: "/supplier-dashboard", icon: Home },
    { name: dir === "rtl" ? "منتجاتي" : "My Products", href: "/supplier-dashboard/products", icon: ShoppingBag },
    { name: dir === "rtl" ? "عروضي" : "My Offers", href: "/supplier-dashboard/offers", icon: Package },
    { name: dir === "rtl" ? "مزاداتي" : "My Auctions", href: "/supplier-dashboard/auctions", icon: Gavel },
    { name: dir === "rtl" ? "الطلبات" : "Orders", href: "/supplier-dashboard/orders", icon: ClipboardList },
    { name: t.settings, href: "/supplier-dashboard/settings", icon: Settings },
  ]

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("isAuthenticated")
    toast({
      title: dir === "rtl" ? "تم تسجيل الخروج" : "Logged Out",
      description: dir === "rtl" ? "تم تسجيل خروجك بنجاح" : "You have been logged out successfully",
    })
    router.push("/login")
  }

  return (
    <aside className="fixed inset-y-0 start-0 z-50 w-64 bg-card border-e hidden lg:block">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">{t.appName}</h2>
              <p className="text-xs text-muted-foreground">{t.supplier}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            {t.logout}
          </Button>
        </div>
      </div>
    </aside>
  )
}
