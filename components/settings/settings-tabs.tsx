"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useTranslations, useLocale } from "@/contexts/locale-context"
import { Globe, Bell, Shield, Building } from "lucide-react"

export function SettingsTabs() {
  const t = useTranslations()
  const { locale, setLocale } = useLocale()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [auctionNotifications, setAuctionNotifications] = useState(true)

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
        <TabsTrigger value="general">
          <Building className="me-2 h-4 w-4" />
          عام
        </TabsTrigger>
        <TabsTrigger value="language">
          <Globe className="me-2 h-4 w-4" />
          اللغة
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="me-2 h-4 w-4" />
          الإشعارات
        </TabsTrigger>
        <TabsTrigger value="security">
          <Shield className="me-2 h-4 w-4" />
          الأمان
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>معلومات المنصة</CardTitle>
            <CardDescription>الإعدادات العامة للمنصة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">اسم المنصة</Label>
              <Input id="platform-name" defaultValue="حاوية" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-email">البريد الإلكتروني</Label>
              <Input id="platform-email" type="email" defaultValue="info@haawiya.sa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-phone">رقم الهاتف</Label>
              <Input id="platform-phone" defaultValue="+966 11 234 5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-address">العنوان</Label>
              <Input id="platform-address" defaultValue="الرياض، المملكة العربية السعودية" />
            </div>
            <Separator />
            <Button className="w-full">حفظ التغييرات</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="language" className="space-y-4">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>{t.languageSettings || "إعدادات اللغة"}</CardTitle>
            <CardDescription>اختر لغة واجهة المنصة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  locale === "ar" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setLocale("ar")}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇸🇦</div>
                  <div>
                    <p className="font-medium">العربية</p>
                    <p className="text-sm text-muted-foreground">Arabic</p>
                  </div>
                </div>
                {locale === "ar" && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                )}
              </div>

              <div
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  locale === "en" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setLocale("en")}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇬🇧</div>
                  <div>
                    <p className="font-medium">English</p>
                    <p className="text-sm text-muted-foreground">الإنجليزية</p>
                  </div>
                </div>
                {locale === "en" && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                اللغة الحالية:{" "}
                <span className="font-medium text-foreground">{locale === "ar" ? "العربية" : "English"}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                الاتجاه:{" "}
                <span className="font-medium text-foreground">
                  {locale === "ar" ? "من اليمين إلى اليسار (RTL)" : "Left to Right (LTR)"}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>{t.notificationSettings || "إعدادات الإشعارات"}</CardTitle>
            <CardDescription>إدارة تفضيلات الإشعارات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">قنوات الإشعارات</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="font-medium">
                      {t.emailNotifications || "إشعارات البريد الإلكتروني"}
                    </Label>
                    <p className="text-sm text-muted-foreground">استقبال الإشعارات عبر البريد الإلكتروني</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications" className="font-medium">
                      {t.smsNotifications || "إشعارات الرسائل النصية"}
                    </Label>
                    <p className="text-sm text-muted-foreground">استقبال الإشعارات عبر الرسائل النصية</p>
                  </div>
                  <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">أنواع الإشعارات</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-notifications" className="font-medium">
                      إشعارات الطلبات
                    </Label>
                    <p className="text-sm text-muted-foreground">تنبيهات عند استلام أو تحديث الطلبات</p>
                  </div>
                  <Switch
                    id="order-notifications"
                    checked={orderNotifications}
                    onCheckedChange={setOrderNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="auction-notifications" className="font-medium">
                      إشعارات المزادات
                    </Label>
                    <p className="text-sm text-muted-foreground">تنبيهات عند بدء أو انتهاء المزادات</p>
                  </div>
                  <Switch
                    id="auction-notifications"
                    checked={auctionNotifications}
                    onCheckedChange={setAuctionNotifications}
                  />
                </div>
              </div>
            </div>

            <Separator />
            <Button className="w-full">حفظ التغييرات</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>الأمان وكلمة المرور</CardTitle>
            <CardDescription>إدارة إعدادات الأمان والحساب</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">كلمة المرور الحالية</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Separator />
            <Button className="w-full">تحديث كلمة المرور</Button>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">المصادقة الثنائية</h3>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="font-medium">تفعيل المصادقة الثنائية</Label>
                  <p className="text-sm text-muted-foreground">إضافة طبقة حماية إضافية لحسابك</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
