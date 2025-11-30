"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Package } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import Link from "next/link"

export function FeaturedOffers() {
  const { dir } = useLocale()

  // Mock featured offers (would be set by admin in real app)
  const offers = [
    {
      id: 1,
      product: dir === "rtl" ? "أرز بسمتي هندي" : "Indian Basmati Rice",
      supplier: dir === "rtl" ? "مؤسسة الحبوب الذهبية" : "Golden Grains Est.",
      price: "85 ر.س/كيس",
      originalPrice: "120 ر.س/كيس",
      discount: "-29%",
      rating: 4.8,
      image: "/basmati-rice-bags.jpg",
    },
    {
      id: 2,
      product: dir === "rtl" ? "زيت زيتون بكر" : "Extra Virgin Olive Oil",
      supplier: dir === "rtl" ? "شركة الزيوت الطبيعية" : "Natural Oils Co.",
      price: "45 ر.س/لتر",
      originalPrice: "65 ر.س/لتر",
      discount: "-31%",
      rating: 4.9,
      image: "/olive-oil-bottles.png",
    },
    {
      id: 3,
      product: dir === "rtl" ? "تمور مجدول فاخرة" : "Premium Medjool Dates",
      supplier: dir === "rtl" ? "مزارع النخيل" : "Palm Farms",
      price: "120 ر.س/كرتون",
      originalPrice: "180 ر.س/كرتون",
      discount: "-33%",
      rating: 5.0,
      image: "/medjool-dates-box.jpg",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 bg-background/50">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
          {dir === "rtl" ? "عروض مميزة" : "Featured Offers"}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {dir === "rtl" ? "عروض مختارة بعناية من قبل فريقنا" : "Carefully curated offers by our team"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {offers.map((offer) => (
          <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={offer.image || "/placeholder.svg"}
                alt={offer.product}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <Badge className="absolute top-2 sm:top-3 end-2 sm:end-3 bg-destructive text-destructive-foreground text-xs sm:text-sm">
                {offer.discount}
              </Badge>
            </div>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="font-bold text-base sm:text-lg line-clamp-1">{offer.product}</h3>
                <div className="flex items-center gap-1 text-xs sm:text-sm shrink-0">
                  <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{offer.rating}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 flex items-center gap-1">
                <Package className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="truncate">{offer.supplier}</span>
              </p>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold text-primary">{offer.price}</span>
                <span className="text-xs sm:text-sm text-muted-foreground line-through">{offer.originalPrice}</span>
              </div>
              <Link href="/browse">
                <Button className="w-full text-sm sm:text-base h-9 sm:h-10">
                  {dir === "rtl" ? "عرض التفاصيل" : "View Details"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/browse">
          <Button variant="outline" size="lg" className="w-full xs:w-auto bg-transparent">
            {dir === "rtl" ? "تصفح جميع العروض" : "Browse All Offers"}
          </Button>
        </Link>
      </div>
    </section>
  )
}
