import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  // إما نحولهم مباشرة لتسجيل الدخول
  redirect("/login");

  // أو لو تبي تظهر رسالة بدل redirect، استخدم الكود التالي واحذف redirect:
  // return (
  //   <div className="min-h-screen flex items-center justify-center">
  //     <p className="text-sm text-muted-foreground">
  //       صفحة التسجيل غير متاحة حالياً، يرجى استخدام بيانات الدخول المرسلة لك.
  //     </p>
  //   </div>
  // );
}
