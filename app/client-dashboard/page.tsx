import { ClientStats } from "@/components/client/client-stats"
import { BrowseOffers } from "@/components/client/browse-offers"
import { ActiveOrders } from "@/components/client/active-orders"

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">لوحة تحكم العميل</h1>
        <p className="text-muted-foreground">تصفح العروض وإدارة طلباتك</p>
      </div>

      <ClientStats />

      <BrowseOffers />

      <ActiveOrders />
    </div>
  )
}
