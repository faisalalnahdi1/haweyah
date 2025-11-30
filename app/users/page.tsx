import { UsersTable } from "@/components/users/users-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">إدارة جميع مستخدمي المنصة</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة مستخدم
        </Button>
      </div>
      <UsersTable />
    </div>
  )
}
