import { OffersTable } from "@/components/offers/offers-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function OffersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة العروض</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع عروض المنتجات</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة عرض
        </Button>
      </div>
      <OffersTable />
    </div>
  )
}
