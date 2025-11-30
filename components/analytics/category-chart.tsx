"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "خضروات", value: 4500, color: "oklch(0.55 0.15 145)" },
  { name: "فواكه", value: 3200, color: "oklch(0.65 0.12 165)" },
  { name: "منتجات ألبان", value: 2800, color: "oklch(0.45 0.18 125)" },
  { name: "حبوب", value: 1900, color: "oklch(0.75 0.08 155)" },
  { name: "أخرى", value: 1200, color: "oklch(0.35 0.2 135)" },
]

export function CategoryChart() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>المبيعات حسب الفئة</CardTitle>
        <CardDescription>توزيع المبيعات على فئات المنتجات</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
