"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type Locale = "en" | "zh"

type LocaleContextType = {
   locale: Locale
   setLocale: (locale: Locale) => void
   t: (en: string, zh: string) => string
}

const LocaleContext = createContext<LocaleContextType>({
   locale: "en",
   setLocale: () => {},
   t: (en) => en,
})

export function LocaleProvider({ children }: { children: React.ReactNode }) {
   const [locale, setLocaleState] = useState<Locale>("en")

   useEffect(() => {
      const stored = localStorage.getItem("locale") as Locale | null
      if (stored === "en" || stored === "zh") {
         setLocaleState(stored)
      }
   }, [])

   const setLocale = (l: Locale) => {
      setLocaleState(l)
      localStorage.setItem("locale", l)
   }

   const t = (en: string, zh: string) => (locale === "zh" ? zh : en)

   return (
      <LocaleContext.Provider value={{ locale, setLocale, t }}>
         {children}
      </LocaleContext.Provider>
   )
}

export function useLocale() {
   return useContext(LocaleContext)
}
