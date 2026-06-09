"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { GitHubIcon } from "@/components/icons/github"
import { Google } from "@/components/icons/google"
import { signIn, signOut } from "next-auth/react"
import { useLocale } from "@/contexts/locale-context"
import { useState } from "react"

export function SignIn() {
   const { t } = useLocale()
   return (
      <div className="flex flex-col gap-3 sm:flex-row">
         <Button onClick={async () => signIn("github")}>
            <GitHubIcon className="mr-2 h-4 w-4" /> {t("log in with github", "使用 GitHub 登录")}
         </Button>
         <Button onClick={async () => signIn("google")} variant="outline">
            <Google className="mr-2 h-4 w-4" /> {t("log in with google", "使用 Google 登录")}
         </Button>
      </div>
   )
}

export function SignOut() {
   const { t } = useLocale()
   const [isLoading, setIsLoading] = useState(false)

   const handleSignOut = async () => {
      setIsLoading(true)
      try {
         await signOut()
      } catch (error) {
         console.error("Logout failed:", error)
         setIsLoading(false)
      }
   }

   return (
      <Button variant={"outline"} onClick={handleSignOut} disabled={isLoading}>
         {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
         {t("log out", "退出登录")}
      </Button>
   )
}
