"use client"

import { useLocale } from "@/contexts/locale-context"
import { motion } from "framer-motion"

export function LocaleToggle() {
   const { locale, setLocale } = useLocale()
   const isZh = locale === "zh"

   return (
      <button
         type="button"
         onClick={() => setLocale(isZh ? "en" : "zh")}
         aria-label="Toggle language"
         className="relative flex h-8 items-center gap-0.5 rounded-full border border-neutral-200 bg-neutral-100/60 px-1 text-xs font-medium dark:border-white/10 dark:bg-neutral-800/60"
      >
         {/* Sliding pill */}
         <motion.span
            layout
            layoutId="locale-pill"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-y-1 w-[calc(50%-2px)] rounded-full bg-white shadow-sm dark:bg-neutral-600"
            style={{ left: isZh ? "calc(50% + 2px)" : "2px" }}
         />

         <span
            className={`relative z-10 w-8 text-center transition-colors duration-200 ${
               !isZh
                  ? "text-neutral-800 dark:text-white"
                  : "text-neutral-400 dark:text-neutral-500"
            }`}
         >
            EN
         </span>
         <span
            className={`relative z-10 w-8 text-center transition-colors duration-200 ${
               isZh
                  ? "text-neutral-800 dark:text-white"
                  : "text-neutral-400 dark:text-neutral-500"
            }`}
         >
            中
         </span>
      </button>
   )
}
