export type Locale = "ar" | "en"

export const translations = {
  ar: {
    // App Name
    appName: "حاوية",

    // Auth
    login: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",

    // Navigation
    dashboard: "لوحة التحكم",
    users: "المستخدمين",
    offers: "العروض",
    auctions: "المزادات",
    orders: "الطلبات",
    analytics: "التحليلات",
    notifications: "الإشعارات",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",

    // Roles
    admin: "أدمن",
    supplier: "مورد",
    client: "عميل",

    // Common
    search: "بحث",
    filter: "تصفية",
    export: "تصدير",
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    confirm: "تأكيد",
    active: "نشط",
    inactive: "غير نشط",
    pending: "قيد الانتظار",
    approved: "موافق عليه",
    rejected: "مرفوض",
    status: "الحالة",
    actions: "الإجراءات",
    name: "الاسم",
    description: "الوصف",
    date: "التاريخ",
    price: "السعر",
    quantity: "الكمية",
    total: "الإجمالي",

    // Dashboard
    totalUsers: "إجمالي المستخدمين",
    totalOrders: "إجمالي الطلبات",
    totalRevenue: "إجمالي الإيرادات",
    activeAuctions: "المزادات النشطة",
    recentActivity: "النشاط الأخير",

    // User Management
    userManagement: "إدارة المستخدمين",
    addUser: "إضافة مستخدم",
    editUser: "تعديل مستخدم",
    activateUser: "تفعيل المستخدم",
    deactivateUser: "إلغاء تفعيل المستخدم",
    resetPassword: "إعادة تعيين كلمة المرور",
    userRole: "دور المستخدم",
    phone: "الهاتف",
    company: "الشركة",

    // Offers
    offerManagement: "إدارة العروض",
    addOffer: "إضافة عرض",
    editOffer: "تعديل عرض",
    offerDetails: "تفاصيل العرض",
    productName: "اسم المنتج",
    category: "الفئة",
    validUntil: "صالح حتى",

    // Auctions
    auctionManagement: "إدارة المزادات",
    addAuction: "إضافة مزاد",
    currentBid: "العرض الحالي",
    startingPrice: "السعر الابتدائي",
    endTime: "وقت الانتهاء",
    bidHistory: "تاريخ العروض",
    placeBid: "تقديم عرض",

    // Orders
    orderManagement: "إدارة الطلبات",
    orderDetails: "تفاصيل الطلب",
    orderNumber: "رقم الطلب",
    customer: "العميل",
    orderDate: "تاريخ الطلب",
    deliveryDate: "تاريخ التسليم",

    // Notifications
    notificationCenter: "مركز الإشعارات",
    markAsRead: "وضع علامة كمقروء",
    clearAll: "مسح الكل",

    // Settings
    platformSettings: "إعدادات المنصة",
    languageSettings: "إعدادات اللغة",
    notificationSettings: "إعدادات الإشعارات",
    emailNotifications: "إشعارات البريد الإلكتروني",
    smsNotifications: "إشعارات الرسائل النصية",
    changeLanguage: "تغيير اللغة",
  },
  en: {
    // App Name
    appName: "Haawiya",

    // Auth
    login: "Login",
    email: "Email",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",

    // Navigation
    dashboard: "Dashboard",
    users: "Users",
    offers: "Offers",
    auctions: "Auctions",
    orders: "Orders",
    analytics: "Analytics",
    notifications: "Notifications",
    settings: "Settings",
    logout: "Logout",

    // Roles
    admin: "Admin",
    supplier: "Supplier",
    client: "Client",

    // Common
    search: "Search",
    filter: "Filter",
    export: "Export",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    status: "Status",
    actions: "Actions",
    name: "Name",
    description: "Description",
    date: "Date",
    price: "Price",
    quantity: "Quantity",
    total: "Total",

    // Dashboard
    totalUsers: "Total Users",
    totalOrders: "Total Orders",
    totalRevenue: "Total Revenue",
    activeAuctions: "Active Auctions",
    recentActivity: "Recent Activity",

    // User Management
    userManagement: "User Management",
    addUser: "Add User",
    editUser: "Edit User",
    activateUser: "Activate User",
    deactivateUser: "Deactivate User",
    resetPassword: "Reset Password",
    userRole: "User Role",
    phone: "Phone",
    company: "Company",

    // Offers
    offerManagement: "Offer Management",
    addOffer: "Add Offer",
    editOffer: "Edit Offer",
    offerDetails: "Offer Details",
    productName: "Product Name",
    category: "Category",
    validUntil: "Valid Until",

    // Auctions
    auctionManagement: "Auction Management",
    addAuction: "Add Auction",
    currentBid: "Current Bid",
    startingPrice: "Starting Price",
    endTime: "End Time",
    bidHistory: "Bid History",
    placeBid: "Place Bid",

    // Orders
    orderManagement: "Order Management",
    orderDetails: "Order Details",
    orderNumber: "Order Number",
    customer: "Customer",
    orderDate: "Order Date",
    deliveryDate: "Delivery Date",

    // Notifications
    notificationCenter: "Notification Center",
    markAsRead: "Mark as Read",
    clearAll: "Clear All",

    // Settings
    platformSettings: "Platform Settings",
    languageSettings: "Language Settings",
    notificationSettings: "Notification Settings",
    emailNotifications: "Email Notifications",
    smsNotifications: "SMS Notifications",
    changeLanguage: "Change Language",
  },
}

export function getTranslations(locale: Locale) {
  return translations[locale]
}
