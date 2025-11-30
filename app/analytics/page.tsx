import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { CategoryChart } from "@/components/analytics/category-chart"
import { TopProducts } from "@/components/analytics/top-products"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">التحليلات والإحصائيات</h1>
        <p className="text-muted-foreground">عرض مؤشرات الأداء الرئيسية</p>
      </div>
      <AnalyticsOverview />
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <CategoryChart />
      </div>
      <TopProducts />
    </div>
  )
}
