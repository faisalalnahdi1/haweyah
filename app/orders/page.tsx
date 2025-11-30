import { OrdersTable } from "@/components/orders/orders-table"
import { OrdersStats } from "@/components/orders/orders-stats"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة الطلبات</h1>
        <p className="text-muted-foreground">عرض وإدارة جميع الطلبات</p>
      </div>
      <OrdersStats />
      <OrdersTable />
    </div>
  )
}
