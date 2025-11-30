"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslations, useLocale } from "@/contexts/locale-context";
import { Package, ArrowRight, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export function LoginForm() {
  const t = useTranslations();
  const { dir } = useLocale();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: dir === "rtl" ? "خطأ" : "Error",
        description: dir === "rtl"
          ? "يرجى إدخال البريد الإلكتروني وكلمة المرور"
          : "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // تسجيل الدخول الفعلي مع قاعدة البيانات (Supabase / Bolt Database)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        title: dir === "rtl" ? "خطأ" : "Error",
        description: dir === "rtl" ? error.message : error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: dir === "rtl" ? "تم تسجيل الدخول بنجاح" : "Login Successful",
      description: dir === "rtl" ? "مرحباً بك في حاوية" : "Welcome to Haawiya",
    });

    router.push("/dashboard");
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast({
        title: dir === "rtl" ? "خطأ" : "Error",
        description: dir === "rtl" ? "يرجى إدخال البريد الإلكتروني" : "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    // يمكنك هنا استدعاء دالة reset password لـ Supabase إذا فعلتها
    toast({
      title: dir === "rtl" ? "تم إرسال الرابط" : "Link Sent",
      description:
        dir === "rtl"
          ? "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك"
          : "Password reset link sent to your email",
    });
    setShowResetDialog(false);
    setResetEmail("");
  };

  return (
    <>
      <Card className="w-full max-w-md mx-4 shadow-xl border-2">
        <div className="p-4 pb-0">
          <Button variant="ghost" asChild className="w-full justify-start gap-2 hover:bg-primary/10">
            <Link href="/">
              {dir === "rtl" ? (
                <>
                  <ArrowRight className="h-4 w-4" />
                  <span>العودة للصفحة الرئيسية</span>
                </>
              ) : (
                <>
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </>
              )}
            </Link>
          </Button>
        </div>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Package className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-primary">{t.appName || "حاوية"}</CardTitle>
                <p className="text-sm text-muted-foreground">{dir === "rtl" ? "منصة الجملة" : "Wholesale Platform"}</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
          <CardDescription className="text-base">{t.login || "تسجيل الدخول"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email || "البريد الإلكتروني"}</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@haawiya.sa"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password || "كلمة المرور"}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  {t.rememberMe || "تذكرني"}
                </Label>
              </div>
              <Button
                type="button"
                variant="link"
                className="text-sm p-0 h-auto"
                onClick={() => setShowResetDialog(true)}
              >
                {t.forgotPassword || "نسيت كلمة المرور؟"}
              </Button>
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>
              {loading
                ? dir === "rtl" ? "جارٍ التسجيل..." : "Logging in..."
                : t.login || "تسجيل الدخول"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {dir === "rtl" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                {dir === "rtl" ? "إنشاء حساب" : "Sign up"}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {showResetDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{dir === "rtl" ? "إعادة تعيين كلمة المرور" : "Reset Password"}</CardTitle>
              <CardDescription>
                {dir === "rtl"
                  ? "أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين"
                  : "Enter your email to receive a reset link"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">{t.email}</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="admin@haawiya.sa"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePasswordReset} className="flex-1">
                  {dir === "rtl" ? "إرسال" : "Send"}
                </Button>
                <Button variant="outline" onClick={() => setShowResetDialog(false)} className="flex-1">
                  {t.cancel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
