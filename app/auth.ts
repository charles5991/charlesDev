import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const {
   handlers: { GET, POST },
   auth,
   signIn,
   signOut,
} = NextAuth((req) => {
   if (req) {
      console.log(req)
   }
   return { providers: [GitHub, Google] }
})
