"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

type Offer = {
  id: number;
  title_ar: string | null;
  title_en: string | null;
  price: number | null;
};

export function FeaturedOffersHome() {
  const { dir } = useLocale();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOffers() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("offers")
          .select("id, title_ar, title_en, price")
          .eq("is_active", true)
          .limit(6);

        if (error) {
          console.log("FEATURED_OFFERS_ERROR", error);
          setError(
            dir === "rtl"
              ? "تعذّر تحميل العروض حالياً."
              : "Failed to load offers."
          );
          setOffers([]);
        } else {
          setOffers(data || []);
        }
      } catch (err) {
        console.log("FEATURED_OFFERS_FATAL", err);
        setError(
          dir === "rtl"
            ? "حدث خطأ غير متوقع أثناء تحميل العروض."
            : "Unexpected error while loading offers."
        );
        setOffers([]);
      } finally {
        setLoading(false);
      }
    }

    loadOffers();
  }, [dir]);

  return (
    <section className="container mx-auto px-4 pb-10 sm:pb-12 lg:pb-14">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          {dir === "rtl" ? "العروض الخاصة" : "Featured Offers"}
        </h3>
        <Link href="/browse">
          <Button variant="ghost" className="text-sm">
            {dir === "rtl" ? "تصفّح العروض" : "Browse offers"}
          </Button>
        </Link>
      </div>

      <p className="text-sm sm:text-base text-muted-foreground mb-4">
        {dir === "rtl"
          ? "استكشف شكل العروض الخاصة كما ستظهر في المنصة. البيانات الفعلية تُعرض تلقائياً عند إضافتها من الموردين."
          : "See how special offers will look in the platform. Real data will appear automatically when suppliers add offers."}
      </p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border bg-card overflow-hidden flex flex-col animate-pulse"
            >
              <div className="w-full h-32 sm:h-40 bg-muted" />
              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <div className="h-4 w-24 bg-muted rounded-sm" />
                <div className="h-3 w-32 bg-muted rounded-sm" />
                <div className="h-3 w-20 bg-muted rounded-sm mb-2" />
                <div className="mt-auto h-9 w-24 bg-muted rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : offers.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-center text-sm sm:text-base text-muted-foreground">
          {dir === "rtl"
            ? "لا توجد عروض خاصة متاحة حالياً. ستظهر العروض هنا فور إضافتها من الموردين."
            : "There are no special offers available right now. Offers will appear here as soon as suppliers add them."}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-lg border bg-card overflow-hidden flex flex-col"
            >
              <div className="w-full h-32 sm:h-40 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                {dir === "rtl" ? "صورة منتج" : "Product image"}
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <h4 className="font-semibold text-base sm:text-lg">
                  {dir === "rtl"
                    ? offer.title_ar || "عرض بدون عنوان"
                    : offer.title_en || offer.title_ar || "Untitled offer"}
                </h4>
                {offer.price !== null && (
                  <p className="text-sm text-primary font-semibold">
                    {dir === "rtl"
                      ? `${offer.price.toLocaleString()} ر.س`
                      : `${offer.price.toLocaleString()} SAR`}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto"
                  asChild
                >
                  <Link href="/browse">
                    {dir === "rtl" ? "تصفّح" : "Browse"}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
