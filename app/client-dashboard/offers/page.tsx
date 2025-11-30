"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Star, Filter } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClientOffersPage() {
  const { dir } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")

  const offers = [
    {
      id: 1,
      product: "طماطم طازجة",
      productEn: "Fresh Tomatoes",
      category: "vegetables",
      supplier: "مزارع الخير",
      price: 45,
      originalPrice: 55,
      discount: 18,
      quantity: "500 كجم",
      rating: 4.5,
      reviews: 24,
    },
    {
      id: 2,
      product: "أرز بسمتي",
      productEn: "Basmati Rice",
      category: "grains",
      supplier: "تجار الحبوب",
      price: 120,
      originalPrice: 140,
      discount: 14,
      quantity: "1 طن",
      rating: 4.8,
      reviews: 56,
    },
    {
      id: 3,
      product: "زيت زيتون",
      productEn: "Olive Oil",
      category: "oils",
      supplier: "زيوت المتوسط",
      price: 180,
      originalPrice: 200,
      discount: 10,
      quantity: "300 لتر",
      rating: 4.7,
      reviews: 38,
    },
    {
      id: 4,
      product: "بطاطس مصرية",
      productEn: "Egyptian Potatoes",
      category: "vegetables",
      supplier: "مزارع النيل",
      price: 35,
      originalPrice: 42,
      discount: 17,
      quantity: "800 كجم",
      rating: 4.3,
      reviews: 19,
    },
    {
      id: 5,
      product: "موز فلبيني",
      productEn: "Philippine Bananas",
      category: "fruits",
      supplier: "مستورد الفواكه",
      price: 55,
      originalPrice: 65,
      discount: 15,
      quantity: "600 كجم",
      rating: 4.6,
      reviews: 42,
    },
    {
      id: 6,
      product: "سكر أبيض",
      productEn: "White Sugar",
      category: "grains",
      supplier: "مصفاة السكر",
      price: 95,
      originalPrice: 110,
      discount: 14,
      quantity: "1.5 طن",
      rating: 4.4,
      reviews: 31,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dir === "rtl" ? "تصفح العروض" : "Browse Offers"}</h1>
        <p className="text-muted-foreground">
          {dir === "rtl" ? "اكتشف أفضل العروض من موردينا" : "Discover the best offers from our suppliers"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={dir === "rtl" ? "البحث عن منتج..." : "Search products..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-10"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 me-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dir === "rtl" ? "جميع الفئات" : "All Categories"}</SelectItem>
            <SelectItem value="vegetables">{dir === "rtl" ? "خضروات" : "Vegetables"}</SelectItem>
            <SelectItem value="fruits">{dir === "rtl" ? "فواكه" : "Fruits"}</SelectItem>
            <SelectItem value="grains">{dir === "rtl" ? "حبوب" : "Grains"}</SelectItem>
            <SelectItem value="oils">{dir === "rtl" ? "زيوت" : "Oils"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="destructive" className="text-xs">
                  -{offer.discount}%
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{offer.rating}</span>
                  <span className="text-xs text-muted-foreground">({offer.reviews})</span>
                </div>
              </div>
              <CardTitle className="text-lg">{dir === "rtl" ? offer.product : offer.productEn}</CardTitle>
              <p className="text-sm text-muted-foreground">{offer.supplier}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-primary">{offer.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{offer.originalPrice}</span>
                  <span className="text-sm">{dir === "rtl" ? "ر.س" : "SAR"}</span>
                </div>
                <p className="text-sm text-muted-foreground">{offer.quantity}</p>
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
