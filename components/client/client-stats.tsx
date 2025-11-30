"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Clock, CheckCircle, DollarSign, AlertTriangle } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ClientStats() {
  const { dir } = useLocale()
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("active")
  const [daysUntilRenewal, setDaysUntilRenewal] = useState<number>(0)

  useEffect(() => {
    const status = localStorage.getItem("subscriptionStatus") || "inactive"
    const expiryStr = localStorage.getItem("subscriptionExpiry")

    setSubscriptionStatus(status)

    if (expiryStr) {
      const expiry = new Date(expiryStr)
      const now = new Date()
      const days = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      setDaysUntilRenewal(Math.max(0, days))
    }
  }, [])

  const stats = [
    {
      title: dir === "rtl" ? "الطلبات النشطة" : "Active Orders",
      value: "5",
      icon: ShoppingCart,
      trend: "+2",
    },
    {
      title: dir === "rtl" ? "قيد التسليم" : "In Delivery",
      value: "3",
      icon: Clock,
      trend: "",
    },
    {
      title: dir === "rtl" ? "تم التسليم" : "Delivered",
      value: "42",
      icon: CheckCircle,
      trend: "+7",
    },
    {
      title: dir === "rtl" ? "إجمالي المشتريات" : "Total Spent",
      value: "125,600 ر.س",
      icon: DollarSign,
      trend: dir === "rtl" ? "هذا الشهر" : "this month",
    },
  ]

  return (
    <div className="space-y-4">
      {subscriptionStatus === "active" && daysUntilRenewal <= 7 && (
        <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              {dir === "rtl"
                ? `سيتم تجديد اشتراكك خلال ${daysUntilRenewal} يوم`
                : `Your subscription renews in ${daysUntilRenewal} days`}
            </span>
            <Button size="sm" variant="outline">
              {dir === "rtl" ? "إدارة الاشتراك" : "Manage Subscription"}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {subscriptionStatus === "inactive" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              {dir === "rtl"
                ? "اشتراكك غير نشط. قم بالتجديد للوصول الكامل للمنصة."
                : "Your subscription is inactive. Renew for full platform access."}
            </span>
            <Button size="sm" variant="outline">
              {dir === "rtl" ? "تجديد الآن" : "Renew Now"}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.trend && <p className="text-xs text-primary mt-1">{stat.trend}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
