"use client"

import { useState } from "react"
import { Search, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react"
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

interface Offer {
  id: string
  productName: string
  supplier: string
  category: string
  quantity: string
  price: string
  validUntil: string
  status: "active" | "pending" | "expired"
}

const mockOffers: Offer[] = [
  {
    id: "1",
    productName: "طماطم طازجة",
    supplier: "فاطمة العلي",
    category: "خضروات",
    quantity: "500 كجم",
    price: "3,500 ر.س",
    validUntil: "2025-01-30",
    status: "active",
  },
  {
    id: "2",
    productName: "بطاطس مستوردة",
    supplier: "نورة الدوسري",
    category: "خضروات",
    quantity: "1000 كجم",
    price: "4,200 ر.س",
    validUntil: "2025-01-28",
    status: "active",
  },
  {
    id: "3",
    productName: "موز طازج",
    supplier: "ريم القحطاني",
    category: "فواكه",
    quantity: "300 كجم",
    price: "2,100 ر.س",
    validUntil: "2025-01-25",
    status: "pending",
  },
  {
    id: "4",
    productName: "بصل أحمر",
    supplier: "فاطمة العلي",
    category: "خضروات",
    quantity: "750 كجم",
    price: "3,000 ر.س",
    validUntil: "2025-02-05",
    status: "active",
  },
  {
    id: "5",
    productName: "تفاح أمريكي",
    supplier: "نورة الدوسري",
    category: "فواكه",
    quantity: "400 كجم",
    price: "5,600 ر.س",
    validUntil: "2025-01-22",
    status: "expired",
  },
]

export function OffersTable() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOffers = mockOffers.filter((offer) => {
    const matchesSearch =
      offer.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || offer.category === categoryFilter
    const matchesStatus = statusFilter === "all" || offer.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-600">
            {t.active || "نشط"}
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">{t.pending || "قيد الانتظار"}</Badge>
      case "expired":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            منتهي
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
          <CardTitle>{t.offerManagement || "إدارة العروض"}</CardTitle>
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="خضروات">خضروات</SelectItem>
                <SelectItem value="فواكه">فواكه</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="expired">منتهي</SelectItem>
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
                <TableHead>{t.productName || "اسم المنتج"}</TableHead>
                <TableHead>المورد</TableHead>
                <TableHead>{t.category || "الفئة"}</TableHead>
                <TableHead>{t.quantity || "الكمية"}</TableHead>
                <TableHead>{t.price || "السعر"}</TableHead>
                <TableHead>{t.validUntil || "صالح حتى"}</TableHead>
                <TableHead>{t.status || "الحالة"}</TableHead>
                <TableHead className="text-center">{t.actions || "الإجراءات"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.productName}</TableCell>
                  <TableCell className="text-muted-foreground">{offer.supplier}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{offer.category}</Badge>
                  </TableCell>
                  <TableCell>{offer.quantity}</TableCell>
                  <TableCell className="font-semibold text-primary">{offer.price}</TableCell>
                  <TableCell className="text-muted-foreground">{offer.validUntil}</TableCell>
                  <TableCell>{getStatusBadge(offer.status)}</TableCell>
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
                          <Pencil className="me-2 h-4 w-4" />
                          {t.edit || "تعديل"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="me-2 h-4 w-4" />
                          {t.delete || "حذف"}
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
