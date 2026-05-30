"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import { useLocale } from "@/contexts/locale-context"

export function SignIn() {
   const { t } = useLocale()
   return (
      <Button onClick={async () => signIn("github")}>
         <Github className="mr-2 h-4 w-4" /> {t("log in with github", "使用 GitHub 登录")}
      </Button>
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
