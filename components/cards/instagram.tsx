"use client"

import { Instagram } from "@/components/icons/instagram"
import { defaultVariantsNoDelay } from "@/components/motion.variants"
import { motion } from "framer-motion"
import Link from "next/link"

export function InstagramCard() {
   const MotionLink = motion(Link)
   return (
      <MotionLink
         href={"https://www.instagram.com/charleschan95/"}
         target="_blank"
         title="Instagram profile"
         variants={defaultVariantsNoDelay}
         whileHover={{ scale: 1.05 }}
         className="card-border relative col-span-2 row-span-1 flex items-center justify-center gap-x-2 overflow-hidden rounded-xl text-white md:col-span-1 md:col-start-5 md:row-span-1 md:row-start-3"
         style={{
            background:
               "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            color: "white",
         }}
      >
         <Instagram className="h-6 text-white" />
      </MotionLink>
   )
}
