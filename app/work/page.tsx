import { Jobs } from "@/app/work/components/jobs"
import { WorkShell } from "@/app/work/components/work-shell"
import { Heading } from "@/components/heading"
import { defaultVariants } from "@/components/motion.variants"
import { Text } from "@/components/text"

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
            <button className="flex items-center justify-center gap-2 border border-opacity-[0.03] bg-neutral-200/50 px-3 filter backdrop-blur-xl dark:bg-neutral-900/75">
               <a
                  href="/Charles_Chan_-_frontend_oct.pdf"
                  download
                  className="flex items-center gap-2"
               >
                  <Text>Resume</Text>
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
                     ></path>
                  </svg>
               </a>
            </button>
            <Jobs />
         </WorkShell>
      </section>
   )
}
