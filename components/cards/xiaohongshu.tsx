"use client"

import { defaultVariantsNoDelay } from "@/components/motion.variants"
import { motion } from "framer-motion"
import Link from "next/link"

export function XiaohongshuCard() {
   const MotionLink = motion(Link)
   return (
      <MotionLink
         href={"https://www.rednote.com/user/profile/5fb54b61000000000100867e"}
         target="_blank"
         title="Xiaohongshu / Rednote profile"
         variants={defaultVariantsNoDelay}
         whileHover={{ scale: 1.05 }}
         className="card-border relative col-span-2 row-span-1 flex aspect-[2/1] items-center justify-center gap-x-2 overflow-hidden rounded-xl text-white md:aspect-auto md:col-span-1 md:col-start-4 md:row-span-1 md:row-start-3"
         style={{ backgroundColor: "#FF2442" }}
      >
         {/* 小红书 logotype using text — universal, no custom font needed */}
         <span className="select-none font-bold tracking-tight" style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
            小红书
         </span>
      </MotionLink>
   )
}
