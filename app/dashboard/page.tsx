"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BarChart3, Activity, ListChecks } from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      const meta: any = data.user.user_metadata || {};
      const role = meta.role as "admin" | "supplier" | "client" | undefined;
      const isActive = meta.is_active ?? true;

      if (role !== "admin" || !isActive) {
        await supabase.auth.signOut();
        router.push("/login");
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-sm text-muted-foreground">
        جارٍ التحقق من صلاحيات الأدمن...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* كرت ملخص عام مصفّر */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">ملخص المنصة</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            لا توجد بيانات معروضة حالياً. سيتم عرض إحصائيات عامة عن المنصة هنا عند توفر بيانات حقيقية.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">عدد العملاء</p>
            <p className="text-2xl font-semibold">-</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">عدد الموردين</p>
            <p className="text-2xl font-semibold">-</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">إجمالي الطلبات</p>
            <p className="text-2xl font-semibold">-</p>
          </div>
        </CardContent>
      </Card>

      {/* صفين: كرت للإحصائيات، كرت للنشاط، كرت للأقسام */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* إحصائيات المبيعات */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              إحصائيات المبيعات
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              سيتم عرض الرسم البياني للمبيعات اليومية والشهرية هنا عند ربط البيانات.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 sm:h-52 rounded-md border border-dashed flex items-center justify-center text-xs sm:text-sm text-muted-foreground">
              لا توجد بيانات مبيعات متاحة حالياً.
            </div>
          </CardContent>
        </Card>

        {/* آخر النشاط */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Activity className="h-5 w-5 text-primary" />
              آخر النشاط
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              سيظهر هنا أحدث العمليات (تسجيل مورد، إنشاء عرض، طلب جديد) عند توفر بيانات.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground">
              لا يوجد نشاط حديث مسجل حالياً.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* كرت للأقسام أو الملاحظات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <ListChecks className="h-5 w-5 text-primary" />
            ملاحظات ومساحات مستقبلية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-muted-foreground">
            يمكن استخدام هذه اللوحة لاحقاً لعرض أقسام إضافية مثل إدارة المستخدمين، مراجعة الطلبات، أو مراقبة أداء الموردين.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
