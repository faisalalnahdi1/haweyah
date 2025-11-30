"use client"

import { useState } from "react"
import { Search, MoreVertical, Eye, Truck, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "@/contexts/locale-context"

interface Order {
  id: string
  orderNumber: string
  customer: string
  items: string
  quantity: string
  total: string
  orderDate: string
  deliveryDate: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001234",
    customer: "خالد السالم",
    items: "طماطم طازجة، بصل أحمر",
    quantity: "250 كجم",
    total: "3,500 ر.س",
    orderDate: "2025-01-20",
    deliveryDate: "2025-01-24",
    status: "processing",
  },
  {
    id: "2",
    orderNumber: "ORD-001235",
    customer: "عبدالله الشمري",
    items: "بطاطس مستوردة",
    quantity: "500 كجم",
    total: "4,200 ر.س",
    orderDate: "2025-01-21",
    deliveryDate: "2025-01-25",
    status: "pending",
  },
  {
    id: "3",
    orderNumber: "ORD-001236",
    customer: "خالد السالم",
    items: "موز طازج، تفاح",
    quantity: "180 كجم",
    total: "2,800 ر.س",
    orderDate: "2025-01-19",
    deliveryDate: "2025-01-23",
    status: "shipped",
  },
  {
    id: "4",
    orderNumber: "ORD-001237",
    customer: "فهد المطيري",
    items: "فلفل أخضر، خيار",
    quantity: "320 كجم",
    total: "4,100 ر.س",
    orderDate: "2025-01-18",
    deliveryDate: "2025-01-22",
    status: "delivered",
  },
  {
    id: "5",
    orderNumber: "ORD-001238",
    customer: "عبدالله الشمري",
    items: "جزر، كوسة",
    quantity: "150 كجم",
    total: "1,900 ر.س",
    orderDate: "2025-01-22",
    deliveryDate: "2025-01-26",
    status: "cancelled",
  },
]

export function OrdersTable() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            قيد الانتظار
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            قيد المعالجة
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="default" className="bg-purple-600">
            <Truck className="me-1 h-3 w-3" />
            قيد التوصيل
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle className="me-1 h-3 w-3" />
            مكتمل
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className="me-1 h-3 w-3" />
            ملغي
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>{t.orderManagement || "إدارة الطلبات"}</CardTitle>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.search || "بحث..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pe-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="processing">قيد المعالجة</SelectItem>
                <SelectItem value="shipped">قيد التوصيل</SelectItem>
                <SelectItem value="delivered">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.orderNumber || "رقم الطلب"}</TableHead>
                <TableHead>{t.customer || "العميل"}</TableHead>
                <TableHead>المنتجات</TableHead>
                <TableHead>{t.quantity || "الكمية"}</TableHead>
                <TableHead>{t.total || "الإجمالي"}</TableHead>
                <TableHead>{t.orderDate || "تاريخ الطلب"}</TableHead>
                <TableHead>{t.deliveryDate || "تاريخ التسليم"}</TableHead>
                <TableHead>{t.status || "الحالة"}</TableHead>
                <TableHead className="text-center">{t.actions || "الإجراءات"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-medium">{order.orderNumber}</TableCell>
                  <TableCell className="font-medium">{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">{order.items}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="font-semibold text-primary">{order.total}</TableCell>
                  <TableCell className="text-muted-foreground">{order.orderDate}</TableCell>
                  <TableCell className="text-muted-foreground">{order.deliveryDate}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t.actions || "الإجراءات"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="me-2 h-4 w-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="me-2 h-4 w-4" />
                          تحديث الحالة
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="me-2 h-4 w-4" />
                          إلغاء الطلب
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
