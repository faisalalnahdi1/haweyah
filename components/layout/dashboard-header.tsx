"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/contexts/locale-context"

export function DashboardHeader() {
  const t = useTranslations()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b-2 border-border bg-background px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{t.dashboard || "لوحة التحكم"}</h2>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -end-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-3">
          <div className="text-end">
            <p className="text-sm font-medium">أحمد محمد</p>
            <p className="text-xs text-muted-foreground">{t.admin || "أدمن"}</p>
          </div>
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">أم</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
