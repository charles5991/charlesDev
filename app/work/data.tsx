import { type Locale } from "@/contexts/locale-context"

export type Job = {
   company: string
   position: string
   positionZh?: string
   introDescription: React.ReactNode
   introDescriptionZh?: React.ReactNode
   description?: React.ReactNode
   descriptionZh?: React.ReactNode
   from: string
   to: string
}

export function getJobField<T>(
   job: Job,
   field: keyof Job,
   locale: Locale,
): React.ReactNode {
   const zhField = `${field}Zh` as keyof Job
   if (locale === "zh" && job[zhField]) return job[zhField] as React.ReactNode
   return job[field] as React.ReactNode
}

export const pixelate: Job = {
   company: "Pixelate Everything",
   position: "Frontend Lead",
   positionZh: "前端负责人",
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
   introDescriptionZh: (
      <>
         担任{" "}
         <a href="https://pixelate-everything.com/">Pixelate Everything</a>{" "}
         的前端负责人，负责架构和扩展基于双框架前端生态的高吞吐量白标 iGaming 平台。
         <br />
         <span className="mt-4 block">
            主导将各自独立的应用迁移至统一的企业级架构，实现全球规模化与实时高性能。
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
         <strong>• Dynamic Token-Based Theming:</strong> Developed a multi-theme configuration layout utilizing <strong>Ant Design&apos;s ConfigProvider</strong> and native <strong>CSS variables</strong>.
         <br />
         <strong>• Global Localization &amp; Timezone Engine:</strong> Built an abstract localization layer (<strong>i18n</strong>) featuring strict multi-timezone normalization via <strong>Day.js/date-fns-tz</strong>.
         <br />
         <strong>• Premium Motion Design:</strong> Elevated player experience with fluid micro-interactions and transitions using <strong>Framer Motion</strong>.
      </span>
   ),
   descriptionZh: (
      <span className="mt-4 block space-y-2">
         <strong>• 多租户 Monorepo：</strong> 构建可扩展的 Monorepo 环境（<strong>Turborepo/Nx</strong>），统一管理共享 UI 包与品牌部署，减少代码重复超过 45%。
         <br />
         <strong>• 双框架微前端：</strong> 将现代 <strong>Next.js (App Router)</strong> 及 React 布局与遗留/专项 <strong>Vue.js</strong> 赌场模块无缝整合。
         <br />
         <strong>• 高频 WebSocket 工程：</strong> 设计弹性客户端 WebSocket 管道，以 60 FPS 无卡顿处理实时赔率变化与投注单更新。
         <br />
         <strong>• 动态 Token 主题化：</strong> 利用 <strong>Ant Design ConfigProvider</strong> 与原生 <strong>CSS 变量</strong>构建多主题配置体系。
         <br />
         <strong>• 全球本地化与时区引擎：</strong> 搭建抽象本地化层（<strong>i18n</strong>），通过 <strong>Day.js/date-fns-tz</strong> 实现严格的多时区规范化。
         <br />
         <strong>• 高端动效设计：</strong> 使用 <strong>Framer Motion</strong> 打造流畅微交互与过渡效果，提升玩家体验。
      </span>
   ),
   from: "Jan 2026",
   to: "now",
}

export const haiya: Job = {
   company: "Haiya Sdn Bhd",
   position: "RnD Engineer",
   positionZh: "研发工程师",
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
   introDescriptionZh: (
      <>
         就职于{" "}
         <a href="https://www.haiya.com.my/">Haiya Sdn Bhd</a>，一家专注于物流行业创新解决方案的科技公司。
         <br />
         <span className="mt-4 block">
            主导研发工作，专注于引入前沿技术与优化系统架构，与跨职能团队协作设计和开发可扩展解决方案，提升运营效率。向团队提议采用 UmiJs 框架与 React Native EXPO。
         </span>
      </>
   ),
   from: "Oct 2024",
   to: "Dec 2025",
}

export const plaza: Job = {
   company: "Plaza Premium Group",
   position: "Frontend Developer",
   positionZh: "前端开发工程师",
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
   introDescriptionZh: (
      <>
         就职于{" "}
         <a href="https://www.plazapremiumlounge.com/en-uk">
            Plaza Premium Group
         </a>
         ，负责构建和维护基于 Angular 的应用程序。
         <br />
         <span className="mt-4 block">
            专注于开发积分兑换平台 Smart Traveller，并交付关键移动端功能。
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
   descriptionZh: (
      <span className="mt-4 block space-y-2">
         <strong>• Smart Traveller 平台：</strong> 参与基于 Angular 的全球机场奖励平台 <strong>Smart Traveller</strong> 的开发与维护。
         <br />
         <strong>• 快速移动端交付：</strong> 在 3 个月内完成新移动应用功能与产品的市场发布。
         <br />
         <strong>• Flutter 技术升级：</strong> 使用最新 <strong>Flutter</strong> 技术重构核心功能，优化跨平台性能。
      </span>
   ),
   from: "Mar 2024",
   to: "Oct 2024",
}

export const irace: Job = {
   company: "Irace media pte ltd",
   position: "Frontend Developer",
   positionZh: "前端开发工程师",
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
   introDescriptionZh: (
      <>
         加入东南亚领先赛马数据提供商{" "}
         <a href="https://www.irace.com.sg/">Irace SG</a>，以数据准确性和前沿服务著称，提供全面的赛事资料、数据及多种赛马解决方案与产品。
         <br />
         <span className="mt-4 block">
            更多 Irace 工作详情正在整理中。
         </span>
      </>
   ),
   from: "2023",
   to: "2023",
}

export const firstpavilion: Job = {
   company: "First Pavilion Global",
   position: "Frontend Developer",
   positionZh: "前端开发工程师",
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
   introDescriptionZh: (
      <>
         加入区域综合企业{" "}
         <a href="https://fpgberhad.com/">FPG Berhad</a>，驱动金融与前沿科技行业创新。
         <br />
         <span className="mt-4 block">
            使用 Solidity、Thirdweb、Web3.js 开发基于区块链的电子投票智能合约；<br />
            基于现有 Next.js/React 项目，使用 Ionic Framework 与 Capacitor 开发移动应用；<br />
            具备 FreshChat、Twilio、SendGrid 等营销 SEO 工具的使用经验。
         </span>
      </>
   ),
   from: "2022",
   to: "2023",
}

export const rakuten: Job = {
   company: "Rakuten Trade Sdn Bhd",
   position: "Junior Frontend Developer",
   positionZh: "初级前端开发工程师",
   introDescription: (
      <>
         I worked with{" "}
         <a href="https://www.rakutentrade.my/">Rakuten Trade Sdn Bhd</a> a
         FinTech platform that combines best practices in both Malaysia and
         Japan. We are Malaysia&apos;s first completely online equities broker
         offering innovative digital investment opportunities to investors.
         <br />
         <span className="mt-4 block">
            Analyzed business requirements, participated in technical design,
            development, and testing of various modules assigned.
         </span>
      </>
   ),
   introDescriptionZh: (
      <>
         就职于{" "}
         <a href="https://www.rakutentrade.my/">Rakuten Trade Sdn Bhd</a>，一个融合马来西亚与日本最佳实践的金融科技平台，是马来西亚首家完全在线的股票经纪商，为投资者提供创新的数字投资机会。
         <br />
         <span className="mt-4 block">
            分析业务需求，参与各模块的技术设计、开发与测试工作。
         </span>
      </>
   ),
   from: "2018",
   to: "2021",
}
