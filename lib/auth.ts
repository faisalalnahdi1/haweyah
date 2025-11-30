export type UserRole = "admin" | "supplier" | "client"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  company?: string
  phone?: string
  status: "active" | "inactive"
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isAuthenticated") === "true"
}

export function getUserRole(): UserRole | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("userRole") as UserRole | null
}

export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem("isAuthenticated")
  localStorage.removeItem("userRole")
  window.location.href = "/login"
}

// Mock user data for demo
export const mockUsers: User[] = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "admin@haawiya.sa",
    role: "admin",
    company: "حاوية",
    phone: "+966501234567",
    status: "active",
  },
  {
    id: "2",
    name: "فاطمة العلي",
    email: "fatima@supplier.sa",
    role: "supplier",
    company: "مؤسسة العلي للتموين",
    phone: "+966507654321",
    status: "active",
  },
  {
    id: "3",
    name: "خالد السالم",
    email: "khaled@client.sa",
    role: "client",
    company: "مطاعم السالم",
    phone: "+966509876543",
    status: "active",
  },
]
