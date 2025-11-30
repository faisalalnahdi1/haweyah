"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: "يناير", revenue: 145000, orders: 234 },
  { month: "فبراير", revenue: 162000, orders: 267 },
  { month: "مارس", revenue: 148000, orders: 251 },
  { month: "أبريل", revenue: 181000, orders: 298 },
  { month: "مايو", revenue: 195000, orders: 321 },
  { month: "يونيو", revenue: 207000, orders: 345 },
]

export function RevenueChart() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>الإيرادات والطلبات</CardTitle>
        <CardDescription>تطور الإيرادات وعدد الطلبات خلال الستة أشهر الماضية</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="oklch(0.55 0.15 145)"
              strokeWidth={2}
              name="الإيرادات (ر.س)"
            />
            <Line type="monotone" dataKey="orders" stroke="oklch(0.65 0.12 165)" strokeWidth={2} name="الطلبات" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
