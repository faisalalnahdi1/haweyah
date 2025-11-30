"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Locale } from "@/lib/i18n"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  dir: "rtl" | "ltr"
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar")
  const dir = locale === "ar" ? "rtl" : "ltr"

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    document.documentElement.setAttribute("lang", newLocale)
    document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr")
  }

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && (savedLocale === "ar" || savedLocale === "en")) {
      setLocaleState(savedLocale)
      document.documentElement.setAttribute("lang", savedLocale)
      document.documentElement.setAttribute("dir", savedLocale === "ar" ? "rtl" : "ltr")
    } else {
      document.documentElement.setAttribute("lang", "ar")
      document.documentElement.setAttribute("dir", "rtl")
    }
  }, [])

  return <LocaleContext.Provider value={{ locale, setLocale, dir }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

export function useTranslations() {
  const { locale } = useLocale()
  const [translations, setTranslations] = useState<Record<string, string>>({})

  useEffect(() => {
    import("@/lib/i18n").then((module) => {
      setTranslations(module.getTranslations(locale))
    })
  }, [locale])

  return translations
}
