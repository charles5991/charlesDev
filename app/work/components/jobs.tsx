"use client"

import {
   plaza,
   irace,
   firstpavilion,
   rakuten,
   haiya,
   pixelate,
   getJobField,
   type Job,
} from "@/app/work/data"
import { type Locale } from "@/contexts/locale-context"
import { defaultVariantsNoDelay } from "@/components/motion.variants"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, MotionProps, motion } from "framer-motion"
import React from "react"

const jobs: Job[] = [pixelate, haiya, plaza, irace, firstpavilion, rakuten]

type JobsProps = {
   locale: Locale
}

export function Jobs({ locale }: JobsProps) {
   return (
      <AnimatePresence>
         <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
               hidden: { opacity: 0 },
               visible: {
                  opacity: 1,
                  transition: {
                     delayChildren: 0.25,
                     staggerChildren: 0.1,
                  },
               },
            }}
            className="mt-16 flex flex-col items-center"
         >
            {jobs.map((job, index) => (
               <React.Fragment key={`${job.company}-${job.from}`}>
                  {index !== 0 && (
                     <motion.div
                        variants={{
                           hidden: { opacity: 0, scaleY: 0 },
                           visible: {
                              opacity: 1,
                              scaleY: 1,
                              transition: {
                                 delay: 0.65,
                                 duration: 0.5,
                              },
                           },
                        }}
                        className="z-[-1] mt-[9px] h-6 w-px origin-top bg-neutral-200 dark:bg-neutral-500/20"
                     />
                  )}
                  <JobCard job={job} locale={locale} />
               </React.Fragment>
            ))}
         </motion.div>
      </AnimatePresence>
   )
}

type JobCardProps = {
   job: Job
   locale: Locale
} & MotionProps

export function JobCard({ job, locale, ...props }: JobCardProps) {
   const [open, setOpen] = React.useState(false)
   const currentJob = job.to === "now"

   const company = getJobField(job, "company", locale) as string
   const position = getJobField(job, "position", locale) as string
   const from = getJobField(job, "from", locale) as string
   const to = getJobField(job, "to", locale) as string
   const introDescription = getJobField(job, "introDescription", locale)
   const description = getJobField(job, "description", locale)

   return (
      <motion.div
         variants={defaultVariantsNoDelay}
         className={cn(
            "card-border relative flex flex-col rounded-xl bg-white p-6 py-8 transition-colors duration-200 ease-in-out dark:bg-neutral-900",
            {
               "ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-500/20 dark:ring-offset-neutral-950":
                  currentJob,
            },
         )}
      >
         <h2 className="m-0 mb-1 flex justify-between text-xl font-normal dark:text-white">
            {company}{" "}
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
               {from} — {to}
            </span>
         </h2>
         <p className="m-0 text-sm text-neutral-500 dark:text-neutral-400">
            {position}
         </p>
         <p className="mb-0 mt-4">{introDescription}</p>

         {!open && description && (
            <Button
               className="self-center"
               variant="ghost"
               onClick={() => setOpen(true)}
            >
               {locale === "zh" ? "展开详情" : "Show more"}
            </Button>
         )}

         <p
            className={cn("m-0 hidden transition duration-300", {
               block: open,
            })}
         >
            {description}
         </p>
      </motion.div>
   )
}
