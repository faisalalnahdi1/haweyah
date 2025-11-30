"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gavel, Clock, TrendingUp } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import Link from "next/link"
import { useState, useEffect } from "react"

export function FeaturedAuctions() {
  const { dir } = useLocale()
  const [, setTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Mock featured auctions (would be set by admin in real app)
  const auctions = [
    {
      id: 1,
      product: dir === "rtl" ? "دقيق فاخر (500 كيس)" : "Premium Flour (500 bags)",
      currentBid: "12,500 ر.س",
      startingPrice: "10,000 ر.س",
      bids: 23,
      endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      image: "/flour-bags-warehouse.jpg",
    },
    {
      id: 2,
      product: dir === "rtl" ? "سكر أبيض (1 طن)" : "White Sugar (1 ton)",
      currentBid: "3,200 ر.س",
      startingPrice: "2,500 ر.س",
      bids: 18,
      endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      image: "/sugar-bags.jpg",
    },
  ]

  const getTimeRemaining = (endDate: Date) => {
    const total = endDate.getTime() - Date.now()
    const hours = Math.floor(total / (1000 * 60 * 60))
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((total % (1000 * 60)) / 1000)

    if (total <= 0) return dir === "rtl" ? "انتهى" : "Ended"
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">{dir === "rtl" ? "مزادات نشطة" : "Active Auctions"}</h2>
        <p className="text-muted-foreground">
          {dir === "rtl" ? "شارك الآن في المزادات الساخنة" : "Join the hottest auctions now"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
        {auctions.map((auction) => (
          <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={auction.image || "/placeholder.svg"}
                alt={auction.product}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 end-3 bg-primary text-primary-foreground flex items-center gap-1">
                <Gavel className="h-3 w-3" />
                {dir === "rtl" ? "مزاد حي" : "Live Auction"}
              </Badge>
            </div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-3">{auction.product}</h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {dir === "rtl" ? "العرض الحالي" : "Current Bid"}
                  </span>
                  <span className="text-xl font-bold text-primary">{auction.currentBid}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{dir === "rtl" ? "السعر الابتدائي" : "Starting Price"}</span>
                  <span>{auction.startingPrice}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {dir === "rtl" ? "ينتهي في" : "Ends in"}
                  </span>
                  <span className="font-mono font-bold text-destructive">{getTimeRemaining(auction.endsAt)}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    {auction.bids} {dir === "rtl" ? "عرض سعر" : "bids"}
                  </span>
                </div>
              </div>

              <Link href="/browse">
                <Button className="w-full">{dir === "rtl" ? "عرض المزاد" : "View Auction"}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/browse">
          <Button variant="outline" size="lg">
            {dir === "rtl" ? "تصفح جميع المزادات" : "Browse All Auctions"}
          </Button>
        </Link>
      </div>
    </section>
  )
}
