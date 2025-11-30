"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { Input } from "@/components/ui/input"

export function BrowseOffers() {
  const { dir } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")

  const offers = [
    {
      id: 1,
      product: "طماطم طازجة",
      productEn: "Fresh Tomatoes",
      supplier: "مزارع الخير",
      price: 45,
      originalPrice: 55,
      discount: 18,
      quantity: "500 كجم",
      rating: 4.5,
    },
    {
      id: 2,
      product: "أرز بسمتي",
      productEn: "Basmati Rice",
      supplier: "تجار الحبوب",
      price: 120,
      originalPrice: 140,
      discount: 14,
      quantity: "1 طن",
      rating: 4.8,
    },
    {
      id: 3,
      product: "زيت زيتون",
      productEn: "Olive Oil",
      supplier: "زيوت المتوسط",
      price: 180,
      originalPrice: 200,
      discount: 10,
      quantity: "300 لتر",
      rating: 4.7,
    },
    {
      id: 4,
      product: "بطاطس مصرية",
      productEn: "Egyptian Potatoes",
      supplier: "مزارع النيل",
      price: 35,
      originalPrice: 42,
      discount: 17,
      quantity: "800 كجم",
      rating: 4.3,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{dir === "rtl" ? "العروض المميزة" : "Featured Offers"}</h2>
        <div className="relative w-64">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={dir === "rtl" ? "البحث..." : "Search..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{dir === "rtl" ? offer.product : offer.productEn}</CardTitle>
                <Badge variant="destructive" className="text-xs">
                  -{offer.discount}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{offer.supplier}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">{offer.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{offer.originalPrice}</span>
                  <span className="text-sm">{dir === "rtl" ? "ر.س" : "SAR"}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{offer.quantity}</p>
              </div>
              <Button className="w-full gap-2">
                <ShoppingCart className="h-4 w-4" />
                {dir === "rtl" ? "أضف للسلة" : "Add to Cart"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
