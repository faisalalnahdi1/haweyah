"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "@/contexts/locale-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "يناير", sales: 45000 },
  { name: "فبراير", sales: 52000 },
  { name: "مارس", sales: 48000 },
  { name: "أبريل", sales: 61000 },
  { name: "مايو", sales: 55000 },
  { name: "يونيو", sales: 67000 },
]

export function SalesChart() {
  const t = useTranslations()

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>المبيعات الشهرية</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Bar dataKey="sales" fill="oklch(0.55 0.15 145)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
