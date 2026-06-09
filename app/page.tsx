import { Cards } from "@/components/cards"
import Donuts from "@/components/donuts"
import { HomeContent } from "@/app/home-content"
import { db } from "@/app/db"
import { sql } from "drizzle-orm"

export default function Home() {
   // Warm up the database connection pool early in the background
   db.execute(sql`SELECT 1`).catch(() => {})

   return (
      <section>
         <HomeContent />

         <Cards />
         <div className="hidden md:block">
            {" "}
            <Donuts />
         </div>
      </section>
   )
}

export const revalidate = 3600
