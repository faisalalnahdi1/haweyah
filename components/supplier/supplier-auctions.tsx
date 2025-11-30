"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"

export function SupplierAuctions() {
  const { dir } = useLocale()

  const auctions = [
    {
      id: 1,
      product: "بطاطس مصرية",
      currentBid: 8500,
      bids: 12,
      endsIn: "2h 15m",
      status: "live",
    },
    {
      id: 2,
      product: "Egyptian Potatoes",
      currentBid: 8500,
      bids: 12,
      endsIn: "2h 15m",
      status: "live",
    },
    {
      id: 3,
      product: "موز فلبيني",
      currentBid: 6200,
      bids: 8,
      endsIn: "5h 45m",
      status: "live",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{dir === "rtl" ? "مزاداتي" : "My Auctions"}</CardTitle>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          {dir === "rtl" ? "إضافة مزاد" : "Add Auction"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {auctions.slice(0, 3).map((auction) => (
            <div
              key={auction.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{auction.product}</p>
                  <Badge variant="default" className="text-xs">
                    {dir === "rtl" ? "مباشر" : "Live"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>
                    {auction.bids} {dir === "rtl" ? "عروض" : "bids"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {auction.endsIn}
                  </span>
                </div>
              </div>
              <div className="text-end">
                <p className="text-sm text-muted-foreground">{dir === "rtl" ? "العرض الحالي" : "Current Bid"}</p>
                <p className="font-bold text-lg text-primary">
                  {auction.currentBid.toLocaleString()} {dir === "rtl" ? "ر.س" : "SAR"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
