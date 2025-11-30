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
import { Store } from "lucide-react";

export default function ClientDashboardPage() {
  const { dir } = useLocale();
  const router = useRouter();
  const [name, setName] = useState<string>("...");
  const [loadingUser, setLoadingUser] = useState(true);

  // لاحقاً نربطه فعلياً بسوبابيس لقراءة الموردين ومنتجاتهم
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

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
        data.user.email?.split("@")[0] || (dir === "rtl" ? "العميل" : "Client");

      setName(fullName || fallback);
      setLoadingUser(false);
    }

    loadUser();
  }, [router, dir]);

  return (
    <div className="min-h-screen bg-muted/10 px-4 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* هيدر بسيط */}
        <header className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold">
            {dir === "rtl" ? "لوحة تحكم العميل" : "Client Dashboard"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {loadingUser
              ? dir === "rtl"
                ? "جاري تحميل بيانات الحساب..."
                : "Loading account data..."
              : dir === "rtl"
              ? `مرحباً، ${name}`
              : `Welcome, ${name}`}
          </p>
        </header>

        {/* تصفح الموردين واختيار واحد ثم استعراض المنتجات اليومية */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Store className="h-5 w-5 text-primary" />
              {dir === "rtl"
                ? "تصفح الموردين والمنتجات اليومية"
                : "Browse Suppliers & Daily Products"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* اختيار المورد */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {dir === "rtl"
                  ? "اختر المورد الذي تريده، ثم ستظهر المنتجات اليومية الخاصة به في الأسفل."
                  : "Select a supplier to see their daily products listed below."}
              </p>

              <div className="flex flex-wrap gap-2">
                {["مورد تجريبي 1", "مورد تجريبي 2", "مورد تجريبي 3"].map(
                  (supplier) => (
                    <Button
                      key={supplier}
                      type="button"
                      size="sm"
                      variant={
                        selectedSupplier === supplier ? "default" : "outline"
                      }
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      {supplier}
                    </Button>
                  ),
                )}
                <Badge variant="outline" className="text-[10px] sm:text-xs">
                  {dir === "rtl"
                    ? "سيتم تحميل قائمة الموردين تلقائياً من قاعدة البيانات لاحقاً."
                    : "The suppliers list will be loaded automatically from the database later."}
                </Badge>
              </div>
            </div>

            {/* المنتجات اليومية للمورد المختار */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm font-medium">
                  {selectedSupplier
                    ? dir === "rtl"
                      ? `المنتجات اليومية – ${selectedSupplier}`
                      : `Daily products – ${selectedSupplier}`
                    : dir === "rtl"
                    ? "اختر مورداً لعرض المنتجات اليومية."
                    : "Select a supplier to view daily products."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card overflow-hidden flex flex-col"
                  >
                    <div className="w-full h-24 sm:h-28 bg-muted flex items-center justify-center text-[10px] sm:text-xs text-muted-foreground">
                      {dir === "rtl" ? "صورة منتج" : "Product image"}
                    </div>
                    <div className="p-3 space-y-1.5 flex-1 flex flex-col">
                      <div className="h-3.5 w-24 bg-muted rounded-sm" />
                      <div className="h-2.5 w-20 bg-muted rounded-sm" />
                      <div className="h-2.5 w-16 bg-muted rounded-sm mb-2" />
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-auto h-8 text-[11px]"
                        disabled
                      >
                        {dir === "rtl"
                          ? "تفاصيل"
                          : "Details"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
