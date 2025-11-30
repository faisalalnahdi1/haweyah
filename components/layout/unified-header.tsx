"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { useLocale } from "@/contexts/locale-context";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";

type UnifiedHeaderProps = {
  role: "client" | "supplier" | "admin";
  onMenuClick?: () => void;
};

export function UnifiedHeader({ role, onMenuClick }: UnifiedHeaderProps) {
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
        (dir === "rtl" ? "مستخدم" : "User");

      setName(fullName || fallback);
      setLoading(false);
    }

    loadUser();
  }, [router, dir]);

  const roleLabel = () => {
    if (role === "client") {
      return dir === "rtl" ? "عميل" : "Client";
    }
    if (role === "supplier") {
      return dir === "rtl" ? "مورد" : "Supplier";
    }
    if (role === "admin") {
      return dir === "rtl" ? "أدمن" : "Admin";
    }
    return "";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      {/* زر القائمة للجوال */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm font-medium">
            {loading
              ? dir === "rtl"
                ? "جارٍ تحميل الحساب..."
                : "Loading account..."
              : name}
          </p>
          <p className="text-xs text-muted-foreground">{roleLabel()}</p>
        </div>
      </div>

      {/* زر تسجيل الخروج */}
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 text-xs sm:text-sm"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        {dir === "rtl" ? "تسجيل الخروج" : "Logout"}
      </Button>
    </header>
  );
}
