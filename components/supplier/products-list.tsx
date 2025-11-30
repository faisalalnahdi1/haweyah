"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"

export function ProductsList() {
  const { dir } = useLocale()

  const products = [
    { id: 1, name: "طماطم طازجة", category: "خضروات", stock: 500, price: 45 },
    { id: 2, name: "Fresh Tomatoes", category: "Vegetables", stock: 500, price: 45 },
    { id: 3, name: "أرز بسمتي", category: "حبوب", stock: 1200, price: 120 },
    { id: 4, name: "زيت زيتون", category: "زيوت", stock: 300, price: 180 },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{dir === "rtl" ? "منتجاتي" : "My Products"}</CardTitle>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          {dir === "rtl" ? "إضافة منتج" : "Add Product"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {dir === "rtl" ? "المخزون:" : "Stock:"} {product.stock} {dir === "rtl" ? "كجم" : "kg"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">
                  {product.price} {dir === "rtl" ? "ر.س" : "SAR"}
                </span>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
