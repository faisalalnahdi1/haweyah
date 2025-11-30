"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const topProducts = [
  { id: 1, name: "طماطم طازجة", sales: 1250, revenue: "87,500 ر.س", growth: 92 },
  { id: 2, name: "بطاطس مستوردة", sales: 980, revenue: "68,600 ر.س", growth: 78 },
  { id: 3, name: "موز إكوادوري", sales: 850, revenue: "59,500 ر.س", growth: 68 },
  { id: 4, name: "بصل أحمر", sales: 720, revenue: "50,400 ر.س", growth: 57 },
  { id: 5, name: "فلفل أخضر", sales: 650, revenue: "45,500 ر.س", growth: 52 },
]

export function TopProducts() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {product.id}
                  </Badge>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} مبيعات • {product.revenue}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">{product.growth}%</span>
              </div>
              <Progress value={product.growth} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
