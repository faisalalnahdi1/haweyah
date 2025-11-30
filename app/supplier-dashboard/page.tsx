import { SupplierStats } from "@/components/supplier/supplier-stats"
import { ProductsList } from "@/components/supplier/products-list"
import { SupplierAuctions } from "@/components/supplier/supplier-auctions"

export default function SupplierDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">لوحة تحكم المورد</h1>
        <p className="text-muted-foreground">إدارة منتجاتك وعروضك ومزاداتك</p>
      </div>

      <SupplierStats />

      <div className="grid lg:grid-cols-2 gap-6">
        <ProductsList />
        <SupplierAuctions />
      </div>
    </div>
  )
}
