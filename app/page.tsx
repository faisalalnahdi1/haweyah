import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { Package, ShoppingCart, Building2 } from "lucide-react"
import { FeaturedOffersHome } from "@/components/home/featured-offers"
import { FeaturedAuctionsHome } from "@/components/home/featured-auctions"

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
              <h1 className="text-xl sm:text-2xl font-bold text-primary">
                حاوية
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Haawiya
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
          حاوية سوق الجملة الافتراضية
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-balance px-4">
          منصة احترافية تجمع الموردين، المصانع، وتجار الجملة في مكان واحد
          لعرض المنتجات اليومية، العروض الخاصة، والمزادات بطريقة منظمة وسهلة.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto px-4">
          <Link href="/register" className="flex-1 sm:flex-initial">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg h-11 sm:h-12 px-6 sm:px-8"
            >
              سجّل الآن
            </Button>
          </Link>
          <Link href="/login" className="flex-1 sm:flex-initial">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base sm:text-lg h-11 sm:h-12 px-6 sm:px-8 bg-transparent"
            >
              تسجيل الدخول
            </Button>
          </Link>
        </div>
      </section>

      {/* عروض من Supabase مع حالة عدم وجود بيانات */}
      <FeaturedOffersHome />

      {/* مزادات من Supabase مع حالة عدم وجود بيانات */}
      <FeaturedAuctionsHome />

      {/* مميزات العملاء والموردين */}
      <section className="container mx-auto px-4 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* مميزات للعملاء */}
          <div className="rounded-2xl border bg-card/60 backdrop-blur p-6 sm:p-8 h-full flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  مميزات حاوية للعملاء
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  تجربة شراء جملة أسهل وأوضح لفرق المشتريات.
                </p>
              </div>
            </div>
            <ul className="text-sm sm:text-base text-muted-foreground space-y-3 list-disc ps-5">
              <li>الوصول إلى أفضل أسعار الجملة في السوق المحلي من موردين متعددين.</li>
              <li>استكشاف العروض الخاصة والمزادات في منصة واحدة بدل التواصل المتفرق.</li>
              <li>تصفّح المنتجات اليومية لكل مورد مع صور واضحة وتصنيفات منظّمة.</li>
            </ul>
          </div>

          {/* مميزات للموردين */}
          <div className="rounded-2xl border bg-card/60 backdrop-blur p-6 sm:p-8 h-full flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  مميزات حاوية للموردين
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  قناة رقمية للوصول لتجّار الجملة والعملاء التجاريين.
                </p>
              </div>
            </div>
            <ul className="text-sm sm:text-base text-muted-foreground space-y-3 list-disc ps-5">
              <li>عرض المنتجات اليومية والعروض الخاصة والمزادات من لوحة تحكم واحدة.</li>
              <li>الوصول إلى قاعدة عملاء مهتمّة بالشراء بالجملة داخل السوق المحلي.</li>
              <li>تسويق المخزون الزائد من خلال عروض موقّتة ومزادات منظمة.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* تعريف بسيط في الأسفل */}
      <section className="container mx-auto px-4 pb-12 sm:pb-16 lg:pb-20 text-center">
        <div className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground space-y-2">
          <p>
            حاوية هي سوق جملة افتراضي يربط الموردين والمصانع مع تجار الجملة
            والعملاء التجاريين في منصة واحدة.
          </p>
          <p>
            يمكنك كعميل استكشاف المنتجات اليومية، العروض الخاصة، والمزادات،
            ويمكنك كمورد عرض مخزونك وإدارة عروضك بسهولة.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-8 sm:mt-10 lg:mt-12 py-6 sm:py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm sm:text-base text-muted-foreground">
          <p>© 2025 حاوية (Haawiya). جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
