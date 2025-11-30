"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SalesChart } from "@/components/dashboard/sales-chart";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // تحقق من وجود المستخدم والمسؤولية، عدّل الدور حسب النوع المطلوب للوصول (مثلاً "admin" أو "supplier" أو "client")
      if (!user || user.role !== "admin" || user.is_active !== true) {
        setUnauthorized(true);
        router.push("/login"); // إذا غير مصرح يوجه لتسجيل الدخول
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) return <div>جارِ التحميل والتحقق من الصلاحيات...</div>;
  if (unauthorized) return null;

  return (
    <div className="space-y-6">
      <DashboardStats />
      <div className="grid gap-6 lg:grid-cols-2">
        <SalesChart />
        <RecentActivity />
      </div>
    </div>
  );
}
