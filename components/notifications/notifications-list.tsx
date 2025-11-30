"use client"

import { useState } from "react"
import { Bell, Package, Gavel, ShoppingCart, UserPlus, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Notification {
  id: string
  type: "order" | "auction" | "offer" | "user" | "system"
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "طلب جديد",
    message: "تم استلام طلب جديد من خالد السالم بقيمة 3,500 ر.س",
    time: "منذ 5 دقائق",
    read: false,
  },
  {
    id: "2",
    type: "auction",
    title: "مزاد ينتهي قريباً",
    message: "مزاد البطاطس المستوردة سينتهي خلال ساعة واحدة",
    time: "منذ 15 دقيقة",
    read: false,
  },
  {
    id: "3",
    type: "offer",
    title: "عرض جديد",
    message: "فاطمة العلي أضافت عرض جديد: طماطم طازجة - 500 كجم",
    time: "منذ 30 دقيقة",
    read: false,
  },
  {
    id: "4",
    type: "user",
    title: "مستخدم جديد",
    message: "محمد العتيبي انضم كمورد جديد",
    time: "منذ ساعة",
    read: true,
  },
  {
    id: "5",
    type: "order",
    title: "طلب مكتمل",
    message: "تم إكمال الطلب ORD-001234 بنجاح",
    time: "منذ ساعتين",
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "تحديث النظام",
    message: "تم تحديث المنصة إلى الإصدار 2.1.0",
    time: "منذ 3 ساعات",
    read: true,
  },
]

export function NotificationsList() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-5 w-5" />
      case "auction":
        return <Gavel className="h-5 w-5" />
      case "offer":
        return <Package className="h-5 w-5" />
      case "user":
        return <UserPlus className="h-5 w-5" />
      case "system":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-50 text-blue-600"
      case "auction":
        return "bg-purple-50 text-purple-600"
      case "offer":
        return "bg-green-50 text-green-600"
      case "user":
        return "bg-orange-50 text-orange-600"
      case "system":
        return "bg-gray-50 text-gray-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">
          الكل
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="mr-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="unread">غير المقروءة</TabsTrigger>
        <TabsTrigger value="read">المقروءة</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`border-2 cursor-pointer transition-all hover:border-primary/50 ${
              !notification.read ? "bg-accent/30" : ""
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getIconColor(notification.type)}`}>{getIcon(notification.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium">{notification.title}</h4>
                    {!notification.read && (
                      <Badge variant="default" className="bg-primary">
                        جديد
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="unread" className="space-y-3">
        {notifications
          .filter((n) => !n.read)
          .map((notification) => (
            <Card
              key={notification.id}
              className="border-2 bg-accent/30 cursor-pointer transition-all hover:border-primary/50"
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getIconColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      <Badge variant="default" className="bg-primary">
                        جديد
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent>

      <TabsContent value="read" className="space-y-3">
        {notifications
          .filter((n) => n.read)
          .map((notification) => (
            <Card key={notification.id} className="border-2">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getIconColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent>
    </Tabs>
  )
}
