"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/contexts/locale-context"

const activities = [
  {
    id: 1,
    user: "فاطمة العلي",
    action: "أضافت عرض جديد",
    product: "طماطم طازجة - 500 كجم",
    time: "منذ 5 دقائق",
    type: "offer",
  },
  {
    id: 2,
    user: "خالد السالم",
    action: "قدم عرض في مزاد",
    product: "مزاد البطاطس المستوردة",
    time: "منذ 12 دقيقة",
    type: "auction",
  },
  {
    id: 3,
    user: "سارة أحمد",
    action: "أكملت طلب",
    product: "طلب #3891",
    time: "منذ 25 دقيقة",
    type: "order",
  },
  {
    id: 4,
    user: "محمد العتيبي",
    action: "انضم كمورد جديد",
    product: "مؤسسة العتيبي للتجارة",
    time: "منذ ساعة",
    type: "user",
  },
]

export function RecentActivity() {
  const t = useTranslations()

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "offer":
        return "default"
      case "auction":
        return "secondary"
      case "order":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>{t.recentActivity || "النشاط الأخير"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{activity.user}</p>
                  <Badge variant={getBadgeVariant(activity.type)} className="text-xs">
                    {activity.action}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.product}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
