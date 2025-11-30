import { AuctionsTable } from "@/components/auctions/auctions-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AuctionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة المزادات</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع المزادات النشطة</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة مزاد
        </Button>
      </div>
      <AuctionsTable />
    </div>
  )
}
