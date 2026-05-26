export type Job = {
   company: string
   position: string
   introDescription: React.ReactNode
   description?: React.ReactNode
   from: string
   to: string
}

export const pixelate: Job = {
   company: "Pixelate Everything",
   position: "Frontend Lead",
   introDescription: (
      <>
         Served as Frontend Lead at{" "}
         <a href="https://pixelate-everything.com/">Pixelate Everything</a>,
         architecting and scaling a high-throughput, white-label iGaming platform using a dual-framework frontend ecosystem.
         <br />
         <span className="mt-4 block">
            Spearheaded migration of isolated applications into a unified, enterprise-grade architecture for global scale and real-time performance.
         </span>
      </>
   ),
   description: (
      <span className="mt-4 block space-y-2">
         <strong>• Multi-Tenant Monorepo:</strong> Engineered a scalable monorepo environment (<strong>Turborepo/Nx</strong>) managing shared UI packages and brand deployments, reducing code duplication by over 45%.
         <br />
         <strong>• Dual-Framework Micro-Frontends:</strong> Bridged modern <strong>Next.js (App Router)</strong> and React layouts with legacy/specialized <strong>Vue.js</strong> casino modules.
         <br />
         <strong>• High-Frequency WebSocket Engineering:</strong> Designed a resilient client-side WebSocket pipeline consuming rapid live-odds shifts and bet-slip updates at 60 FPS without UI jank.
         <br />
         <strong>• Dynamic Token-Based Theming:</strong> Developed a multi-theme configuration layout utilizing <strong>Ant Design’s ConfigProvider</strong> and native <strong>CSS variables</strong>.
         <br />
         <strong>• Global Localization & Timezone Engine:</strong> Built an abstract localization layer (<strong>i18n</strong>) featuring strict multi-timezone normalization via <strong>Day.js/date-fns-tz</strong>.
         <br />
         <strong>• Premium Motion Design:</strong> Elevated player experience with fluid micro-interactions and transitions using <strong>Framer Motion</strong>.
      </span>
   ),
   from: "Jan 2026",
   to: "now",
}

export const haiya: Job = {
   company: "Haiya Sdn Bhd",
   position: "RnD Engineer",
   introDescription: (
      <>
         I worked at{" "}
         <a href="https://www.haiya.com.my/">Haiya Sdn Bhd</a>, a 
         technology company specializing in innovative solutions for the logistics industry.
         <br />
         <span className="mt-4 block">
            Leading research and development initiatives, focusing on implementing 
            cutting-edge technologies and optimizing system architectures. 
            Collaborating with cross-functional teams to design and develop 
            scalable solutions that enhance operational efficiency.
            Proposed team to use UmiJs Framework and React Native EXPO.
         </span>
      </>
   ),
   from: "Oct 2024",
   to: "Dec 2025",
}

export const plaza: Job = {
   company: "Plaza Premium Group",
   position: "Frontend Developer",
   introDescription: (
      <>
         Worked at{" "}
         <a href="https://www.plazapremiumlounge.com/en-uk">
            Plaza Premium Group
         </a>
         , where I helped build and maintain their Angular-based applications.
         <br />
         <span className="mt-4 block">
            Focused on developing the rewards redeeming platform, Smart Traveller, and delivering key mobile features.
         </span>
      </>
   ),
   description: (
      <span className="mt-4 block space-y-2">
         <strong>• Smart Traveller Platform:</strong> Contributed to the development and maintenance of the global airport rewards platform, <strong>Smart Traveller</strong>, built on Angular.
         <br />
         <strong>• Rapid Mobile App Delivery:</strong> Delivered new mobile app features and products to the market within a 3-month timeline.
         <br />
         <strong>• Flutter Technology Revamp:</strong> Revamped core features using the latest <strong>Flutter</strong> technology to optimize cross-platform performance.
      </span>
   ),
   from: "Mar 2024",
   to: "Oct 2024",
}

export const irace: Job = {
   company: "Irace media pte ltd",
   position: "Frontend Developer",
   introDescription: (
      <>
         I joined the <a href="https://www.irace.com.sg/">Irace SG</a> leading
         racing data provider in South-East Asia with a reputation for data
         accuracy and cutting-edge services. Supplying comprehensive form, data
         and an array of racing solutions and products
         <br />
         <span className="mt-4 block">
            Deeper dive of my previous work at Irace is underway.
         </span>
      </>
   ),
   from: "2023",
   to: "2023",
}

export const firstpavilion: Job = {
   company: "First Pavilion Global",
   position: "Frontend Developer",
   introDescription: (
      <>
         Joined <a href="https://fpgberhad.com/">FPG Berhad</a> regional
         conglomerate driving innovation in the financial and cutting edge
         technology-driven industries.
         <br />
         <span className="mt-4 block">
            Develop a Blockchain based E-Voting Smart Contract with Solidity,
            Thirdweb, Web3.js,<br></br> Develop a Mobile App with existing
            Nextjs/React project with using Ionic Framework and Capacitor
            <br></br> Experience with Marketing Seo tools like FreshChat,
            Twilio,SendGrid
         </span>
      </>
   ),
   from: "2022",
   to: "2023",
}

export const rakuten: Job = {
   company: "Rakuten Trade Sdn Bhd",
   position: "Junior Frontend Developer",
   introDescription: (
      <>
         I worked with{" "}
         <a href="https://www.rakutentrade.my/">Rakuten Trade Sdn Bhd</a> a
         FinTech platform that combines best practices in both Malaysia and
         Japan. We are Malaysia`&apos;s first completely online equities broker
         offering innovative digital investment opportunities to investors.
         <br />
         <span className="mt-4 block">
            Analyzed business requirements, participated in technical design,
            development, and testing of various modules assigned.
         </span>
      </>
   ),
   from: "2018",
   to: "2021",
}
