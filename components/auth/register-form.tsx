"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslations, useLocale } from "@/contexts/locale-context";
import {
  Package,
  AlertCircle,
  CreditCard,
  Home,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function RegisterForm() {
  const t = useTranslations();
  const { dir } = useLocale();
  const router = useRouter();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"client" | "supplier">("client");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [clientData, setClientData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [supplierData, setSupplierData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    taxNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // التحقق من صحة المدخلات
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^05\d{8}$/.test(phone);

  const validateClientForm = () => {
    const newErrors: Record<string, string> = {};
    if (!clientData.fullName || clientData.fullName.length < 3)
      newErrors.fullName =
        dir === "rtl"
          ? "الاسم يجب أن يكون 3 أحرف على الأقل"
          : "Name must be at least 3 characters";
    if (!validateEmail(clientData.email))
      newErrors.email =
        dir === "rtl"
          ? "البريد الإلكتروني غير صحيح"
          : "Invalid email address";
    if (!validatePhone(clientData.phone))
      newErrors.phone =
        dir === "rtl"
          ? "رقم الجوال يجب أن يبدأ بـ 05 ويكون 10 أرقام"
          : "Phone must start with 05 and be 10 digits";
    if (!clientData.company || clientData.company.length < 3)
      newErrors.company =
        dir === "rtl"
          ? "اسم المنشأة مطلوب"
          : "Company name is required";
    if (clientData.password.length < 8)
      newErrors.password =
        dir === "rtl"
          ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
          : "Password must be at least 8 characters";
    if (clientData.password !== clientData.confirmPassword)
      newErrors.confirmPassword =
        dir === "rtl"
          ? "كلمات المرور غير متطابقة"
          : "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSupplierForm = () => {
    const newErrors: Record<string, string> = {};
    if (!supplierData.fullName || supplierData.fullName.length < 3)
      newErrors.fullName =
        dir === "rtl"
          ? "الاسم يجب أن يكون 3 أحرف على الأقل"
          : "Name must be at least 3 characters";
    if (!validateEmail(supplierData.email))
      newErrors.email =
        dir === "rtl"
          ? "البريد الإلكتروني غير صحيح"
          : "Invalid email address";
    if (!validatePhone(supplierData.phone))
      newErrors.phone =
        dir === "rtl"
          ? "رقم الجوال يجب أن يبدأ بـ 05 ويكون 10 أرقام"
          : "Phone must start with 05 and be 10 digits";
    if (!supplierData.company || supplierData.company.length < 3)
      newErrors.company =
        dir === "rtl"
          ? "اسم الشركة مطلوب"
          : "Company name is required";
    if (!supplierData.taxNumber || supplierData.taxNumber.length < 10)
      newErrors.taxNumber =
        dir === "rtl"
          ? "الرقم الضريبي يجب أن يكون 10 أرقام على الأقل"
          : "Tax number must be at least 10 digits";
    if (supplierData.password.length < 8)
      newErrors.password =
        dir === "rtl"
          ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
          : "Password must be at least 8 characters";
    if (supplierData.password !== supplierData.confirmPassword)
      newErrors.confirmPassword =
        dir === "rtl"
          ? "كلمات المرور غير متطابقة"
          : "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // عميل: أولاً نتحقق من النموذج، ثم نُظهر شاشة الدفع التجريبية
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateClientForm()) {
      toast({
        title: dir === "rtl" ? "خطأ في البيانات" : "Validation Error",
        description:
          dir === "rtl"
            ? "يرجى تصحيح الأخطاء أدناه"
            : "Please correct the errors below",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  // تسجيل العميل بعد "الدفع" (تجريبي الآن)
  const handlePayment = async () => {
    setIsProcessingPayment(true);
    setErrors({});

    try {
      const {
        data: signUpData,
        error: signUpError,
      } = await supabase.auth.signUp({
        email: clientData.email,
        password: clientData.password,
        options: {
          data: {
            full_name: clientData.fullName,
            phone: clientData.phone,
            role: "client",
            company_name: clientData.company,
            is_active: true,
          },
        },
      });

      console.log("CLIENT_SIGNUP_ERROR", signUpError, signUpData);

      if (signUpError || !signUpData.user) {
        let messageAr = "فشل إنشاء الحساب، يرجى التحقق من البيانات";
        let messageEn = "Failed to create account, please check your data";

        const raw = signUpError?.message?.toLowerCase() ?? "";

        if (raw.includes("password") && raw.includes("at least")) {
          messageAr =
            "كلمة المرور لا تحقق متطلبات الأمان (تأكد من الطول والشروط).";
          messageEn = "Password does not meet security requirements.";
        } else if (raw.includes("email") && raw.includes("already")) {
          messageAr = "هذا البريد مسجّل مسبقاً، جرّب تسجيل الدخول.";
          messageEn =
            "This email is already registered, please log in instead.";
        }

        toast({
          title: dir === "rtl" ? "خطأ في التسجيل" : "Registration Error",
          description: dir === "rtl" ? messageAr : messageEn,
          variant: "destructive",
        });
        setIsProcessingPayment(false);
        return;
      }

      toast({
        title: dir === "rtl" ? "تم الاشتراك بنجاح" : "Subscription Successful",
        description: dir === "rtl" ? "مرحباً بك في حاوية" : "Welcome to Haawiya",
      });

      router.push("/client-dashboard");
    } catch (error) {
      console.log("CLIENT_SIGNUP_FATAL", error);
      toast({
        title: dir === "rtl" ? "فشل الاتصال" : "Network Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSupplierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSupplierForm()) {
      toast({
        title: dir === "rtl" ? "خطأ في البيانات" : "Validation Error",
        description:
          dir === "rtl"
            ? "يرجى تصحيح الأخطاء أدناه"
            : "Please correct the errors below",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);
    setErrors({});

    try {
      const {
        data: signUpData,
        error: signUpError,
      } = await supabase.auth.signUp({
        email: supplierData.email,
        password: supplierData.password,
        options: {
          data: {
            full_name: supplierData.fullName,
            phone: supplierData.phone,
            role: "supplier",
            company_name: supplierData.company,
            tax_number: supplierData.taxNumber,
            address: supplierData.address,
            is_active: true,
          },
        },
      });

      console.log("SUPPLIER_SIGNUP_ERROR", signUpError, signUpData);

      if (signUpError || !signUpData.user) {
        let messageAr = "فشل إنشاء الحساب، يرجى التحقق من البيانات";
        let messageEn = "Failed to create account, please check your data";

        const raw = signUpError?.message?.toLowerCase() ?? "";

        if (raw.includes("password") && raw.includes("at least")) {
          messageAr =
            "كلمة المرور لا تحقق متطلبات الأمان (تأكد من الطول والشروط).";
          messageEn = "Password does not meet security requirements.";
        } else if (raw.includes("email") && raw.includes("already")) {
          messageAr = "هذا البريد مسجّل مسبقاً، جرّب تسجيل الدخول.";
          messageEn =
            "This email is already registered, please log in instead.";
        }

        toast({
          title: dir === "rtl" ? "خطأ في التسجيل" : "Registration Error",
          description: dir === "rtl" ? messageAr : messageEn,
          variant: "destructive",
        });
        setIsProcessingPayment(false);
        return;
      }

      toast({
        title: dir === "rtl" ? "تم التسجيل بنجاح" : "Registration Successful",
        description: dir === "rtl" ? "مرحباً بك في حاوية" : "Welcome to Haawiya",
      });

      router.push("/supplier-dashboard");
    } catch (error) {
      console.log("SUPPLIER_SIGNUP_FATAL", error);
      toast({
        title: dir === "rtl" ? "فشل الاتصال" : "Network Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-4 shadow-xl border-2">
        <div className="p-4 pb-0 flex justify-between items-center">
          <Button
            variant="ghost"
            asChild
            className="justify-start gap-2 hover:bg-primary/10"
          >
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
          <LanguageToggle />
        </div>
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Package className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">
                {t.appName || "حاوية"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {dir === "rtl" ? "منصة الجملة B2B" : "B2B Wholesale Platform"}
              </p>
            </div>
          </div>
          <CardDescription className="text-base">
            {dir === "rtl"
              ? "أنشئ حساب عميل باشتراك شهري أو حساب مورد"
              : "Create a client (subscription) or supplier account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {dir === "rtl"
                  ? "يرجى تصحيح الأخطاء في النموذج."
                  : "Please fix the errors in the form."}
              </AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as "client" | "supplier")}
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="client">
                {dir === "rtl" ? "عميل (اشتراك شهري)" : "Client (Subscription)"}
              </TabsTrigger>
              <TabsTrigger value="supplier">
                {dir === "rtl" ? "مورد" : "Supplier"}
              </TabsTrigger>
            </TabsList>

            {/* تبويب العميل */}
            <TabsContent value="client">
              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="client-fullName">
                      {dir === "rtl" ? "الاسم الكامل" : "Full Name"}
                    </Label>
                    <Input
                      id="client-fullName"
                      value={clientData.fullName}
                      onChange={(e) =>
                        setClientData((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }))
                      }
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="client-company">
                      {dir === "rtl" ? "اسم المنشأة" : "Company Name"}
                    </Label>
                    <Input
                      id="client-company"
                      value={clientData.company}
                      onChange={(e) =>
                        setClientData((p) => ({
                          ...p,
                          company: e.target.value,
                        }))
                      }
                    />
                    {errors.company && (
                      <p className="text-xs text-red-500">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="client-email">
                      {t.email || "البريد الإلكتروني"}
                    </Label>
                    <Input
                      id="client-email"
                      type="email"
                      value={clientData.email}
                      onChange={(e) =>
                        setClientData((p) => ({
                          ...p,
                          email: e.target.value,
                        }))
                      }
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="client-phone">
                      {dir === "rtl" ? "رقم الجوال" : "Phone Number"}
                    </Label>
                    <Input
                      id="client-phone"
                      value={clientData.phone}
                      onChange={(e) =>
                        setClientData((p) => ({
                          ...p,
                          phone: e.target.value,
                        }))
                      }
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="client-password">
                      {t.password || "كلمة المرور"}
                    </Label>
                    <Input
                      id="client-password"
                      type="password"
                      value={clientData.password}
                      onChange={(e) =>
                        setClientData((p) => ({
                          ...p,
                          password: e.target.value,
                        }))
                      }
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="client-confirmPassword">
                      {dir === "rtl" ? "تأكيد كلمة المرور" : "Confirm Password"}
                    </Label>
                    <Input
                      id="client-confirmPassword"
                      type="password"
                      value={clientData.confirmPassword}
                      onChange={(e) =>
                        setClientData((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <Alert className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <AlertDescription className="flex-1">
                    {dir === "rtl"
                      ? "سيتم تفعيل اشتراكك الشهري (تجريبي حالياً بدون بوابة دفع حقيقية)."
                      : "Your monthly subscription will be activated (test mode for now)."}
                  </AlertDescription>
                  <Badge variant="outline">
                    {dir === "rtl" ? "تجريبي" : "Test"}
                  </Badge>
                </Alert>

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold"
                >
                  {dir === "rtl" ? "متابعة للدفع" : "Continue to Payment"}
                </Button>
              </form>

              {showPayment && (
                <div className="mt-6 border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <p className="font-semibold">
                      {dir === "rtl"
                        ? "بوابة دفع تجريبية"
                        : "Test Payment Gateway"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {dir === "rtl"
                      ? "سيتم إنشاء حسابك كعميل مشترك بعد إتمام هذه الخطوة (بدون دفع حقيقي حالياً)."
                      : "Your client subscription account will be created after this step (no real payment for now)."}
                  </p>
                  <Button
                    className="w-full h-11"
                    onClick={handlePayment}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment
                      ? dir === "rtl"
                        ? "جارٍ إنشاء الحساب..."
                        : "Creating account..."
                      : dir === "rtl"
                      ? "إتمام الاشتراك"
                      : "Complete Subscription"}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* تبويب المورد */}
            <TabsContent value="supplier">
              <form onSubmit={handleSupplierSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="supplier-fullName">
                      {dir === "rtl" ? "الاسم الكامل" : "Full Name"}
                    </Label>
                    <Input
                      id="supplier-fullName"
                      value={supplierData.fullName}
                      onChange={(e) =>
                        setSupplierData((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }))
                      }
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="supplier-company">
                      {dir === "rtl" ? "اسم الشركة" : "Company Name"}
                    </Label>
                    <Input
                      id="supplier-company"
                      value={supplierData.company}
                      onChange={(e) =>
                        setSupplierData((p) => ({
                          ...p,
                          company: e.target.value,
                        }))
                      }
                    />
                    {errors.company && (
                      <p className="text-xs text-red-500">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="supplier-email">
                      {t.email || "البريد الإلكتروني"}
                    </Label>
                    <Input
                      id="supplier-email"
                      type="email"
                      value={supplierData.email}
                      onChange={(e) =>
                        setSupplierData((p) => ({
                          ...p,
                          email: e.target.value,
                        }))
                      }
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="supplier-phone">
                      {dir === "rtl" ? "رقم الجوال" : "Phone Number"}
                    </Label>
                    <Input
                      id="supplier-phone"
                      value={supplierData.phone}
                      onChange={(e) =>
                        setSupplierData((p) => ({
                          ...p,
                          phone: e.target.value,
                        }))
                      }
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="supplier-taxNumber">
                      {dir === "rtl" ? "الرقم الضريبي" : "Tax Number"}
                    </Label>
                    <Input
                      id="supplier-taxNumber"
                      value={supplierData.taxNumber}
                      onChange={(e) =>
                        setSupplierData((p) => ({
                          ...p,
                          taxNumber: e.target.value,
                        }))
                      }
                    />
                    {errors.taxNumber && (
                      <p className="text-xs text-red-500">
                        {errors.taxNumber}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="supplier-address">
                      {dir === "rtl" ? "العنوان" : "Address"}
                    </Label>
                    <Input
                      id="supplier-address"
                      value={supplierData.address}
                      onChange={(e) =>
                        setSupplierData((p) => ({
                          ...p,
                          address: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="supplier-password">
                      {t.password || "كلمة المرور"}
                    </Label>
                    <Input
                      id="supplier-password"
                      type="password"
                      value={supplierData.password}
                      onChange={(e) =>
                        setSupplierData((p) => ({
                          ...p,
                          password: e.target.value,
                        }))
                      }
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="supplier-confirmPassword">
                      {dir === "rtl" ? "تأكيد كلمة المرور" : "Confirm Password"}
                    </Label>
                    <Input
                      id="supplier-confirmPassword"
                      type="password"
                      value={supplierData.confirmPassword}
                      onChange={(e) =>
                        setSupplierData((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <Alert className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    {dir === "rtl"
                      ? "سيتم مراجعة حساب المورد من قبل الإدارة لاحقاً."
                      : "Supplier accounts may be reviewed by admin later."}
                  </AlertDescription>
                </Alert>

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold"
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment
                    ? dir === "rtl"
                      ? "جارٍ إنشاء الحساب..."
                      : "Creating account..."
                    : dir === "rtl"
                    ? "تسجيل كمورد"
                    : "Register as Supplier"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {dir === "rtl" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              {t.login || "تسجيل الدخول"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
