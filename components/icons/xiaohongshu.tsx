import { SVGProps } from "react"

export function Xiaohongshu(props: SVGProps<SVGSVGElement>) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         fill="currentColor"
         {...props}
      >
         {/* Stylised "小红书" X / book mark icon */}
         <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.75 5.25h-1.5v1.5h1.5V9h-1.5v1.5H12V9h-1.5V7.5H12V6h1.5v1.5h1.5v-.25zM9 6h1.5v1.5H9V6zm-1.5 3H9v6H7.5V9zm1.5 0h1.5v1.5H9V9zm6 0h1.5v6H15V9zm-4.5 1.5H12V12h-1.5v-1.5zm0 3H12v1.5h-1.5V13.5zm1.5 0h1.5V15H12v-1.5zm-3 1.5H9V18H7.5v-3H9v1.5zm6 0h1.5V18H15v-3h1.5v1.5zm-4.5 1.5h3V18h-3v-1.5z" />
      </svg>
   )
}
