"use client"

import { useLocale } from "@/contexts/locale-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart } from "lucide-react"

export default function ClientOrdersPage() {
  const { dir } = useLocale()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">
          {dir === "rtl" ? "طلباتي" : "My Orders"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {dir === "rtl"
            ? "جميع الطلبات المرتبطة بحسابك ستظهر هنا عند توفر بيانات."
            : "All orders linked to your account will appear here when data is available."}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <ShoppingCart className="h-5 w-5 text-primary" />
            {dir === "rtl" ? "قائمة الطلبات" : "Orders list"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {dir === "rtl"
              ? "حالياً لا توجد طلبات مسجلة. عند إنشاء طلبات جديدة ستتم إضافتها في الجدول أدناه."
              : "There are currently no orders. When you create new orders, they will be listed in the table below."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">
                    {dir === "rtl" ? "رقم الطلب" : "Order ID"}
                  </TableHead>
                  <TableHead className="text-xs sm:text-sm">
                    {dir === "rtl" ? "التاريخ" : "Date"}
                  </TableHead>
                  <TableHead className="text-xs sm:text-sm">
                    {dir === "rtl" ? "المورد" : "Supplier"}
                  </TableHead>
                  <TableHead className="text-xs sm:text-sm">
                    {dir === "rtl" ? "القيمة" : "Total"}
                  </TableHead>
                  <TableHead className="text-xs sm:text-sm">
                    {dir === "rtl" ? "الحالة" : "Status"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-xs sm:text-sm text-muted-foreground"
                  >
                    {dir === "rtl"
                      ? "لا توجد طلبات حتى الآن."
                      : "No orders yet."}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
