"use client"

import Image from "next/image"

const showcase = () => {
   return (
      <section>
         <div className="mx-auto max-w-screen-xl px-2 py-4 sm:py-4 lg:px-6">
            <div className="my-4 grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://hilton-casino.vercel.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/casino.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Hilton Solana Casino App (Personal)
                     </h3>
                  </a>
               </div>
            </div>

            <div className="my-4 grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://charles-r3-f-orbit-test.vercel.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/mall.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Mall ThreeJs
                     </h3>
                  </a>
               </div>
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://weather-pallarax.vercel.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/weather.png"
                        alt=""
                        className="absolute inset-0 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Weather App
                     </h3>
                  </a>
               </div>
            </div>
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://charles-atmosphere.vercel.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/plane.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Charles Atmosphere
                     </h3>
                  </a>
               </div>
               <div className="col-span-2 sm:col-span-1 md:col-span-2">
                  <a
                     href="https://apple-clone-parallax.vercel.app/"
                     className="group relative mb-4 flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/iphone.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <p className=" text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Apple clone
                     </p>
                  </a>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                     <a
                        href="https://blackhole-phi.vercel.app/"
                        className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <Image
                           fill={true}
                           src="/assets/blackhole.png"
                           alt=""
                           className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                        <h3 className="  text-md absolute left-0 top-0 z-10 p-4 font-medium text-white  ">
                           Blackhole ThreeJs
                        </h3>
                     </a>
                     <a
                        href="https://emperor-royal.vercel.app/"
                        className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <Image
                           fill={true}
                           src="/assets/emperor.png"
                           alt=""
                           className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                        <h3 className="  text-md absolute left-0 top-0 z-10 p-4 font-medium text-white  ">
                           Emperor Royal SG Website
                        </h3>
                     </a>
                  </div>
               </div>
               <div className="col-span-2 flex h-auto flex-col  sm:col-span-1 md:col-span-1 md:h-full">
                  <a
                     href="https://cleverly-web.vercel.app/projects"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/roas.png"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="  text-md absolute left-0 top-0 z-10 p-4 font-medium text-white  ">
                        Cleverly ROAS
                     </h3>
                  </a>
               </div>
            </div>
            <div className="my-4 grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-8">
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://ocean-r3-fiber.vercel.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/ocean.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Ocean ThreeJs
                     </h3>
                  </a>
               </div>
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://childhood-gameboy.vercel.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/gameboy.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Gameboy ThreeJs
                     </h3>
                  </a>
               </div>
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://sourceflow-test.vercel.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/sourceflow.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Sourceflow (freelance)
                     </h3>
                  </a>
               </div>
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://austinsourceflow.vercel.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/austin.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Austin website (freelance)
                     </h3>
                  </a>
               </div>
            </div>
            <div className="my-4 grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href="https://charles-infinitownmock.netlify.app/"
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        fill={true}
                        src="/assets/town.png"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="text-md absolute left-0 top-0 z-10 p-4 font-medium text-white">
                        Infinitown (Mock)
                     </h3>
                  </a>
               </div>
            </div>
         </div>
      </section>
   )
}

export default showcase
