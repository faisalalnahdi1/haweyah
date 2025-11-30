import { NotificationsList } from "@/components/notifications/notifications-list"
import { Button } from "@/components/ui/button"
import { CheckCheck } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">مركز الإشعارات</h1>
          <p className="text-muted-foreground">عرض جميع الإشعارات والتنبيهات</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <CheckCheck className="h-4 w-4" />
          وضع علامة كمقروء للكل
        </Button>
      </div>
      <NotificationsList />
    </div>
  )
}
