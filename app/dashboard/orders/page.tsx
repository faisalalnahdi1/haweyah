import { OrdersStats } from "@/components/orders/orders-stats"
import { OrdersTable } from "@/components/orders/orders-table"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <OrdersStats />
      <OrdersTable />
    </div>
  )
}
