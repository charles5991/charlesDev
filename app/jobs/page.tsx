import { auth } from "@/app/auth"
import { notFound } from "next/navigation"
import { JobsClient } from "@/app/jobs/jobs-client"

export default async function JobsPage() {
   const session = await auth()
   const adminEmail = process.env.ADMIN_EMAIL || "charles5991"

   const isDev = process.env.NODE_ENV === "development"

   if (
      !isDev &&
      (!session ||
         !session.user ||
         (session.user.email !== adminEmail && !session.user.email?.includes("charl")))
   ) {
      notFound()
   }

   return <JobsClient />
}
