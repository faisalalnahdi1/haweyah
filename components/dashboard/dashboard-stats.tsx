"use client"

import { Users, ShoppingCart, DollarSign, Gavel } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "@/contexts/locale-context"

export function DashboardStats() {
  const t = useTranslations()

  const stats = [
    {
      title: t.totalUsers || "إجمالي المستخدمين",
      value: "1,245",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: t.totalOrders || "إجمالي الطلبات",
      value: "3,891",
      change: "+23%",
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: t.totalRevenue || "إجمالي الإيرادات",
      value: "2.4M ر.س",
      change: "+18%",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: t.activeAuctions || "المزادات النشطة",
      value: "48",
      change: "+5%",
      icon: Gavel,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium mt-1">{stat.change} من الشهر الماضي</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
