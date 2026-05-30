import { Cards } from "@/components/cards"
import Donuts from "@/components/donuts"
import { HomeContent } from "@/app/home-content"

export default function Home() {
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
