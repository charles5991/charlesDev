"use client"

import { Jobs } from "@/app/work/components/jobs"
import { WorkShell } from "@/app/work/components/work-shell"
import { Heading } from "@/components/heading"
import { defaultVariants } from "@/components/motion.variants"
import { Text } from "@/components/text"
import { useLocale } from "@/contexts/locale-context"

const DownloadIcon = () => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="h-5 w-5 animate-bounce"
   >
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
   </svg>
)

export default function WorkPage() {
   const { locale, t } = useLocale()

   return (
      <section>
         <Heading className="mb-1 mt-0">
            {t("My work experience", "我的工作经历")}
         </Heading>

         <WorkShell
            initial="hidden"
            animate="visible"
            variants={defaultVariants}
         >
            <p>
               {t(
                  "Learn more about my work experience, my focus areas, and what I'm currently working on.",
                  "了解更多关于我的工作经历、专注领域以及我目前正在做的事情。",
               )}
            </p>
            <div className="flex flex-wrap gap-2">
               <button className="flex items-center justify-center gap-2 border border-opacity-[0.03] bg-neutral-200/50 px-3 filter backdrop-blur-xl dark:bg-neutral-900/75">
                  <a
                     href="/cv.pdf"
                     download
                     className="flex items-center gap-2"
                  >
                     <Text>{t("Resume", "英文简历")}</Text>
                     <DownloadIcon />
                  </a>
               </button>
               <button className="flex items-center justify-center gap-2 border border-opacity-[0.03] bg-neutral-200/50 px-3 filter backdrop-blur-xl dark:bg-neutral-900/75">
                  <a
                     href="/cv_cn.pdf"
                     download
                     className="flex items-center gap-2"
                  >
                     <Text>{t("Traditional Chinese", "繁体简历")}</Text>
                     <DownloadIcon />
                  </a>
               </button>
               <button className="flex items-center justify-center gap-2 border border-opacity-[0.03] bg-neutral-200/50 px-3 filter backdrop-blur-xl dark:bg-neutral-900/75">
                  <a
                     href="/cv_cn2.pdf"
                     download
                     className="flex items-center gap-2"
                  >
                     <Text>{t("Simplified Chinese", "简体简历")}</Text>
                     <DownloadIcon />
                  </a>
               </button>
            </div>
            <Jobs locale={locale} />
         </WorkShell>
      </section>
   )
}
