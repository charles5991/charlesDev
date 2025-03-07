export type Job = {
   company: string
   position: string
   introDescription: React.ReactNode
   description?: React.ReactNode
   from: string
   to: string
}

export const haiya: Job = {
   company: "Haiya Sdn Bhd",
   position: "RnD Engineer",
   introDescription: (
      <>
         I`&apos;m currently working at{" "}
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
   from: "2024",
   to: "now",
}

export const plaza: Job = {
   company: "Plaza Premium Group",
   position: "Frontend Developer",
   introDescription: (
      <>
         I currently work at{" "}
         <a href="https://www.plazapremiumlounge.com/en-uk">
            Plaza Premium Lounge
         </a>
         , where I help build and maintain our Angular application.
         <br />
         <span className="mt-4 block">
            Deliver a new mobile app feature or product to the market within 3
            months. Revamp with using latest Flutter technology
         </span>
      </>
   ),
   from: "2023",
   to: "2024",
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
