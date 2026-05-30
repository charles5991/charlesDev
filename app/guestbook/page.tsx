import { auth } from "@/app/auth"
import { signIn, useSession } from "next-auth/react"
import { getGuestbookEntries } from "@/app/db/queries"
import { SignIn, SignOut } from "@/app/guestbook/components/buttons"
import { Entries } from "@/app/guestbook/components/entries"
import Form, { FormShell } from "@/app/guestbook/components/form"
import { GuestbookHeader } from "@/app/guestbook/components/guestbook-header"

export const metadata = {
   title: "Guestbook - Charles Dev",
   description: "Guestbook where visitors can leave a comment by signing.",
}

export default async function GuestbookPage() {
   const session = await auth()
   const isLoggedIn = !!session?.user?.email

   const entries = await getGuestbookEntries()

   return (
      <section>
         <GuestbookHeader userName={session?.user?.name} />
         <FormShell>
            {isLoggedIn ? (
               <>
                  <Form />
                  <SignOut />
               </>
            ) : (
               <SignIn />
            )}
         </FormShell>

         <Entries entries={entries} />
      </section>
   )
}
