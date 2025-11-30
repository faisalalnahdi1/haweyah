"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Gavel, ShoppingCart, DollarSign } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"

export function SupplierStats() {
  const { dir } = useLocale()

  const stats = [
    {
      title: dir === "rtl" ? "إجمالي المنتجات" : "Total Products",
      value: "124",
      icon: Package,
      trend: "+12%",
    },
    {
      title: dir === "rtl" ? "العروض النشطة" : "Active Offers",
      value: "18",
      icon: ShoppingCart,
      trend: "+5%",
    },
    {
      title: dir === "rtl" ? "المزادات الجارية" : "Live Auctions",
      value: "7",
      icon: Gavel,
      trend: "+2",
    },
    {
      title: dir === "rtl" ? "الإيرادات الشهرية" : "Monthly Revenue",
      value: "285,400 ر.س",
      icon: DollarSign,
      trend: "+23%",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-primary mt-1">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
