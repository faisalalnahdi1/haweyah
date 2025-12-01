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

      if (signUpError || !signUpData.user) {
        let messageAr = "فشل إنشاء الحساب";
        let messageEn = "Failed to create account";
        const raw = signUpError?.message?.toLowerCase() ?? "";

        if (raw.includes("password")) {
           messageAr = "كلمة المرور ضعيفة";
           messageEn = "Weak password";
        } else if (raw.includes("email")) {
           messageAr = "البريد مسجل مسبقاً";
           messageEn = "Email already exists";
        }

        toast({
          title: dir === "rtl" ? "خطأ" : "Error",
          description: dir === "rtl" ? messageAr : messageEn,
          variant: "destructive",
        });
        setIsProcessingPayment(false);
        return;
      }

      toast({
        title: dir === "rtl" ? "تم الاشتراك بنجاح" : "Success",
        description: dir === "rtl" ? "مرحباً بك في حاوية" : "Welcome to Haawiya",
      });

      router.push("/client-dashboard");
    } catch (error) {
      toast({
        title: dir === "rtl" ? "خطأ" : "Error",
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
        description: dir === "rtl" ? "يرجى تصحيح الأخطاء" : "Check errors",
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

      if (signUpError || !signUpData.user) {
         toast({
          title: dir === "rtl" ? "خطأ" : "Error",
          description: signUpError?.message,
          variant: "destructive",
        });
        setIsProcessingPayment(false);
        return;
      }

      toast({
        title: dir === "rtl" ? "تم التسجيل بنجاح" : "Success",
        description: dir === "rtl" ? "مرحباً بك" : "Welcome",
      });

      router.push("/supplier-dashboard");
    } catch (error) {
      toast({
        title: dir === "rtl" ? "خطأ" : "Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-4 shadow-xl border-2">
      <div className="p-4 pb-0 flex justify-between items-center">
        <Button variant="ghost" asChild className="justify-start gap-2 hover:bg-primary/10">
          <Link href="/">
            {dir === "rtl" ? <><ArrowRight className="h-4 w-4" /><span>الرئيسية</span></> : <><Home className="h-4 w-4" /><span>Home</span></>}
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
            <CardTitle className="text-2xl font-bold text-primary">{t.appName || "حاوية"}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-base">
          {dir === "rtl" ? "تسجيل حساب جديد" : "Create new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "client" | "supplier")}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="client">{dir === "rtl" ? "عميل" : "Client"}</TabsTrigger>
            <TabsTrigger value="supplier">{dir === "rtl" ? "مورد" : "Supplier"}</TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <form onSubmit={handleClientSubmit} className="space-y-4">
               <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "الاسم" : "Name"}</Label>
                    <Input value={clientData.fullName} onChange={e => setClientData({...clientData, fullName: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "المنشأة" : "Company"}</Label>
                    <Input value={clientData.company} onChange={e => setClientData({...clientData, company: e.target.value})} />
                 </div>
               </div>
               <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-1">
                    <Label>{t.email}</Label>
                    <Input type="email" value={clientData.email} onChange={e => setClientData({...clientData, email: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "الجوال" : "Phone"}</Label>
                    <Input value={clientData.phone} onChange={e => setClientData({...clientData, phone: e.target.value})} />
                 </div>
               </div>
               <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-1">
                    <Label>{t.password}</Label>
                    <Input type="password" value={clientData.password} onChange={e => setClientData({...clientData, password: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "تأكيد كلمة المرور" : "Confirm"}</Label>
                    <Input type="password" value={clientData.confirmPassword} onChange={e => setClientData({...clientData, confirmPassword: e.target.value})} />
                 </div>
               </div>
               
               <Button type="submit" className="w-full">{dir === "rtl" ? "متابعة" : "Continue"}</Button>
            </form>
             {showPayment && (
                <div className="mt-6 border rounded-lg p-4 space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    {dir === "rtl" ? "بوابة دفع تجريبية" : "Test Payment"}
                  </p>
                  <Button className="w-full" onClick={handlePayment} disabled={isProcessingPayment}>
                    {isProcessingPayment ? "..." : (dir === "rtl" ? "إتمام" : "Complete")}
                  </Button>
                </div>
              )}
          </TabsContent>

          <TabsContent value="supplier">
             <form onSubmit={handleSupplierSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "الاسم" : "Name"}</Label>
                    <Input value={supplierData.fullName} onChange={e => setSupplierData({...supplierData, fullName: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "الشركة" : "Company"}</Label>
                    <Input value={supplierData.company} onChange={e => setSupplierData({...supplierData, company: e.target.value})} />
                 </div>
               </div>
                <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-1">
                    <Label>{t.email}</Label>
                    <Input type="email" value={supplierData.email} onChange={e => setSupplierData({...supplierData, email: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "الجوال" : "Phone"}</Label>
                    <Input value={supplierData.phone} onChange={e => setSupplierData({...supplierData, phone: e.target.value})} />
                 </div>
               </div>
               <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "الرقم الضريبي" : "Tax ID"}</Label>
                    <Input value={supplierData.taxNumber} onChange={e => setSupplierData({...supplierData, taxNumber: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "العنوان" : "Address"}</Label>
                    <Input value={supplierData.address} onChange={e => setSupplierData({...supplierData, address: e.target.value})} />
                 </div>
               </div>
                <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-1">
                    <Label>{t.password}</Label>
                    <Input type="password" value={supplierData.password} onChange={e => setSupplierData({...supplierData, password: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <Label>{dir === "rtl" ? "تأكيد كلمة المرور" : "Confirm"}</Label>
                    <Input type="password" value={supplierData.confirmPassword} onChange={e => setSupplierData({...supplierData, confirmPassword: e.target.value})} />
                 </div>
               </div>
               <Button type="submit" className="w-full" disabled={isProcessingPayment}>
                 {isProcessingPayment ? "..." : (dir === "rtl" ? "تسجيل" : "Register")}
               </Button>
             </form>
          </TabsContent>
        </Tabs>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            {t.login}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
