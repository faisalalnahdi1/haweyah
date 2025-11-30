import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { Package, ShoppingCart, Gavel, TrendingUp, Users, Shield, Tag } from "lucide-react"
import { FeaturedOffers } from "@/components/home/featured-offers"
import { FeaturedAuctions } from "@/components/home/featured-auctions"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-primary rounded-lg">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">حاوية</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Haawiya</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
            <LanguageToggle />
            <Link href="/browse" className="hidden sm:inline-block">
              <Button variant="ghost" size="sm">
                تصفح المنتجات
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/register" className="hidden xs:inline-block">
              <Button size="sm" className="text-xs sm:text-sm">
                إنشاء حساب
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
          منصة الجملة الرائدة في المملكة
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-balance px-4">
          اربط موردي المواد الغذائية مع العملاء من خلال منصة متكاملة للعروض والمزادات
        </p>
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-stretch xs:items-center max-w-md xs:max-w-none mx-auto px-4">
          <Link href="/register?type=client" className="flex-1 xs:flex-initial">
            <Button size="lg" className="w-full xs:w-auto text-base sm:text-lg h-11 sm:h-12 px-6 sm:px-8">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 me-2" />
              ابدأ كعميل
            </Button>
          </Link>
          <Link href="/register?type=supplier" className="flex-1 xs:flex-initial">
            <Button
              size="lg"
              variant="outline"
              className="w-full xs:w-auto text-base sm:text-lg h-11 sm:h-12 px-6 sm:px-8 bg-transparent"
            >
              <Package className="h-4 w-4 sm:h-5 sm:w-5 me-2" />
              انضم كمورد
            </Button>
          </Link>
          <Link href="/browse" className="flex-1 xs:flex-initial">
            <Button
              size="lg"
              variant="secondary"
              className="w-full xs:w-auto text-base sm:text-lg h-11 sm:h-12 px-6 sm:px-8"
            >
              <Tag className="h-4 w-4 sm:h-5 sm:w-5 me-2" />
              تصفح العروض
            </Button>
          </Link>
        </div>
      </section>

      <FeaturedOffers />

      <FeaturedAuctions />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-5 sm:p-6 rounded-lg border bg-card">
            <div className="inline-flex p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
              <Gavel className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">مزادات حية</h3>
            <p className="text-sm sm:text-base text-muted-foreground">شارك في مزادات تنافسية للحصول على أفضل الأسعار</p>
          </div>
          <div className="text-center p-5 sm:p-6 rounded-lg border bg-card">
            <div className="inline-flex p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">عروض مميزة</h3>
            <p className="text-sm sm:text-base text-muted-foreground">اكتشف عروضاً حصرية من موردين موثوقين</p>
          </div>
          <div className="text-center p-5 sm:p-6 rounded-lg border bg-card sm:col-span-2 lg:col-span-1">
            <div className="inline-flex p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">آمن وموثوق</h3>
            <p className="text-sm sm:text-base text-muted-foreground">معاملات آمنة ونظام مدفوعات محمي</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 text-center">
        <div className="max-w-2xl mx-auto p-6 sm:p-8 lg:p-10 rounded-2xl bg-primary/5 border-2 border-primary/20">
          <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">انضم إلى شبكتنا اليوم</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            أكثر من 1000 مورد وعميل يثقون بمنصة حاوية
          </p>
          <Link href="/register">
            <Button size="lg" className="text-base sm:text-lg h-11 sm:h-12 px-6 sm:px-8 w-full xs:w-auto">
              ابدأ الآن
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-12 sm:mt-16 lg:mt-20 py-6 sm:py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm sm:text-base text-muted-foreground">
          <p>© 2025 حاوية (Haawiya). جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
