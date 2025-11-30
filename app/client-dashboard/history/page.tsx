"use client"

import { useTranslations, useLocale } from "@/contexts/locale-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function ClientHistoryPage() {
  const t = useTranslations()
  const { dir } = useLocale()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">
          {dir === "rtl" ? "السجل" : "History"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {dir === "rtl"
            ? "سجل الطلبات والمزادات المرتبطة بحسابك سيظهر هنا عند توفر بيانات."
            : "Your orders and auctions history will appear here when data is available."}
        </p>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Clock className="h-5 w-5 text-primary" />
            {dir === "rtl" ? "لا يوجد سجل حالياً" : "No history available"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {dir === "rtl"
              ? "حتى الآن لم يتم تسجيل أي عمليات لهذا الحساب. عند تنفيذ طلبات أو المشاركة في مزادات سيتم عرضها هنا."
              : "No activity has been recorded for this account yet. Once you place orders or participate in auctions, they will be listed here."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {dir === "rtl"
              ? "يمكنك الرجوع إلى هذه الصفحة في أي وقت لمتابعة تاريخ عملياتك."
              : "You can return to this page anytime to review your past activity."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
