"use client";

import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

// هذا يمنع الخطأ ويجبر الصفحة تكون ديناميكية
export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
