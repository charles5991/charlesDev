import { NextResponse } from "next/server"
import { auth } from "@/app/auth"

// ── Normalised shape from any source ──────────────────────────────────────
type RawJob = {
   id: string
   title: string
   company: string
   logo: string
   url: string
   location: string
   salary: string
   publishedAt: string // ISO date string
   tags: string[]
   description: string
}

// ── Helpers ───────────────────────────────────────────────────────────────
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function isWithin30Days(dateStr: string): boolean {
   if (!dateStr) return true // if no date, include it
   const date = new Date(dateStr)
   if (isNaN(date.getTime())) return true
   return Date.now() - date.getTime() <= THIRTY_DAYS_MS
}

// ── Location allow-list (APAC + iGaming hubs + Worldwide) ─────────────────
const ALLOWED_LOCATIONS = [
   // Generic remote / global
   "worldwide", "anywhere", "global", "remote", "work from home", "wfh", "distributed",
   // SE Asia
   "malaysia", "singapore", "philippines", "thailand", "vietnam", "indonesia", "myanmar",
   "apac", "asia", "southeast asia", "se asia",
   // East Asia
   "hong kong", "hongkong", "china", "taiwan", "japan", "tokyo", "osaka", "beijing",
   "shanghai", "shenzhen", "guangzhou", "macau", "macao",
   // South Asia
   "india",
   // Oceania
   "australia", "new zealand",
   // Europe (iGaming companies: Malta, Cyprus, Gibraltar, Isle of Man)
   "europe", "malta", "cyprus", "uk", "united kingdom", "gibraltar", "isle of man",
   "estonia", "latvia", "lithuania",
]

function isLocationAllowed(location: string): boolean {
   // Empty location = globally remote = always allowed
   if (!location || location.trim() === "") return true
   const loc = location.toLowerCase()
   // If the word "remote" appears anywhere in the location string, allow it
   if (loc.includes("remote")) return true
   return ALLOWED_LOCATIONS.some((allowed) => loc.includes(allowed))
}

// ── iGaming/iCasino company detection ────────────────────────────────────
const IGAMING_KEYWORDS = [
   "casino", "igaming", "i-gaming", "betting", "sportsbook", "poker",
   "gaming", "lottery", "slots", "wager", "bingo", "esports",
]

function isIGamingRole(title: string, description: string, tags: string[]): boolean {
   const haystack = `${title} ${description} ${tags.join(" ")}`.toLowerCase()
   return IGAMING_KEYWORDS.some((kw) => haystack.includes(kw))
}

// ── Frontend signal keywords (checked across title + tags + description) ──
// Broad enough to catch "Software Engineer (React)", "UI/UX Developer", etc.
const FRONTEND_SIGNAL_KW = [
   "frontend", "front-end", "front end",
   "react", "next.js", "nextjs", "vue", "nuxt", "angular",
   "ui engineer", "ui developer", "web developer", "web engineer",
   "javascript developer", "typescript developer",
   "ui/ux", "interface developer",
]

// Keywords that indicate a backend/infra-only role — exclude false positives
const BACKEND_ONLY_KW = [
   "backend developer", "back-end developer", "back end developer",
   "devops engineer", "site reliability", "sre ", "data engineer",
   "machine learning engineer", "ml engineer", "ai engineer",
   "database administrator", "dba ",
]

// ── Junior/intern exclusion list ─────────────────────────────────────────
const JUNIOR_KW = ["junior", "intern", "entry level", "entry-level", "graduate", "jr.", "trainee"]

// ── Charles' core stack ───────────────────────────────────────────────────
const CHARLES_STACK = [
   "react", "next.js", "nextjs", "vue", "nuxt", "angular",
   "typescript", "javascript",
   "react native", "flutter", "ionic",
   "turborepo", "monorepo", "nx",
   "framer motion", "tailwind", "css",
   "websocket",
   "web3", "solidity",
   "igaming", "casino", "betting",
]

