"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gavel } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

type Auction = {
  id: number;
  title_ar: string | null;
  title_en: string | null;
  status: string | null;
};

export function FeaturedAuctionsHome() {
  const { dir } = useLocale();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAuctions() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("auctions")
          .select("id, title_ar, title_en, status")
          .in("status", ["live", "upcoming"])
          .limit(6);

        if (error) {
          console.log("FEATURED_AUCTIONS_ERROR", error);
          setError(
            dir === "rtl"
              ? "تعذّر تحميل المزادات حالياً."
              : "Failed to load auctions."
          );
          setAuctions([]);
        } else {
          setAuctions(data || []);
        }
      } catch (err) {
        console.log("FEATURED_AUCTIONS_FATAL", err);
        setError(
          dir === "rtl"
            ? "حدث خطأ غير متوقع أثناء تحميل المزادات."
            : "Unexpected error while loading auctions."
        );
        setAuctions([]);
      } finally {
        setLoading(false);
      }
    }

    loadAuctions();
  }, [dir]);

  const statusLabel = (status: string | null) => {
    if (!status) return dir === "rtl" ? "غير محدد" : "Unknown";
    if (status === "live")
      return dir === "rtl" ? "مزاد حي" : "Live auction";
    if (status === "upcoming")
      return dir === "rtl" ? "قادِم" : "Upcoming";
    if (status === "ended") return dir === "rtl" ? "منتهي" : "Ended";
    return status;
  };

  return (
    <section className="container mx-auto px-4 pb-12 sm:pb-16 lg:pb-20">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Gavel className="h-5 w-5 text-primary" />
          {dir === "rtl" ? "المزادات" : "Auctions"}
        </h3>
        <Link href="/browse">
          <Button variant="ghost" className="text-sm">
            {dir === "rtl" ? "تصفّح المزادات" : "Browse auctions"}
          </Button>
        </Link>
      </div>

      <p className="text-sm sm:text-base text-muted-foreground mb-4">
        {dir === "rtl"
          ? "هنا ستظهر المزادات الحقيقية للموردين. حالياً نعرض البيانات المتوفرة من Supabase أو حالة عدم وجود مزادات."
          : "This section shows real supplier auctions from Supabase, or an empty state if none exist yet."}
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
                <div className="h-4 w-28 bg-muted rounded-sm mb-1" />
                <div className="h-3 w-36 bg-muted rounded-sm mb-2" />
                <div className="h-3 w-24 bg-muted rounded-sm mb-4" />
                <div className="mt-auto h-9 w-28 bg-muted rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : auctions.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-center text-sm sm:text-base text-muted-foreground">
          {dir === "rtl"
            ? "لا توجد مزادات نشطة حالياً. ستظهر المزادات هنا فور إنشائها من الموردين."
            : "There are no active auctions right now. Auctions will appear here as soon as suppliers create them."}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {auctions.map((auction) => (
            <Card
              key={auction.id}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="w-full h-32 sm:h-40 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                {dir === "rtl" ? "صورة منتج للمزاد" : "Auction product image"}
              </div>
              <CardContent className="p-4 flex-1 flex flex-col space-y-2">
                <h4 className="font-semibold text-base sm:text-lg">
                  {dir === "rtl"
                    ? auction.title_ar || "مزاد بدون عنوان"
                    : auction.title_en ||
                      auction.title_ar ||
                      "Untitled auction"}
                </h4>
                <Badge className="w-fit">
                  {statusLabel(auction.status)}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto"
                  asChild
                >
                  <Link href="/browse">
                    {dir === "rtl" ? "تصفّح المزاد" : "View auction"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
