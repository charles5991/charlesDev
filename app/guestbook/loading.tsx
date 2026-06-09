import { cn } from "@/lib/utils"

export default function GuestbookLoading() {
   return (
      <section className="animate-pulse">
         {/* Title Skeleton */}
         <div className="h-9 w-3/4 max-w-md rounded-md bg-neutral-200/20 dark:bg-neutral-800/40" />

         {/* Form / Sign-in Button Skeleton */}
         <div className="mt-12">
            <div className="h-10 w-40 rounded-md bg-neutral-200/20 dark:bg-neutral-800/40" />
         </div>

         {/* Entries List Skeleton */}
         <div className="mt-16 flex flex-col space-y-3 border-t border-white/5 py-8">
            {[...Array(5)].map((_, i) => (
               <div
                  key={i}
                  className={cn(
                     "flex flex-col rounded-xl border border-neutral-200/10 bg-neutral-200/10 px-3 py-2 text-sm dark:border-white/5 dark:bg-neutral-900/10",
                     i % 2 === 0 ? "self-start" : "self-end",
                     "w-64 sm:w-80"
                  )}
               >
                  <div className="h-3 w-1/3 rounded bg-neutral-200/20 dark:bg-neutral-800/40 mb-2" />
                  <div className="h-4 w-5/6 rounded bg-neutral-200/20 dark:bg-neutral-800/40" />
               </div>
            ))}
         </div>
      </section>
   )
}
