"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tag, Gavel, Filter } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ClientOffersPage() {
  const { dir } = useLocale()
  const [category, setCategory] = useState("all")

  const categories = ["الكل", "أرز", "حليب", "منظفات", "مجمدات"]

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">
          {dir === "rtl"
            ? "تصفح العروض الخاصة والمزادات"
            : "Browse Special Offers & Auctions"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {dir === "rtl"
            ? "استعرض جميع العروض والمزادات في سوق الجملة، الواجهة فقط لعرض الشكل حالياً بدون بيانات حقيقية."
            : "Explore all special offers and auctions in the wholesale market. This is a UI-only view for now without real data."}
        </p>
      </div>

      {/* الفلاتر بالأقسام */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
        <div className="flex flex-wrap gap-2 flex-1">
          {categories.map((cat, idx) => (
            <Badge
              key={cat}
              variant={idx === 0 ? "default" : "outline"}
              className="cursor-default"
            >
              {cat}
            </Badge>
          ))}
        </div>
        <div className="w-full sm:w-56">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <Filter className="h-4 w-4 me-2" />
              <SelectValue
                placeholder={
                  dir === "rtl" ? "تصفية حسب القسم" : "Filter by category"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {dir === "rtl" ? "جميع الأقسام" : "All categories"}
              </SelectItem>
              <SelectItem value="rice">
                {dir === "rtl" ? "أرز" : "Rice"}
              </SelectItem>
              <SelectItem value="milk">
                {dir === "rtl" ? "حليب" : "Milk"}
              </SelectItem>
              <SelectItem value="cleaning">
                {dir === "rtl" ? "منظفات" : "Cleaning"}
              </SelectItem>
              <SelectItem value="frozen">
                {dir === "rtl" ? "مجمدات" : "Frozen"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* قسم العروض الخاصة والمزادات مقسّم إلى جزأين */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* العروض الخاصة */}
        <Card className="bg-card/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Tag className="h-5 w-5 text-primary" />
              {dir === "rtl" ? "العروض الخاصة" : "Special Offers"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground">
            <p>
              {dir === "rtl"
                ? "هنا ستظهر العروض الخاصة من الموردين بأسعار الجملة، مع اسم المنتج، المورد، والسعر الخاص. حالياً لا توجد بيانات حقيقية وسيتم الربط بقاعدة البيانات لاحقاً."
                : "Here you will see special offers from suppliers with wholesale prices, product name, supplier, and special price. Currently there is no live data; database integration will be added later."}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-background overflow-hidden flex flex-col"
                >
                  <div className="w-full h-16 bg-muted flex items-center justify-center text-[10px] sm:text-xs text-muted-foreground">
                    {dir === "rtl" ? "صورة منتج" : "Product image"}
                  </div>
                  <div className="p-2.5 space-y-1">
                    <div className="h-3 w-20 bg-muted rounded-sm" />
                    <div className="h-2.5 w-16 bg-muted rounded-sm" />
                    <div className="h-2.5 w-14 bg-muted rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-dashed bg-muted/40 px-3 py-2 text-[11px] sm:text-xs">
              {dir === "rtl"
                ? "لا توجد عروض خاصة فعلية حتى الآن، ستظهر العروض تلقائياً فور إضافتها من الموردين."
                : "There are no real special offers yet. They will appear automatically once suppliers add them."}
            </div>
          </CardContent>
        </Card>

        {/* المزادات */}
        <Card className="bg-card/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Gavel className="h-5 w-5 text-primary" />
              {dir === "rtl" ? "المزادات" : "Auctions"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground">
            <p>
              {dir === "rtl"
                ? "هنا ستظهر مزادات الكميات الكبيرة مع حالة المزاد (حي، قادم، منتهي) وسعر البداية. حالياً نعرض شكل الواجهة فقط كعرض للمسرّعة."
                : "Here you will see auctions for bulk quantities with status (live, upcoming, ended) and starting price. Currently this is a UI-only view for demo purposes."}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-background overflow-hidden flex flex-col"
                >
                  <div className="w-full h-16 bg-muted flex items-center justify-center text-[10px] sm:text-xs text-muted-foreground">
                    {dir === "rtl" ? "صورة للمزاد" : "Auction image"}
                  </div>
                  <div className="p-2.5 space-y-1">
                    <div className="h-3 w-20 bg-muted rounded-sm" />
                    <div className="h-2.5 w-16 bg-muted rounded-sm" />
                    <div className="h-2.5 w-14 bg-muted rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-dashed bg-muted/40 px-3 py-2 text-[11px] sm:text-xs">
              {dir === "rtl"
                ? "لا توجد مزادات نشطة حالياً، سيتم عرض المزادات هنا فور إنشائها من الموردين."
                : "There are no active auctions yet. They will appear here as soon as suppliers create them."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