// ── Per-source fetchers ───────────────────────────────────────────────────

async function fetchRemotive(): Promise<RawJob[]> {
   try {
      const res = await fetch(
         "https://remotive.com/api/remote-jobs?category=software-development",
         { next: { revalidate: 600 } },
      )
      if (!res.ok) return []
      const data = await res.json()
      return (data.jobs || []).map((j: any): RawJob => ({
         id: `remotive-${j.id}`,
         title: j.title || "",
         company: j.company_name || "",
         logo: j.company_logo || "",
         url: j.url || "",
         location: j.candidate_required_location || "",
         salary: j.salary || "",
         publishedAt: j.publication_date || "",
         tags: j.tags || [],
         description: (j.description || "").toLowerCase(),
      }))
   } catch {
      return []
   }
}

async function fetchRemoteOK(): Promise<RawJob[]> {
   try {
      const res = await fetch("https://remoteok.com/api?tag=react", {
         headers: {
            "User-Agent": "Mozilla/5.0 (compatible; JobDashboard/1.0)",
            "Accept": "application/json",
         },
         cache: "no-store",
      })
      if (!res.ok) return []
      const data = await res.json()
      const jobs = Array.isArray(data) ? data.slice(1) : []
      return jobs.map((j: any): RawJob => ({
         id: `remoteok-${j.id}`,
         title: j.position || "",
         company: j.company || "",
         logo: j.company_logo || "",
         url: j.url || `https://remoteok.com/remote-jobs/${j.id}`,
         location: j.location || "",
         salary: j.salary ? `${j.salary}` : "",
         publishedAt: j.date || "",
         tags: j.tags || [],
         description: (j.description || "").toLowerCase(),
      }))
   } catch {
      return []
   }
}

async function fetchJobicy(): Promise<RawJob[]> {
   try {
      // Remove tag filter — their tag filter was too strict, causing 0 results
      const res = await fetch(
         "https://jobicy.com/api/v2/remote-jobs?industry=engineering&count=100",
         { cache: "no-store" },
      )
      if (!res.ok) return []
      const data = await res.json()
      return (data.jobs || []).map((j: any): RawJob => ({
         id: `jobicy-${j.id}`,
         title: j.jobTitle || "",
         company: j.companyName || "",
         logo: j.companyLogo || "",
         url: j.url || "",
         location: j.jobGeo || j.jobRegion || "",
         salary: j.annualSalaryMin ? `$${j.annualSalaryMin}-$${j.annualSalaryMax}` : "",
         publishedAt: j.pubDate || "",
         tags: Array.isArray(j.jobType) ? j.jobType : [],
         description: (j.jobExcerpt || j.jobDescription || "").toLowerCase(),
      }))
   } catch {
      return []
   }
}

async function fetchArbeitnow(): Promise<RawJob[]> {
   try {
      const res = await fetch(
         "https://www.arbeitnow.com/api/job-board-api",
         { next: { revalidate: 600 } },
      )
      if (!res.ok) return []
      const data = await res.json()
      return (data.data || []).map((j: any): RawJob => ({
         id: `arbeitnow-${j.slug}`,
         title: j.title || "",
         company: j.company_name || "",
         logo: j.company_logo || "",
         url: j.url || "",
         location: j.location || (j.remote ? "Worldwide" : ""),
         salary: "",
         publishedAt: j.created_at ? new Date(j.created_at * 1000).toISOString() : "",
         tags: j.tags || [],
         description: (j.description || "").toLowerCase(),
      }))
   } catch {
      return []
   }
}

