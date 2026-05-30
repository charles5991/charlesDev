"use client"

import { Heading } from "@/components/heading"
import { Text } from "@/components/text"
import { useLocale } from "@/contexts/locale-context"
import Link from "next/link"

export function HomeContent() {
   const { t } = useLocale()

   return (
      <>
         <Heading>{t("Hi, I'm Charles ✌️", "你好，我是 Charles ✌️")}</Heading>

         <section className="prose prose-neutral mt-8 max-w-full dark:prose-invert">
            <Text>
               {t(
                  "I'm a frontend developer with a passion for building beautiful and functional applications. I currently ",
                  "我是一名前端开发工程师，热衷于构建美观且实用的应用程序。我目前",
               )}
               <Link href={"/work"}>
                  <span className="text-neutral-400">/</span>
                  {t("work", "就职")}
               </Link>{" "}
               {t("as a Frontend Lead at ", "于 ")}
               <a href="https://pixelate-everything.com/">
                  Pixelate Everything
               </a>
               {t(
                  ", architecting and scaling a high-throughput, white-label iGaming platform.",
                  "，担任前端负责人，负责架构和扩展高吞吐量的白标 iGaming 平台。"
               )}
            </Text>
         </section>
      </>
   )
}
