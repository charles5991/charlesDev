import { Cards } from "@/components/cards"
import { Heading } from "@/components/heading"
import { Text } from "@/components/text"
import Link from "next/link"

export default function Home() {
   return (
      <section>
         <Heading>Hi, I&apos;m Charles ✌️</Heading>

         <section className="prose prose-neutral mt-8 max-w-full dark:prose-invert">
            <Text>
               I&apos;m a frontend developer with a passion for building
               beautiful and functional applications. I currently{" "}
               <Link href={"/work"}>
                  <span className="text-neutral-400">/</span>work
               </Link>{" "}
               as a Frontend developer at{" "}
               <a href="https://www.plazapremiumlounge.com/en-uk">
                  Plaza Premium Group
               </a>{" "}
               - world’s first and largest award-winning independent airport
               lounge network., building a rewards redeeming platform{" "}
               <a href="https://www.mysmarttraveller.com/en-gb/home">
                  Smart Traveller
               </a>{" "}
               .
            </Text>
         </section>

         <Cards />
      </section>
   )
}

export const revalidate = 3600
