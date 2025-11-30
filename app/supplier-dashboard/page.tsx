"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { useLocale } from "@/contexts/locale-context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Tag, Gavel } from "lucide-react";

export default function SupplierDashboardPage() {
  const { dir } = useLocale();
  const router = useRouter();
  const [name, setName] = useState<string>("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login");
        return;
      }

      const meta: any = data.user.user_metadata || {};
      const fullName = meta.full_name as string | undefined;
      const fallback =
        data.user.email?.split("@")[0] ||
        (dir === "rtl" ? "المورد" : "Supplier");

      setName(fullName || fallback);
      setLoading(false);
    }

    loadUser();
  }, [router, dir]);

  return (
    <div className="min-h-screen bg-muted/10 px-4 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {dir === "rtl" ? "لوحة تحكم المورد" : "Supplier Dashboard"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {loading
                ? dir === "rtl"
                  ? "جاري تحميل بيانات الحساب..."
                  : "Loading account data..."
                : dir === "rtl"
                ? `مرحباً، ${name}`
                : `Welcome, ${name}`}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* الميزة 1: إدارة المنتجات اليومية (نفس فكرة تصفحها عند العميل لكن من جهة المورد) */}
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Package className="h-5 w-5 text-primary" />
                {dir === "rtl"
                  ? "إدارة المنتجات اليومية"
                  : "Manage Daily Products"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground">
              <p>
                {dir === "rtl"
                  ? "أضف منتجاتك اليومية وقم بتحديث الأسعار والكميات المعروضة للعملاء. حالياً هذه واجهة تجريبية بدون ربط فعلي بقاعدة البيانات."
                  : "Add your daily products and update prices and quantities shown to clients. This is a demo view without real DB wiring yet."}
              </p>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" disabled>
                  {dir === "rtl" ? "إضافة منتج يومي" : "Add daily product"}
                </Button>
                <Button size="sm" variant="outline" disabled>
                  {dir === "rtl" ? "تحديث الكميات" : "Update stock"}
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card overflow-hidden flex"
                  >
                    <div className="w-20 sm:w-24 h-20 sm:h-24 bg-muted flex items-center justify-center text-[10px] sm:text-xs text-muted-foreground">
                      {dir === "rtl" ? "صورة" : "Image"}
                    </div>
                    <div className="flex-1 p-2.5 space-y-1">
                      <div className="h-3.5 w-24 bg-muted rounded-sm" />
                      <div className="h-2.5 w-20 bg-muted rounded-sm" />
                      <div className="h-2.5 w-16 bg-muted rounded-sm mb-2" />
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="h-7 text-[11px]"
                      >
                        {dir === "rtl" ? "تعديل (قريباً)" : "Edit (soon)"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* الميزة 2: إدارة العروض والمزادات (مقسمة) */}
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Tag className="h-5 w-5 text-primary" />
                {dir === "rtl"
                  ? "إدارة العروض الخاصة والمزادات"
                  : "Manage Offers & Auctions"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground">
              <p>
                {dir === "rtl"
                  ? "أنشئ عروض خاصة على منتجات محددة أو أطلق مزادات على الكميات الكبيرة للوصول لأفضل سعر من العملاء."
                  : "Create special offers for selected products or launch auctions for large quantities to reach the best price from clients."}
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                {/* العروض الخاصة للمورد */}
                <Card className="border-dashed bg-card/70">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      {dir === "rtl"
                        ? "العروض الخاصة"
                        : "Special Offers"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <p>
                      {dir === "rtl"
                        ? "ستضيف عروضك هنا مع تحديد فترة العرض والكمية والأسعار الخاصة."
                        : "You will add your offers here with duration, quantity, and special pricing."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" disabled>
                        {dir === "rtl" ? "إنشاء عرض" : "Create offer"}
                      </Button>
                      <Badge variant="outline">
                        {dir === "rtl" ? "قريباً" : "Coming soon"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* مزادات المورد */}
                <Card className="border-dashed bg-card/70">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <Gavel className="h-4 w-4 text-primary" />
                      {dir === "rtl" ? "المزادات" : "Auctions"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <p>
                      {dir === "rtl"
                        ? "يمكنك إطلاق مزادات على الكميات الكبيرة مع تحديد وقت البداية والنهاية وسعر البداية."
                        : "You will be able to launch auctions for bulk quantities with start/end time and starting price."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" disabled>
                        {dir === "rtl" ? "إنشاء مزاد" : "Create auction"}
                      </Button>
                      <Badge variant="outline">
                        {dir === "rtl" ? "قريباً" : "Coming soon"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
