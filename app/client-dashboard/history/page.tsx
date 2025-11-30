"use client"

import { useTranslations, useLocale } from "@/contexts/locale-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ShoppingCart, Clock } from "lucide-react"

export default function ClientHistoryPage() {
  const t = useTranslations()
  const { dir } = useLocale()

  const history = [
    {
      id: 1,
      type: "order",
      title: dir === "rtl" ? "طلب #ORD-1001" : "Order #ORD-1001",
      description: dir === "rtl" ? "تم استلام الطلب بنجاح" : "Order delivered successfully",
      date: dir === "rtl" ? "منذ أسبوعين" : "2 weeks ago",
      status: "completed",
    },
    {
      id: 2,
      type: "bid",
      title: dir === "rtl" ? "مزايدة على طماطم طازجة" : "Bid on Fresh Tomatoes",
      description: dir === "rtl" ? "لم تفز بالمزاد" : "Auction not won",
      date: dir === "rtl" ? "منذ شهر" : "1 month ago",
      status: "failed",
    },
    {
      id: 3,
      type: "order",
      title: dir === "rtl" ? "طلب #ORD-0998" : "Order #ORD-0998",
      description: dir === "rtl" ? "تم التسليم" : "Delivered",
      date: dir === "rtl" ? "منذ شهرين" : "2 months ago",
      status: "completed",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dir === "rtl" ? "السجل" : "History"}</h1>
        <p className="text-muted-foreground">
          {dir === "rtl" ? "عرض سجل الطلبات والمزايدات السابقة" : "View your past orders and bids history"}
        </p>
      </div>

      <div className="grid gap-4">
        {history.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {item.type === "order" ? (
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={item.status === "completed" ? "default" : "secondary"}>
                  {item.status === "completed"
                    ? dir === "rtl"
                      ? "مكتمل"
                      : "Completed"
                    : dir === "rtl"
                      ? "فشل"
                      : "Failed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {item.date}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
