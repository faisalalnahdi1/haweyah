"use client"

import { useState } from "react"
import { Search, MoreVertical, CheckCircle, XCircle, RotateCcw, Pencil } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "@/contexts/locale-context"
import { mockUsers, type User } from "@/lib/auth"

const additionalUsers: User[] = [
  ...mockUsers,
  {
    id: "4",
    name: "نورة الدوسري",
    email: "noura@supplier.sa",
    role: "supplier",
    company: "شركة الدوسري للمواد الغذائية",
    phone: "+966501112222",
    status: "active",
  },
  {
    id: "5",
    name: "عبدالله الشمري",
    email: "abdullah@client.sa",
    role: "client",
    company: "سلسلة مطاعم النخيل",
    phone: "+966503334444",
    status: "active",
  },
  {
    id: "6",
    name: "ريم القحطاني",
    email: "reem@supplier.sa",
    role: "supplier",
    company: "مؤسسة القحطاني التجارية",
    phone: "+966505556666",
    status: "inactive",
  },
]

export function UsersTable() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [users, setUsers] = useState(additionalUsers)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "inactive" : ("active" as "active" | "inactive") }
          : user,
      ),
    )
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="default">{t.admin || "أدمن"}</Badge>
      case "supplier":
        return <Badge variant="secondary">{t.supplier || "مورد"}</Badge>
      case "client":
        return <Badge variant="outline">{t.client || "عميل"}</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:gap-4">
          <CardTitle className="text-lg sm:text-xl">{t.userManagement || "إدارة المستخدمين"}</CardTitle>
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="relative w-full">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.search || "بحث..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 h-10 sm:h-11"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-32 h-10">
                  <SelectValue placeholder="الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأدوار</SelectItem>
                  <SelectItem value="admin">أدمن</SelectItem>
                  <SelectItem value="supplier">مورد</SelectItem>
                  <SelectItem value="client">عميل</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32 h-10">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px] sm:min-w-[150px]">{t.name || "الاسم"}</TableHead>
                <TableHead className="min-w-[150px] sm:min-w-[200px]">{t.email || "البريد الإلكتروني"}</TableHead>
                <TableHead className="min-w-[120px] sm:min-w-[150px]">{t.company || "الشركة"}</TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[120px]">{t.phone || "الهاتف"}</TableHead>
                <TableHead className="min-w-[80px]">{t.userRole || "الدور"}</TableHead>
                <TableHead className="min-w-[80px]">{t.status || "الحالة"}</TableHead>
                <TableHead className="text-center min-w-[80px]">{t.actions || "الإجراءات"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium whitespace-nowrap">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{user.email}</TableCell>
                  <TableCell className="whitespace-nowrap">{user.company || "-"}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{user.phone || "-"}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    {user.status === "active" ? (
                      <Badge variant="default" className="bg-green-600 whitespace-nowrap">
                        <CheckCircle className="me-1 h-3 w-3" />
                        {t.active || "نشط"}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="whitespace-nowrap">
                        <XCircle className="me-1 h-3 w-3" />
                        {t.inactive || "غير نشط"}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="touch-manipulation">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t.actions || "الإجراءات"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Pencil className="me-2 h-4 w-4" />
                          {t.edit || "تعديل"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                          {user.status === "active" ? (
                            <>
                              <XCircle className="me-2 h-4 w-4" />
                              {t.deactivateUser || "إلغاء تفعيل"}
                            </>
                          ) : (
                            <>
                              <CheckCircle className="me-2 h-4 w-4" />
                              {t.activateUser || "تفعيل"}
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RotateCcw className="me-2 h-4 w-4" />
                          {t.resetPassword || "إعادة تعيين كلمة المرور"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="py-8 sm:py-12 text-center text-sm sm:text-base text-muted-foreground">
            لا توجد نتائج مطابقة
          </div>
        )}
      </CardContent>
    </Card>
  )
}
