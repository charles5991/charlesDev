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
   const [loadingProvider, setLoadingProvider] = useState<"github" | "google" | null>(null)

   const handleSignIn = async (provider: "github" | "google") => {
      setLoadingProvider(provider)
      try {
         await signIn(provider)
      } catch (error) {
         console.error(`${provider} login failed:`, error)
         setLoadingProvider(null)
      }
   }

   return (
      <div className="flex flex-col gap-3 sm:flex-row">
         <Button onClick={() => handleSignIn("github")} disabled={loadingProvider !== null}>
            {loadingProvider === "github" ? (
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
               <GitHubIcon className="mr-2 h-4 w-4" />
            )}
            {t("log in with github", "使用 GitHub 登录")}
         </Button>
         <Button onClick={() => handleSignIn("google")} variant="outline" disabled={loadingProvider !== null}>
            {loadingProvider === "google" ? (
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
               <Google className="mr-2 h-4 w-4" />
            )}
            {t("log in with google", "使用 Google 登录")}
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