async function fetchHimalayas(): Promise<RawJob[]> {
   try {
      const res = await fetch(
         "https://himalayas.app/jobs/api?limit=50&skills=react,typescript,vue,angular,nextjs,frontend",
         { next: { revalidate: 600 } },
      )
      if (!res.ok) return []
      const data = await res.json()
      return (data.jobs || []).map((j: any): RawJob => ({
         id: `himalayas-${j.slug || j.id}`,
         title: j.title || "",
         company: j.company?.name || j.companyName || "",
         logo: j.company?.logo || j.companyLogo || "",
         url: j.applicationLink || j.url || "",
         location: j.locationRestrictions?.join(", ") || j.location || "",
         salary: j.salary || "",
         publishedAt: j.createdAt || j.publishedAt || "",
         tags: j.skills || j.tags || [],
         description: (j.description || j.excerpt || "").toLowerCase(),
      }))
   } catch {
      return []
   }
}

async function fetchWWR(): Promise<RawJob[]> {
   try {
      // We Work Remotely — dedicated front-end programming RSS feed
      const res = await fetch(
         "https://weworkremotely.com/categories/remote-front-end-programming-jobs.rss",
         { cache: "no-store" },
      )
      if (!res.ok) return []
      const xml = await res.text()
      const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g))
      return items.map((match, i): RawJob => {
         const item = match[1]
         const getCdata = (tag: string) => {
            const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`))
            return m ? m[1].trim() : ""
         }
         const getText = (tag: string) => {
            const m = item.match(new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`))
            return m ? m[1].trim() : ""
         }
         const rawTitle = getCdata("title") || getText("title")
         // WWR title format: "Company: Job Title"
         const colonIdx = rawTitle.indexOf(": ")
         const company = colonIdx > -1 ? rawTitle.slice(0, colonIdx) : ""
         const jobTitle = colonIdx > -1 ? rawTitle.slice(colonIdx + 2) : rawTitle
         const region = getCdata("region") || getText("region") || "Worldwide"
         const desc = getCdata("description") || ""
         return {
            id: `wwr-${i}-${getText("guid").slice(-8)}`,
            title: jobTitle,
            company,
            logo: "",
            url: getText("link") || getCdata("link") || getText("guid"),
            location: region,
            salary: "",
            publishedAt: getText("pubDate"),
            tags: [],
            description: desc.replace(/<[^>]+>/g, " ").toLowerCase(),
         }
      })
   } catch {
      return []
   }
}

// ── ATS Detection (for direct apply proxy) ───────────────────────────────
type ATSInfo = {
   type: "greenhouse" | "lever" | "workable" | "ashby" | "unknown"
   company?: string
   jobId?: string
}

function detectATS(url: string): ATSInfo {
   if (!url) return { type: "unknown" }
   // Greenhouse: https://boards.greenhouse.io/[company]/jobs/[job_id]
   const gh = url.match(/greenhouse\.io\/([^/]+)\/jobs\/(\d+)/)
   if (gh) return { type: "greenhouse", company: gh[1], jobId: gh[2] }
   // Lever: https://jobs.lever.co/[company]/[uuid]
   const lv = url.match(/jobs\.lever\.co\/([^/]+)\/([a-f0-9-]{36})/)
   if (lv) return { type: "lever", company: lv[1], jobId: lv[2] }
   // Workable: https://apply.workable.com/[company]/j/[id]
   const wk = url.match(/workable\.com\/([^/]+)\/j\/([^/?]+)/)
   if (wk) return { type: "workable", company: wk[1], jobId: wk[2] }
   // Ashby: https://jobs.ashbyhq.com/[company]/[uuid]
   const ab = url.match(/ashbyhq\.com\/([^/]+)\/([a-f0-9-]{36})/)
   if (ab) return { type: "ashby", company: ab[1], jobId: ab[2] }
   return { type: "unknown" }
}

