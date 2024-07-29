import Image from "next/image"

const showcase = () => {
   return (
      <section>
         <div className="mx-auto max-w-screen-xl px-2 py-4 sm:py-4 lg:px-6">
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
               <div className="col-span-2 flex h-auto flex-col sm:col-span-1 md:col-span-2 md:h-full">
                  <a
                     href=""
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                  >
                     <Image
                        fill={true}
                        src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="xs:text-xl absolute left-0 top-0 z-10 p-4 text-2xl font-medium text-white md:text-xl">
                        Wines
                     </h3>
                  </a>
               </div>
               <div className="col-span-2 sm:col-span-1 md:col-span-2">
                  <a
                     href=""
                     className="group relative mb-4 flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                  >
                     <Image
                        fill={true}
                        src="https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="xs:text-xl absolute left-0 top-0 z-10 p-4 text-2xl font-medium text-white md:text-xl">
                        Gin
                     </h3>
                  </a>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                     <a
                        href=""
                        className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     >
                        <Image
                           fill={true}
                           src="https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                           alt=""
                           className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                        <h3 className="xs:text-xl absolute left-0 top-0 z-10 p-4 text-2xl font-medium text-white md:text-xl">
                           Whiskey
                        </h3>
                     </a>
                     <a
                        href=""
                        className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                     >
                        <Image
                           fill={true}
                           src="https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                           alt=""
                           className="absolute inset-0  object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                        <h3 className="xs:text-xl absolute left-0 top-0 z-10 p-4 text-2xl font-medium text-white md:text-xl">
                           Vodka
                        </h3>
                     </a>
                  </div>
               </div>
               <div className="col-span-2 flex h-auto flex-col  sm:col-span-1 md:col-span-1 md:h-full">
                  <a
                     href=""
                     className="group relative flex flex-grow flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                  >
                     <Image
                        fill={true}
                        src="https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                     <h3 className="xs:text-xl absolute left-0 top-0 z-10 p-4 text-2xl font-medium text-white md:text-xl">
                        Brandy
                     </h3>
                  </a>
               </div>
            </div>
         </div>
      </section>
   )
}

export default showcase
