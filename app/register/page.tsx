import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

// هذا السطر هو الحل الجذري: يجبر الصفحة أن تكون ديناميكية بالكامل
// مما يمنع خطأ البناء المسبق (Prerender Error)
export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 py-8">
      <Suspense fallback={<div className="p-4 text-center">جارٍ التحميل...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
