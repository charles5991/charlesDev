import { FloatingNav } from "@/components/ui/floating-navbar"

export type NavItem = {
   name: string
   nameZh?: string
   link: string
   icon?: JSX.Element
}

const navItems: NavItem[] = [
   { name: "Home", nameZh: "首页", link: "/" },
   { name: "Work", nameZh: "工作", link: "/work" },
   { name: "Guestbook", nameZh: "留言", link: "/guestbook" },
   { name: "showcase", nameZh: "展示", link: "/showcase" },
]

export function Header() {
   return (
      <header className="flex">
         <FloatingNav navItems={navItems} />
      </header>
   )
}
