"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageToggle } from "@/components/language-toggle"
import { useLocale } from "@/contexts/locale-context"
import { Package, Search, Star, Gavel, Tag, ShoppingCart, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BrowsePage() {
  const { dir } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")

  const categories = [
    { value: "all", label: dir === "rtl" ? "جميع الفئات" : "All Categories" },
    { value: "grains", label: dir === "rtl" ? "حبوب" : "Grains" },
    { value: "oils", label: dir === "rtl" ? "زيوت" : "Oils" },
    { value: "dairy", label: dir === "rtl" ? "ألبان" : "Dairy" },
    { value: "beverages", label: dir === "rtl" ? "مشروبات" : "Beverages" },
  ]

  const offers = [
    {
      id: 1,
      product: dir === "rtl" ? "أرز بسمتي هندي" : "Indian Basmati Rice",
      supplier: dir === "rtl" ? "مؤسسة الحبوب الذهبية" : "Golden Grains Est.",
      price: "85 ر.س/كيس",
      rating: 4.8,
      category: "grains",
    },
    {
      id: 2,
      product: dir === "rtl" ? "زيت زيتون بكر" : "Extra Virgin Olive Oil",
      supplier: dir === "rtl" ? "شركة الزيوت الطبيعية" : "Natural Oils Co.",
      price: "45 ر.س/لتر",
      rating: 4.9,
      category: "oils",
    },
    {
      id: 3,
      product: dir === "rtl" ? "حليب كامل الدسم" : "Full Cream Milk",
      supplier: dir === "rtl" ? "مصنع الألبان الوطني" : "National Dairy Factory",
      price: "120 ر.س/كرتون",
      rating: 4.7,
      category: "dairy",
    },
    {
      id: 4,
      product: dir === "rtl" ? "عصائر طبيعية" : "Natural Juices",
      supplier: dir === "rtl" ? "مصنع العصائر الطازجة" : "Fresh Juice Factory",
      price: "65 ر.س/كرتون",
      rating: 4.6,
      category: "beverages",
    },
  ]

  const auctions = [
    {
      id: 1,
      product: dir === "rtl" ? "دقيق فاخر (500 كيس)" : "Premium Flour (500 bags)",
      currentBid: "12,500 ر.س",
      bids: 23,
      timeLeft: dir === "rtl" ? "ساعتان" : "2 hours",
    },
    {
      id: 2,
      product: dir === "rtl" ? "سكر أبيض (1 طن)" : "White Sugar (1 ton)",
      currentBid: "3,200 ر.س",
      bids: 18,
      timeLeft: dir === "rtl" ? "5 ساعات" : "5 hours",
    },
  ]

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch = offer.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || offer.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-primary rounded-lg">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">حاوية</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Haawiya</p>
            </div>
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
            <LanguageToggle />
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                {dir === "rtl" ? "تسجيل الدخول" : "Login"}
              </Button>
            </Link>
            <Link href="/register?type=client" className="hidden xs:inline-block">
              <Button size="sm" className="text-xs sm:text-sm">
                {dir === "rtl" ? "اشترك الآن" : "Subscribe Now"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* CTA Banner */}
      <div className="bg-primary/10 border-b">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">
                  {dir === "rtl" ? "اشترك للوصول الكامل" : "Subscribe for Full Access"}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {dir === "rtl" ? "249 ر.س/شهر - اطلب وشارك في المزادات" : "249 SAR/month - Order & bid on auctions"}
                </p>
              </div>
            </div>
            <Link href="/register?type=client">
              <Button size="sm" className="sm:size-lg whitespace-nowrap">
                {dir === "rtl" ? "ابدأ الاشتراك" : "Start Subscription"}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ms-1.5 sm:ms-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            {dir === "rtl" ? "تصفح المنتجات والمزادات" : "Browse Products & Auctions"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {dir === "rtl"
              ? "اكتشف آلاف المنتجات من موردين موثوقين"
              : "Discover thousands of products from trusted suppliers"}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={dir === "rtl" ? "ابحث عن منتج..." : "Search for a product..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-10 h-10 sm:h-11"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[200px] h-10 sm:h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="offers" className="space-y-4 sm:space-y-6">
          <TabsList className="w-full sm:w-auto grid grid-cols-2">
            <TabsTrigger value="offers" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {dir === "rtl" ? "العروض" : "Offers"}
            </TabsTrigger>
            <TabsTrigger value="auctions" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Gavel className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {dir === "rtl" ? "المزادات" : "Auctions"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="offers">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredOffers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-32 sm:h-40 bg-muted flex items-center justify-center">
                    <Package className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/30" />
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="font-semibold line-clamp-2 text-xs sm:text-sm">{offer.product}</h3>
                      <div className="flex items-center gap-1 text-xs shrink-0">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{offer.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 sm:mb-3 truncate">{offer.supplier}</p>
                    <p className="text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3">{offer.price}</p>
                    <Button
                      size="sm"
                      className="w-full bg-transparent text-xs sm:text-sm h-8 sm:h-9"
                      variant="outline"
                      disabled
                    >
                      {dir === "rtl" ? "سجل للطلب" : "Subscribe to Order"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="auctions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {auctions.map((auction) => (
                <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-32 sm:h-40 bg-muted flex items-center justify-center relative">
                    <Package className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/30" />
                    <Badge className="absolute top-2 sm:top-3 end-2 sm:end-3 bg-primary text-xs">
                      <Gavel className="h-3 w-3 me-1" />
                      {dir === "rtl" ? "مزاد حي" : "Live"}
                    </Badge>
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-semibold mb-2 sm:mb-3 line-clamp-2 text-sm sm:text-base">{auction.product}</h3>
                    <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">{dir === "rtl" ? "العرض الحالي" : "Current Bid"}</span>
                        <span className="font-bold text-primary">{auction.currentBid}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {auction.bids} {dir === "rtl" ? "عرض" : "bids"}
                        </span>
                        <span className="text-destructive font-medium">{auction.timeLeft}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-transparent text-xs sm:text-sm h-8 sm:h-9"
                      variant="outline"
                      disabled
                    >
                      {dir === "rtl" ? "سجل للمشاركة" : "Subscribe to Bid"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
