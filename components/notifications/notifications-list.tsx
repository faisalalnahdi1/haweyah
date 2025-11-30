"use client"

import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocale } from "@/contexts/locale-context"

export function NotificationsList() {
  const { dir } = useLocale()

  const EmptyState = ({ text }: { text: string }) => (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Bell className="h-5 w-5 text-primary" />
          {dir === "rtl" ? "لا توجد إشعارات" : "No notifications"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs sm:text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  )

  const allText =
    dir === "rtl"
      ? "لن تظهر أي إشعارات هنا إلا بعد وجود نشاط مرتبط بحسابك مثل الطلبات أو العروض أو المزادات."
      : "Notifications will appear here when there is activity related to your account, such as orders, offers, or auctions."

  const unreadText =
    dir === "rtl"
      ? "لا توجد إشعارات غير مقروءة حالياً."
      : "There are no unread notifications at the moment."

  const readText =
    dir === "rtl"
      ? "لا توجد إشعارات مقروءة مسجلة حتى الآن."
      : "There are no read notifications recorded yet."

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">
          {dir === "rtl" ? "الكل" : "All"}
        </TabsTrigger>
        <TabsTrigger value="unread">
          {dir === "rtl" ? "غير المقروءة" : "Unread"}
        </TabsTrigger>
        <TabsTrigger value="read">
          {dir === "rtl" ? "المقروءة" : "Read"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-3">
        <EmptyState text={allText} />
      </TabsContent>

      <TabsContent value="unread" className="space-y-3">
        <EmptyState text={unreadText} />
      </TabsContent>

      <TabsContent value="read" className="space-y-3">
        <EmptyState text={readText} />
      </TabsContent>
    </Tabs>
  )
}
