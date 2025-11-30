"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, MapPin } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"

export function ActiveOrders() {
  const { dir } = useLocale()

  const orders = [
    {
      id: "ORD-2024-001",
      product: "أرز بسمتي",
      productEn: "Basmati Rice",
      quantity: "500 كجم",
      status: "في الطريق",
      statusEn: "In Transit",
      estimatedDelivery: "2024-01-25",
      supplier: "تجار الحبوب",
    },
    {
      id: "ORD-2024-002",
      product: "زيت زيتون",
      productEn: "Olive Oil",
      quantity: "200 لتر",
      status: "قيد التحضير",
      statusEn: "Preparing",
      estimatedDelivery: "2024-01-26",
      supplier: "زيوت المتوسط",
    },
  ]

  const getStatusColor = (status: string) => {
    if (status === "في الطريق" || status === "In Transit") return "default"
    if (status === "قيد التحضير" || status === "Preparing") return "secondary"
    return "outline"
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{dir === "rtl" ? "طلباتي النشطة" : "My Active Orders"}</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{dir === "rtl" ? order.product : order.productEn}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{order.id}</p>
                </div>
                <Badge variant={getStatusColor(order.status)}>{dir === "rtl" ? order.status : order.statusEn}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{order.quantity}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{order.supplier}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>
                  {dir === "rtl" ? "التسليم المتوقع:" : "Estimated Delivery:"} {order.estimatedDelivery}
                </span>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                {dir === "rtl" ? "تتبع الطلب" : "Track Order"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
