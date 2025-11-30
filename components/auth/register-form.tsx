"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslations, useLocale } from "@/contexts/locale-context";
import { Package, AlertCircle, CreditCard, CheckCircle, Home, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function RegisterForm() {
  const t = useTranslations();
  const { dir } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("client");
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

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "supplier" || type === "client") {
      setActiveTab(type);
    }
  }, [searchParams]);

  // التحقق من صحة المدخلات
  // (نفس دوال التحقق الموجودة في كودك)

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^05\d{8}$/.test(phone);

  const validateClientForm = () => {
    const newErrors: Record<string, string> = {};
    if (!clientData.fullName || clientData.fullName.length < 3) newErrors.fullName = dir === "rtl" ? "الاسم يجب أن يكون 3 أحرف على الأقل" : "Name must be at least 3 characters";
    if (!validateEmail(clientData.email)) newErrors.email = dir === "rtl" ? "البريد الإلكتروني غير صحيح" : "Invalid email address";
    if (!validatePhone(clientData.phone)) newErrors.phone = dir === "rtl" ? "رقم الجوال يجب أن يبدأ بـ 05 ويكون 10 أرقام" : "Phone must start with 05 and be 10 digits";
    if (clientData.password.length < 8) newErrors.password = dir === "rtl" ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : "Password must be at least 8 characters";
    if (clientData.password !== clientData.confirmPassword) newErrors.confirmPassword = dir === "rtl" ? "كلمات المرور غير متطابقة" : "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSupplierForm = () => {
    const newErrors: Record<string, string> = {};
    if (!supplierData.fullName || supplierData.fullName.length < 3) newErrors.fullName = dir === "rtl" ? "الاسم يجب أن يكون 3 أحرف على الأقل" : "Name must be at least 3 characters";
    if (!validateEmail(supplierData.email)) newErrors.email = dir === "rtl" ? "البريد الإلكتروني غير صحيح" : "Invalid email address";
    if (!validatePhone(supplierData.phone)) newErrors.phone = dir === "rtl" ? "رقم الجوال يجب أن يبدأ بـ 05 ويكون 10 أرقام" : "Phone must start with 05 and be 10 digits";
    if (!supplierData.company || supplierData.company.length < 3) newErrors.company = dir === "rtl" ? "اسم الشركة مطلوب" : "Company name is required";
    if (!supplierData.taxNumber || supplierData.taxNumber.length < 10) newErrors.taxNumber = dir === "rtl" ? "الرقم الضريبي يجب أن يكون 10 أرقام على الأقل" : "Tax number must be at least 10 digits";
    if (supplierData.password.length < 8) newErrors.password = dir === "rtl" ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : "Password must be at least 8 characters";
    if (supplierData.password !== supplierData.confirmPassword) newErrors.confirmPassword = dir === "rtl" ? "كلمات المرور غير متطابقة" : "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateClientForm()) {
      toast({
        title: dir === "rtl" ? "خطأ في البيانات" : "Validation Error",
        description: dir === "rtl" ? "يرجى تصحيح الأخطاء أدناه" : "Please correct the errors below",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  // تسجيل العميل بعد الدفع الحقيقي أو التجريبي
  const handlePayment = async () => {
    setIsProcessingPayment(true);

    try {
      const response = await fetch(
        "https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/register-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: clientData.email,
            password: clientData.password,
            full_name: clientData.fullName,
            role: "client",
            company: clientData.company,
            phone: clientData.phone,
            language_preference: dir === "rtl" ? "ar" : "en",
          }),
        }
      );
      const result = await response.json();
      if (result.error) {
        toast({
          title: dir === "rtl" ? "خطأ في التسجيل" : "Registration Error",
          description: result.error,
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
        description: dir === "rtl" ? "يرجى تصحيح الأخطاء أدناه" : "Please correct the errors below",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/register-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: supplierData.email,
            password: supplierData.password,
            full_name: supplierData.fullName,
            role: "supplier",
            company: supplierData.company,
            phone: supplierData.phone,
            tax_number: supplierData.taxNumber,
            address: supplierData.address,
            language_preference: dir === "rtl" ? "ar" : "en",
          }),
        }
      );
      const result = await response.json();
      if (result.error) {
        toast({
          title: dir === "rtl" ? "خطأ في التسجيل" : "Registration Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: dir === "rtl" ? "تم التسجيل بنجاح" : "Registration Successful",
        description: dir === "rtl" ? "مرحباً بك في حاوية" : "Welcome to Haawiya",
      });

      router.push("/supplier-dashboard");
    } catch (error) {
      toast({
        title: dir === "rtl" ? "فشل الاتصال" : "Network Error",
        description: String(error),
        variant: "destructive",
      });
    }
  };

  // باقي عناصر الواجهة (نفس التصميم الذي أرسلته)
  // يمكنك الإبقاء على جميع عناصر Card وTabs وقائمة الحقول بدون تعديل إلا ما سبق

  // --- الباقي نفس كودك للعرض والتخزين
  // فقط استبدل عمليات LocalStorage في تقديم النموذج بما سبق

}
