import { Jobs } from "@/app/work/components/jobs"
import { WorkShell } from "@/app/work/components/work-shell"
import { Heading } from "@/components/heading"
import { defaultVariants } from "@/components/motion.variants"

export const metadata = {
   title: "Work - Charles",
   description:
      "Learn more about my work experience and what I'm currently working on.",
}

export default async function WorkPage() {
   return (
      <section>
         <Heading className="mb-1 mt-0">My work experience</Heading>

         <WorkShell
            initial="hidden"
            animate="visible"
            variants={defaultVariants}
         >
            <p>
               Learn more about my work experience, my focus areas, and what
               I&apos;m currently working on.
            </p>
            <a href="/Charles_Chan_-_frontend_oct.pdf" download>
               <button className="flex w-[150px] cursor-pointer justify-between rounded-full bg-transparent px-3 py-2 tracking-wider text-white shadow-xl duration-500 hover:scale-105 hover:bg-gray-900 hover:ring-1">
                  Resume
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="2"
                     stroke="currentColor"
                     className="h-5 w-5 animate-bounce"
                  >
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                     ></path>
                  </svg>
               </button>
            </a>
            <Jobs />
         </WorkShell>
      </section>
   )
}
