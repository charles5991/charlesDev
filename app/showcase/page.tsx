"use client"

import Image from "next/image"

interface Project {
   title: string
   src: string
   href: string
   category: string
   colSpan: number
   rowSpan: number
}

const projects: Project[] = [
   {
      title: "Mystical Forest Slot",
      category: "PixiJS / Game Dev / iGaming",
      src: "/assets/forest.png",
      href: "https://mystical-forest-slot.vercel.app/",
      colSpan: 2,
      rowSpan: 2,
   },
   {
      title: "Hilton Solana Casino App",
      category: "Personal / Web3 / iGaming",
      src: "/assets/casino.png",
      href: "https://hilton-casino.vercel.app/",
      colSpan: 2,
      rowSpan: 2,
   },
   {
      title: "Mall ThreeJs",
      category: "Three.js / Experiment",
      src: "/assets/mall.png",
      href: "https://charles-r3-f-orbit-test.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Weather App",
      category: "Web App / Parallax",
      src: "/assets/weather.png",
      href: "https://weather-pallarax.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Charles Atmosphere",
      category: "Three.js / Interactive",
      src: "/assets/plane.png",
      href: "https://charles-atmosphere.vercel.app/",
      colSpan: 1,
      rowSpan: 2,
   },
   {
      title: "Apple Clone",
      category: "Vanilla JS / Parallax",
      src: "/assets/iphone.png",
      href: "https://apple-clone-parallax.vercel.app/",
      colSpan: 2,
      rowSpan: 1,
   },
   {
      title: "Blackhole ThreeJs",
      category: "Three.js / Visuals",
      src: "/assets/blackhole.png",
      href: "https://blackhole-phi.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Emperor Royal SG Website",
      category: "iGaming / Web",
      src: "/assets/emperor.png",
      href: "https://emperor-royal.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Cleverly ROAS",
      category: "SaaS / Web App",
      src: "/assets/roas.png",
      href: "https://cleverly-web.vercel.app/projects",
      colSpan: 2,
      rowSpan: 1,
   },
   {
      title: "Jikan API",
      category: "API Integration / Web",
      src: "/assets/jikan.png",
      href: "https://jikan-web.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Crypto Tracker",
      category: "Web App / FinTech",
      src: "/assets/cryptotrack.png",
      href: "https://crypto-tracker-test-gamma.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Daidailife Bitfinex Lending Bot",
      category: "FinTech / Automation",
      src: "/assets/daidai.png",
      href: "https://user.daidai.life/trading-bot",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "BC Multi-Tenant Project",
      category: "iGaming / Multi-Tenant",
      src: "/assets/nexo168.png",
      href: "https://nexo168.com",
      colSpan: 2,
      rowSpan: 2,
   },
   {
      title: "Ocean ThreeJs",
      category: "Three.js / Interactive",
      src: "/assets/ocean.png",
      href: "https://ocean-r3-fiber.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Gameboy ThreeJs",
      category: "Three.js / Nostalgia",
      src: "/assets/gameboy.png",
      href: "https://childhood-gameboy.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Sourceflow",
      category: "Freelance / Web",
      src: "/assets/sourceflow.png",
      href: "https://sourceflow-test.vercel.app/",
      colSpan: 1,
      rowSpan: 1,
   },
   {
      title: "Austin Website",
      category: "Freelance / Web",
      src: "/assets/austin.png",
      href: "https://austinsourceflow.vercel.app/",
      colSpan: 2,
      rowSpan: 1,
   },
   {
      title: "Infinitown (Mock)",
      category: "Interactive / Web",
      src: "/assets/town.png",
      href: "https://charles-infinitownmock.netlify.app/",
      colSpan: 1,
      rowSpan: 2,
   },
]

const showcase = () => {
   return (
      <section>
         <div className="showcase-grid">
            {projects.map((project, index) => (
               <a
                  key={index}
                  href={project.href}
                  className="group relative overflow-hidden"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                     gridColumn: `span ${Math.min(project.colSpan, 2)}`,
                     gridRow: `span ${project.rowSpan}`,
                  }}
               >
                  <Image
                     fill={true}
                     src={project.src}
                     alt={project.title}
                     className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                     sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-2 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100 md:p-3">
                     <p className="translate-y-2 text-xs font-semibold leading-tight text-white transition-transform duration-300 group-hover:translate-y-0 md:text-sm">
                        {project.title}
                     </p>
                     <p className="translate-y-2 text-[9px] text-white/70 transition-transform duration-300 group-hover:translate-y-0 md:text-[11px]">
                        {project.category}
                     </p>
                  </div>
               </a>
            ))}
         </div>
      </section>
   )
}

export default showcase
