"use client"

import { useState, useEffect } from "react"
import { Search, MoreVertical, Eye, Hammer, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "@/contexts/locale-context"

interface Auction {
  id: string
  productName: string
  supplier: string
  startingPrice: string
  currentBid: string
  bidsCount: number
  endTime: string
  status: "active" | "ending-soon" | "ended"
}

const mockAuctions: Auction[] = [
  {
    id: "1",
    productName: "بطاطس مستوردة - طن واحد",
    supplier: "نورة الدوسري",
    startingPrice: "8,000 ر.س",
    currentBid: "9,500 ر.س",
    bidsCount: 12,
    endTime: "2025-01-24T18:00:00",
    status: "active",
  },
  {
    id: "2",
    productName: "موز إكوادوري - 500 كجم",
    supplier: "فاطمة العلي",
    startingPrice: "3,500 ر.س",
    currentBid: "4,200 ر.س",
    bidsCount: 8,
    endTime: "2025-01-24T14:00:00",
    status: "ending-soon",
  },
  {
    id: "3",
    productName: "فلفل أخضر - 750 كجم",
    supplier: "ريم القحطاني",
    startingPrice: "4,000 ر.س",
    currentBid: "5,100 ر.س",
    bidsCount: 15,
    endTime: "2025-01-25T20:00:00",
    status: "active",
  },
  {
    id: "4",
    productName: "خيار طازج - 600 كجم",
    supplier: "نورة الدوسري",
    startingPrice: "2,500 ر.س",
    currentBid: "3,800 ر.س",
    bidsCount: 6,
    endTime: "2025-01-23T12:00:00",
    status: "ended",
  },
]

function TimeRemaining({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const distance = end - now

      if (distance < 0) {
        setTimeLeft("انتهى")
        clearInterval(timer)
        return
      }

      const hours = Math.floor(distance / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

      if (hours > 24) {
        const days = Math.floor(hours / 24)
        setTimeLeft(`${days} يوم`)
      } else if (hours > 0) {
        setTimeLeft(`${hours} ساعة ${minutes} دقيقة`)
      } else {
        setTimeLeft(`${minutes} دقيقة`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return <span>{timeLeft}</span>
}

export function AuctionsTable() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAuctions = mockAuctions.filter(
    (auction) =>
      auction.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.supplier.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-600">
            <Clock className="me-1 h-3 w-3" />
            نشط
          </Badge>
        )
      case "ending-soon":
        return (
          <Badge variant="default" className="bg-orange-600">
            <Clock className="me-1 h-3 w-3" />
            ينتهي قريباً
          </Badge>
        )
      case "ended":
        return <Badge variant="secondary">انتهى</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>{t.auctionManagement || "إدارة المزادات"}</CardTitle>
          <div className="relative flex-1 md:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.search || "بحث..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pe-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.productName || "اسم المنتج"}</TableHead>
                <TableHead>المورد</TableHead>
                <TableHead>{t.startingPrice || "السعر الابتدائي"}</TableHead>
                <TableHead>{t.currentBid || "العرض الحالي"}</TableHead>
                <TableHead>عدد العروض</TableHead>
                <TableHead>الوقت المتبقي</TableHead>
                <TableHead>{t.status || "الحالة"}</TableHead>
                <TableHead className="text-center">{t.actions || "الإجراءات"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell className="font-medium">{auction.productName}</TableCell>
                  <TableCell className="text-muted-foreground">{auction.supplier}</TableCell>
                  <TableCell className="text-muted-foreground">{auction.startingPrice}</TableCell>
                  <TableCell className="font-semibold text-primary">{auction.currentBid}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Hammer className="h-4 w-4 text-muted-foreground" />
                      <span>{auction.bidsCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <TimeRemaining endTime={auction.endTime} />
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(auction.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t.actions || "الإجراءات"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="me-2 h-4 w-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Hammer className="me-2 h-4 w-4" />
                          {t.placeBid || "تقديم عرض"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
