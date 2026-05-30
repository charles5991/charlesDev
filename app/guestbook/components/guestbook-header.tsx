"use client"

import { Heading } from "@/components/heading"
import { useLocale } from "@/contexts/locale-context"

export function GuestbookHeader({ userName }: { userName?: string | null }) {
   const { t } = useLocale()
   return (
      <Heading>
         {userName && (
            <>
               <span>{t(`Hi ${userName} 👋 `, `你好 ${userName} 👋 `)}</span> <br />
            </>
         )}
         {t("Leave a mark by signing my guestbook", "在我的留言板上留下您的足迹")}
      </Heading>
   )
}
