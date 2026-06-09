"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { Google } from "@/components/icons/google"
import { signIn, signOut } from "next-auth/react"
import { useLocale } from "@/contexts/locale-context"

export function SignIn() {
   const { t } = useLocale()
   return (
      <div className="flex flex-col gap-3 sm:flex-row">
         <Button onClick={async () => signIn("github")}>
            <Github className="mr-2 h-4 w-4" /> {t("log in with github", "使用 GitHub 登录")}
         </Button>
         <Button onClick={async () => signIn("google")} variant="outline">
            <Google className="mr-2 h-4 w-4" /> {t("log in with google", "使用 Google 登录")}
         </Button>
      </div>
   )
}

export function SignOut() {
   const { t } = useLocale()
   return (
      <Button variant={"outline"} onClick={async () => signOut()}>
         {t("log out", "退出登录")}
      </Button>
   )
}
