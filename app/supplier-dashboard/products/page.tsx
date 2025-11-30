"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SupplierProductsPage() {
  const { dir } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")

  const products = [
    {
      id: 1,
      name: "طماطم طازجة",
      nameEn: "Fresh Tomatoes",
      category: "خضروات",
      categoryEn: "Vegetables",
      stock: 500,
      price: 45,
      status: "active",
    },
    {
      id: 2,
      name: "أرز بسمتي",
      nameEn: "Basmati Rice",
      category: "حبوب",
      categoryEn: "Grains",
      stock: 1200,
      price: 120,
      status: "active",
    },
    {
      id: 3,
      name: "زيت زيتون",
      nameEn: "Olive Oil",
      category: "زيوت",
      categoryEn: "Oils",
      stock: 300,
      price: 180,
      status: "active",
    },
    {
      id: 4,
      name: "بطاطس مصرية",
      nameEn: "Egyptian Potatoes",
      category: "خضروات",
      categoryEn: "Vegetables",
      stock: 800,
      price: 35,
      status: "active",
    },
    {
      id: 5,
      name: "موز فلبيني",
      nameEn: "Philippine Bananas",
      category: "فواكه",
      categoryEn: "Fruits",
      stock: 0,
      price: 55,
      status: "out-of-stock",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{dir === "rtl" ? "منتجاتي" : "My Products"}</h1>
          <p className="text-muted-foreground">{dir === "rtl" ? "إدارة جميع منتجاتك" : "Manage all your products"}</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {dir === "rtl" ? "إضافة منتج" : "Add Product"}
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={dir === "rtl" ? "البحث عن منتج..." : "Search products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-start p-4 font-semibold">{dir === "rtl" ? "المنتج" : "Product"}</th>
                <th className="text-start p-4 font-semibold">{dir === "rtl" ? "الفئة" : "Category"}</th>
                <th className="text-start p-4 font-semibold">{dir === "rtl" ? "المخزون" : "Stock"}</th>
                <th className="text-start p-4 font-semibold">{dir === "rtl" ? "السعر" : "Price"}</th>
                <th className="text-start p-4 font-semibold">{dir === "rtl" ? "الحالة" : "Status"}</th>
                <th className="text-start p-4 font-semibold">{dir === "rtl" ? "الإجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{dir === "rtl" ? product.name : product.nameEn}</td>
                  <td className="p-4">{dir === "rtl" ? product.category : product.categoryEn}</td>
                  <td className="p-4">
                    {product.stock > 0 ? (
                      <span>
                        {product.stock} {dir === "rtl" ? "كجم" : "kg"}
                      </span>
                    ) : (
                      <span className="text-destructive">{dir === "rtl" ? "نفذ" : "Out of stock"}</span>
                    )}
                  </td>
                  <td className="p-4 font-semibold text-primary">
                    {product.price} {dir === "rtl" ? "ر.س" : "SAR"}
                  </td>
                  <td className="p-4">
                    <Badge variant={product.status === "active" ? "default" : "secondary"}>
                      {product.status === "active"
                        ? dir === "rtl"
                          ? "نشط"
                          : "Active"
                        : dir === "rtl"
                          ? "نفذ المخزون"
                          : "Out of Stock"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align={dir === "rtl" ? "start" : "end"}>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 me-2" />
                          {dir === "rtl" ? "تعديل" : "Edit"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 me-2" />
                          {dir === "rtl" ? "حذف" : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