// ── Main filter ───────────────────────────────────────────────────────────
function filterJob(job: RawJob): boolean {
   const title = job.title.toLowerCase()
   const tags = job.tags.map((t) => t.toLowerCase())
   const desc = job.description

   // Build a combined searchable text: title + tags + first 600 chars of description
   const fullText = `${title} ${tags.join(" ")} ${desc.slice(0, 600)}`

   // 1. Must have a frontend/web signal somewhere in the full text
   const hasFrontendSignal = FRONTEND_SIGNAL_KW.some((kw) => fullText.includes(kw))
   if (!hasFrontendSignal) return false

   // 2. Exclude clearly backend-only roles (title check is sufficient)
   const isBackendOnly = BACKEND_ONLY_KW.some((kw) => title.includes(kw))
   if (isBackendOnly) return false

   // 3. No junior/intern roles
   if (JUNIOR_KW.some((kw) => title.includes(kw))) return false

   // 4. Must mention at least one of Charles' stack keywords anywhere in the full text
   const hasStack = CHARLES_STACK.some((skill) => fullText.includes(skill))
   if (!hasStack) return false

   // 5. Location must be APAC / iGaming hub / Worldwide / any remote
   if (!isLocationAllowed(job.location)) return false

   // 6. Must be posted within 30 days
   if (!isWithin30Days(job.publishedAt)) return false

   return true
}

// ── Route handler ─────────────────────────────────────────────────────────
export async function GET() {
   const session = await auth()
   const isDev = process.env.NODE_ENV === "development"
   const adminEmail = process.env.ADMIN_EMAIL || "charles5991"

   if (
      !isDev &&
      (!session ||
         !session.user ||
         (session.user.email !== adminEmail && !session.user.email?.includes("charl")))
   ) {
      return new NextResponse("Unauthorized", { status: 401 })
   }

   try {
      // Fetch all sources concurrently — 6 sources total
      const [remotive, remoteOK, jobicy, arbeitnow, himalayas, wwr] = await Promise.allSettled([
         fetchRemotive(),
         fetchRemoteOK(),
         fetchJobicy(),
         fetchArbeitnow(),
         fetchHimalayas(),
         fetchWWR(),
      ])

      const allJobs: RawJob[] = [
         ...(remotive.status === "fulfilled" ? remotive.value : []),
         ...(remoteOK.status === "fulfilled" ? remoteOK.value : []),
         ...(jobicy.status === "fulfilled" ? jobicy.value : []),
         ...(arbeitnow.status === "fulfilled" ? arbeitnow.value : []),
         ...(himalayas.status === "fulfilled" ? himalayas.value : []),
         ...(wwr.status === "fulfilled" ? wwr.value : []),
      ]

      // Filter
      const matched = allJobs.filter(filterJob)

      // Deduplicate by URL (different sources may list the same job)
      const seen = new Set<string>()
      const unique = matched.filter((job) => {
         if (!job.url || seen.has(job.url)) return false
         seen.add(job.url)
         return true
      })

      // Sort newest first
      unique.sort((a, b) => {
         const da = new Date(a.publishedAt).getTime() || 0
         const db = new Date(b.publishedAt).getTime() || 0
         return db - da
      })

      // Return clean shape
      const formatted = unique.map((job) => ({
         id: job.id,
         title: job.title,
         company: job.company,
         logo: job.logo,
         url: job.url,
         location: job.location || "Worldwide",
         salary: job.salary,
         publishedAt: job.publishedAt,
         tags: job.tags,
         isIGaming: isIGamingRole(job.title, job.description, job.tags),
         ats: detectATS(job.url),
      }))

      return NextResponse.json({
         jobs: formatted,
         meta: {
            total: formatted.length,
            sources: {
               remotive: remotive.status === "fulfilled" ? remotive.value.length : 0,
               remoteOK: remoteOK.status === "fulfilled" ? remoteOK.value.length : 0,
               jobicy: jobicy.status === "fulfilled" ? jobicy.value.length : 0,
               arbeitnow: arbeitnow.status === "fulfilled" ? arbeitnow.value.length : 0,
               himalayas: himalayas.status === "fulfilled" ? himalayas.value.length : 0,
               wwr: wwr.status === "fulfilled" ? wwr.value.length : 0,
            },
            filteredAt: new Date().toISOString(),
         },
      })

   } catch (error) {
      console.error("Failed to fetch jobs:", error)
      return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
   }
}
