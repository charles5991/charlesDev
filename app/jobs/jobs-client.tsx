"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
   Search,
   Briefcase,
   MapPin,
   DollarSign,
   Settings,
   MousePointerClick,
   RefreshCw,
   Sparkles,
   Check,
   Copy,
   Send,
   X,
   History,
   Clock,
   ExternalLink,
   Loader2,
   ChevronDown,
   ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heading } from "@/components/heading"
import { generateBookmarklet, type ProfileData } from "@/lib/bookmarklet"

// ── Types ──────────────────────────────────────────────────────────────────
type Job = {
   id: string
   title: string
   company: string
   logo: string
   url: string
   location: string
   salary: string
   publishedAt: string
   tags: string[]
   isIGaming?: boolean
   ats?: { type: string; company?: string; jobId?: string }
}

type AppliedRecord = {
   id: string
   jobTitle: string
   company: string
   jobUrl: string
   appliedAt: string // ISO
   coverLetter: string
   status: "applied" | "interviewing" | "rejected" | "offer"
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getSeniorityBadge(title: string): { label: string; className: string } | null {
   const t = title.toLowerCase()
   if (t.includes("principal") || t.includes("staff"))
      return { label: "Principal", className: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300" }
   if (t.includes("lead") || t.includes("head of"))
      return { label: "Lead", className: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" }
   if (t.includes("senior") || t.includes("sr.") || t.includes("sr "))
      return { label: "Senior", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" }
   return { label: "Mid-level", className: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400" }
}

function timeAgo(dateStr: string): string {
   if (!dateStr) return ""
   const diff = Date.now() - new Date(dateStr).getTime()
   const days = Math.floor(diff / 86400000)
   if (days === 0) return "Today"
   if (days === 1) return "Yesterday"
   if (days < 7) return `${days}d ago`
   if (days < 30) return `${Math.floor(days / 7)}w ago`
   return `${Math.floor(days / 30)}mo ago`
}

const STATUS_STYLES: Record<AppliedRecord["status"], string> = {
   applied: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
   interviewing: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
   rejected: "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400",
   offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
}

// ── Apply Modal ────────────────────────────────────────────────────────────
function ApplyModal({
   job,
   profile,
   onClose,
   onApplied,
}: {
   job: Job
   profile: ProfileData
   onClose: () => void
   onApplied: (record: AppliedRecord) => void
}) {
   const DEFAULT_CL = `Hi,

I'm Charles Chan, a Senior Frontend Engineer based in Malaysia with ${new Date().getFullYear() - 2018}+ years of experience building scalable web applications using React, Next.js, TypeScript, and Vue.

I came across the ${job.title} opening at ${job.company} and I'm very interested. My background includes leading frontend architecture for real-time platforms, iGaming products, and cross-platform mobile apps using React Native and Flutter.

I'd love to bring my experience to your team. You can view my portfolio at https://charlesdev2u.vercel.app and my GitHub at https://github.com/charles5991.

Looking forward to hearing from you.

Best,
Charles Chan
+60183894218`

   const [coverLetter, setCoverLetter] = useState(DEFAULT_CL)
   const [sending, setSending] = useState(false)
   const [sent, setSent] = useState(false)
   const [error, setError] = useState("")
   const backdropRef = useRef<HTMLDivElement>(null)

   const handleSend = async () => {
      if (!profile.email) {
         setError("Please fill in your email in Autofill Setup first.")
         return
      }
      setSending(true)
      setError("")
      try {
         const res = await fetch("/api/jobs/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               jobTitle: job.title,
               company: job.company,
               jobUrl: job.url,
               applicantName: profile.name,
               applicantEmail: profile.email,
               phone: profile.phone,
               linkedin: profile.linkedin,
               github: profile.github,
               website: profile.website,
               coverLetter,
            }),
         })
         const data = await res.json()
         if (!res.ok) throw new Error(data.error || "Send failed")
         setSent(true)
         const record: AppliedRecord = {
            id: job.id,
            jobTitle: job.title,
            company: job.company,
            jobUrl: job.url,
            appliedAt: new Date().toISOString(),
            coverLetter,
            status: "applied",
         }
         onApplied(record)
         setTimeout(onClose, 1800)
      } catch (e: any) {
         setError(e.message || "Something went wrong")
      } finally {
         setSending(false)
      }
   }

   return (
      <div
         ref={backdropRef}
         className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
         onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
      >
         <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative w-full max-w-xl rounded-t-2xl bg-white p-5 shadow-2xl dark:bg-neutral-900 sm:rounded-2xl"
         >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
               <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">Quick Apply</p>
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{job.title}</h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{job.company} · {job.location}</p>
               </div>
               <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <X className="h-4 w-4" />
               </button>
            </div>

            {/* Profile summary */}
            <div className="mt-4 flex flex-wrap gap-2 rounded-xl bg-neutral-50 p-3 text-xs dark:bg-neutral-800/50">
               <span className="font-semibold text-neutral-700 dark:text-neutral-300">{profile.name || "—"}</span>
               <span className="text-neutral-400">·</span>
               <span className="text-neutral-500">{profile.email || <span className="text-red-400">Email missing</span>}</span>
               <span className="text-neutral-400">·</span>
               <span className="text-neutral-500">{profile.phone}</span>
            </div>

            {/* Cover letter */}
            <div className="mt-4 space-y-1.5">
               <Label className="text-xs font-semibold">Cover Letter</Label>
               <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-white p-3 text-xs leading-relaxed text-neutral-700 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
               />
            </div>

            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

            {/* Actions */}
            <div className="mt-4 flex gap-2">
               <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
               >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Job
               </a>
               <button
                  onClick={handleSend}
                  disabled={sending || sent}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white transition-all ${sent
                     ? "bg-emerald-500"
                     : "bg-neutral-900 hover:bg-neutral-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                     } disabled:opacity-70`}
               >
                  {sent ? (
                     <><Check className="h-4 w-4" /> Applied! Record saved</>
                  ) : sending ? (
                     <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : (
                     <><Send className="h-4 w-4" /> Send Application</>
                  )}
               </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-neutral-400">
               Sends a copy to your email as an application record. No redirect.
            </p>
         </motion.div>
      </div>
   )
}

// ── Main component ─────────────────────────────────────────────────────────
export function JobsClient() {
   const [activeTab, setActiveTab] = useState<"search" | "history" | "profile">("search")
   const [jobs, setJobs] = useState<Job[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)
   const [searchQuery, setSearchQuery] = useState("")
   const [selectedLocation, setSelectedLocation] = useState<string>("all")
   const [meta, setMeta] = useState<{ total: number; sources: Record<string, number> } | null>(null)
   const [applyingJob, setApplyingJob] = useState<Job | null>(null)
   const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set())
   const [history, setHistory] = useState<AppliedRecord[]>([])
   const [expandedHistory, setExpandedHistory] = useState<string | null>(null)

   const [profile, setProfile] = useState<ProfileData>({
      name: "Charles Chan",
      email: "charleschan5991@gmail.com",
      phone: "+60183894218",
      github: "https://github.com/charles5991",
      linkedin: "https://www.linkedin.com/in/charleschan5991/",
      website: "https://charlesdev2u.vercel.app",
   })
   const [copied, setCopied] = useState(false)

   useEffect(() => {
      if (typeof window !== "undefined") {
         // Load profile
         const storedProfile = localStorage.getItem("job_profile")
         if (storedProfile) {
            try {
               const parsed = JSON.parse(storedProfile)
               setProfile((d) => ({
                  ...d,
                  ...Object.fromEntries(Object.entries(parsed).filter(([, v]) => v !== "" && v != null)),
               }))
            } catch { }
         }
         // Load history
         const storedHistory = localStorage.getItem("job_applied_history")
         if (storedHistory) {
            try {
               const parsed: AppliedRecord[] = JSON.parse(storedHistory)
               setHistory(parsed)
               setAppliedIds(new Set(parsed.map((r) => r.id)))
            } catch { }
         }
      }
      fetchJobs()
   }, [])

   const fetchJobs = async () => {
      setLoading(true)
      setError(null)
      try {
         const res = await fetch("/api/jobs")
         if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.statusText}`)
         const data = await res.json()
         setJobs(data.jobs || [])
         setMeta(data.meta || null)
      } catch (err: any) {
         setError(err.message || "An unexpected error occurred")
      } finally {
         setLoading(false)
      }
   }

   const handleApplied = (record: AppliedRecord) => {
      const updated = [record, ...history.filter((r) => r.id !== record.id)]
      setHistory(updated)
      setAppliedIds((prev) => new Set([...Array.from(prev), record.id]))
      localStorage.setItem("job_applied_history", JSON.stringify(updated))
   }

   const updateStatus = (id: string, status: AppliedRecord["status"]) => {
      const updated = history.map((r) => (r.id === id ? { ...r, status } : r))
      setHistory(updated)
      localStorage.setItem("job_applied_history", JSON.stringify(updated))
   }

   const deleteRecord = (id: string) => {
      const updated = history.filter((r) => r.id !== id)
      setHistory(updated)
      setAppliedIds((prev) => { const next = Array.from(prev).filter((x) => x !== id); return new Set(next) })
      localStorage.setItem("job_applied_history", JSON.stringify(updated))
   }

   const handleProfileChange = (field: keyof ProfileData, value: string) => {
      const updated = { ...profile, [field]: value }
      setProfile(updated)
      localStorage.setItem("job_profile", JSON.stringify(updated))
   }

   const bookmarkletHref = generateBookmarklet(profile)
   const locations = ["all", ...Array.from(new Set(jobs.map((j) => j.location)))]
   const filteredJobs = jobs.filter((job) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
         job.title.toLowerCase().includes(q) ||
         job.company.toLowerCase().includes(q) ||
         job.tags.some((tag) => tag.toLowerCase().includes(q))
      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation
      return matchesSearch && matchesLocation
   })

   const copyBookmarkletCode = () => {
      navigator.clipboard.writeText(bookmarkletHref)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
   }

   return (
      <>
         {/* Apply modal overlay */}
         <AnimatePresence>
            {applyingJob && (
               <ApplyModal
                  job={applyingJob}
                  profile={profile}
                  onClose={() => setApplyingJob(null)}
                  onApplied={handleApplied}
               />
            )}
         </AnimatePresence>

         <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
               <div>
                  <Heading className="my-0 flex items-center gap-2 text-2xl font-bold">
                     <Briefcase className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
                     Remote Job Dashboard
                  </Heading>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                     Secret panel · Senior Frontend · APAC / Worldwide / iGaming · Last 30 days
                  </p>
                  {meta && (
                     <div className="mt-2 flex flex-wrap gap-1.5">
                        {Object.entries(meta.sources).map(([src, count]) => (
                           <span
                              key={src}
                              className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                           >
                              {src}: {count as number}
                           </span>
                        ))}
                     </div>
                  )}
               </div>

               {/* Tab switcher */}
               <div className="flex gap-1 rounded-xl bg-neutral-200/50 p-1 dark:bg-neutral-900/50">
                  {(["search", "history", "profile"] as const).map((tab) => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${activeTab === tab
                           ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-100"
                           : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                           }`}
                     >
                        {tab === "search" && "Jobs"}
                        {tab === "history" && (
                           <>
                              <History className="h-3.5 w-3.5" />
                              Applied
                              {history.length > 0 && (
                                 <span className="ml-0.5 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                    {history.length}
                                 </span>
                              )}
                           </>
                        )}
                        {tab === "profile" && (
                           <><Settings className="h-3.5 w-3.5" /> Setup</>
                        )}
                     </button>
                  ))}
               </div>
            </div>

            <AnimatePresence mode="wait">
               {/* ── JOBS TAB ── */}
               {activeTab === "search" && (
                  <motion.div key="search" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                     <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                           <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                           <Input
                              type="text"
                              placeholder="Search by title, company, or tech..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10"
                           />
                        </div>
                        <div className="flex gap-2">
                           <select
                              value={selectedLocation}
                              onChange={(e) => setSelectedLocation(e.target.value)}
                              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                           >
                              <option value="all">All Locations</option>
                              {locations.filter((l) => l !== "all").map((loc) => (
                                 <option key={loc} value={loc}>{loc}</option>
                              ))}
                           </select>
                           <Button variant="outline" size="icon" onClick={fetchJobs} disabled={loading} className="shrink-0">
                              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                           </Button>
                        </div>
                     </div>

                     {!loading && !error && (
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">
                           {filteredJobs.length} roles matched · last 30 days
                        </p>
                     )}

                     {loading ? (
                        <div className="space-y-3">
                           {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="h-[120px] w-full animate-pulse rounded-xl border border-neutral-200 bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/30" />
                           ))}
                        </div>
                     ) : error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-950 dark:bg-red-950/20">
                           <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                     ) : filteredJobs.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-neutral-200 py-12 text-center dark:border-neutral-800">
                           <p className="text-neutral-500 dark:text-neutral-400">No jobs found matching filters.</p>
                        </div>
                     ) : (
                        <div className="space-y-3">
                           {filteredJobs.map((job) => {
                              const isApplied = appliedIds.has(job.id)
                              return (
                                 <motion.div
                                    key={job.id}
                                    layoutId={`job-${job.id}`}
                                    className={`relative overflow-hidden rounded-xl border p-4 shadow-sm transition-colors ${isApplied
                                       ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-950/10"
                                       : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/40"
                                       }`}
                                 >
                                    {isApplied && (
                                       <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                                          <Check className="h-2.5 w-2.5" /> Applied
                                       </div>
                                    )}
                                    <div className="flex items-start justify-between gap-4">
                                       <div className="min-w-0 flex-1 space-y-1">
                                          <div className="flex flex-wrap items-center gap-2">
                                             <h3 className="font-bold text-neutral-900 dark:text-neutral-100">{job.title}</h3>
                                             {(() => {
                                                const badge = getSeniorityBadge(job.title)
                                                return badge ? (
                                                   <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.className}`}>{badge.label}</span>
                                                ) : null
                                             })()}
                                             {job.isIGaming && (
                                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                                                   🎰 iGaming
                                                </span>
                                             )}
                                          </div>
                                          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{job.company}</p>
                                          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                             <span className="flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 shrink-0" />{job.location}
                                             </span>
                                             {job.salary && (
                                                <span className="flex items-center gap-1">
                                                   <DollarSign className="h-3.5 w-3.5 shrink-0" />{job.salary}
                                                </span>
                                             )}
                                             {job.publishedAt && (
                                                <span className="flex items-center gap-1">
                                                   <Clock className="h-3.5 w-3.5 shrink-0" />{timeAgo(job.publishedAt)}
                                                </span>
                                             )}
                                          </div>
                                          {job.tags && job.tags.length > 0 && (
                                             <div className="flex flex-wrap gap-1.5 pt-2">
                                                {job.tags.slice(0, 5).map((tag) => (
                                                   <span key={tag} className="rounded-lg bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                                      {tag}
                                                   </span>
                                                ))}
                                             </div>
                                          )}
                                       </div>

                                       {/* Apply button */}
                                       <button
                                          onClick={() => setApplyingJob(job)}
                                          className={`shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${isApplied
                                             ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                                             : "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                                             }`}
                                       >
                                          {isApplied ? (
                                             <><Check className="h-3.5 w-3.5" /> Applied</>
                                          ) : (
                                             <><Send className="h-3.5 w-3.5" /> Apply</>
                                          )}
                                       </button>
                                    </div>
                                 </motion.div>
                              )
                           })}
                        </div>
                     )}
                  </motion.div>
               )}

               {/* ── HISTORY TAB ── */}
               {activeTab === "history" && (
                  <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                     <p className="text-xs text-neutral-400">{history.length} application{history.length !== 1 ? "s" : ""} tracked</p>
                     {history.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-neutral-200 py-16 text-center dark:border-neutral-800">
                           <History className="mx-auto mb-3 h-8 w-8 text-neutral-300 dark:text-neutral-700" />
                           <p className="text-sm text-neutral-400">No applications yet. Hit Apply on a job!</p>
                        </div>
                     ) : (
                        history.map((record) => (
                           <div key={record.id} className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/40">
                              <div className="flex items-start justify-between gap-3 p-4">
                                 <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                       <h3 className="font-bold text-neutral-900 dark:text-neutral-100">{record.jobTitle}</h3>
                                       <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[record.status]}`}>
                                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                       </span>
                                    </div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{record.company}</p>
                                    <p className="mt-1 text-xs text-neutral-400">
                                       Applied {new Date(record.appliedAt).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" })}
                                    </p>
                                 </div>
                                 <div className="flex shrink-0 items-center gap-1.5">
                                    <a href={record.jobUrl} target="_blank" rel="noopener noreferrer"
                                       className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                       <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                    <button onClick={() => setExpandedHistory(expandedHistory === record.id ? null : record.id)}
                                       className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                       {expandedHistory === record.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                                    </button>
                                    <button onClick={() => deleteRecord(record.id)}
                                       className="rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30">
                                       <X className="h-3.5 w-3.5" />
                                    </button>
                                 </div>
                              </div>

                              {/* Status changer + cover letter expand */}
                              {expandedHistory === record.id && (
                                 <div className="border-t border-neutral-100 px-4 pb-4 pt-3 dark:border-neutral-800">
                                    <p className="mb-2 text-xs font-semibold text-neutral-500">Update Status</p>
                                    <div className="mb-3 flex flex-wrap gap-2">
                                       {(["applied", "interviewing", "rejected", "offer"] as const).map((s) => (
                                          <button key={s} onClick={() => updateStatus(record.id, s)}
                                             className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all ${record.status === s ? STATUS_STYLES[s] : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"}`}>
                                             {s.charAt(0).toUpperCase() + s.slice(1)}
                                          </button>
                                       ))}
                                    </div>
                                    <p className="mb-1 text-xs font-semibold text-neutral-500">Cover Letter Sent</p>
                                    <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap rounded-lg bg-neutral-50 p-3 text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                       {record.coverLetter}
                                    </pre>
                                 </div>
                              )}
                           </div>
                        ))
                     )}
                  </motion.div>
               )}

               {/* ── PROFILE / SETUP TAB ── */}
               {activeTab === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                     <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/30">
                        <h3 className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100">
                           <Sparkles className="h-4 w-4 text-emerald-500" />
                           Autofill Bookmarklet
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                           Drag the button below to your Bookmarks Bar. On any ATS form, click it to auto-fill.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                           <a href={bookmarkletHref} onClick={(e) => e.preventDefault()}
                              className="flex cursor-grab items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-95"
                              title="Drag me to your Bookmarks Bar!">
                              <MousePointerClick className="h-4 w-4" />
                              Drag: Auto-Fill Form
                           </a>
                           <Button variant="outline" size="sm" onClick={copyBookmarkletCode} className="gap-1 text-xs">
                              {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy Script</>}
                           </Button>
                        </div>
                     </div>

                     <div className="grid gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
                        <div>
                           <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Profile Information</h3>
                           <p className="text-xs text-neutral-500 dark:text-neutral-400">Saved instantly. Used to auto-fill the Apply modal.</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                           {([
                              { id: "name", label: "Full Name", placeholder: "Charles Chan", type: "text" },
                              { id: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
                              { id: "phone", label: "Phone Number", placeholder: "+60183894218", type: "text" },
                              { id: "website", label: "Portfolio Website", placeholder: "https://charlesdev2u.vercel.app", type: "text" },
                              { id: "github", label: "GitHub Profile", placeholder: "https://github.com/charles5991", type: "text" },
                              { id: "linkedin", label: "LinkedIn Profile", placeholder: "https://linkedin.com/in/username", type: "text" },
                           ] as { id: keyof ProfileData; label: string; placeholder: string; type: string }[]).map(({ id, label, placeholder, type }) => (
                              <div key={id} className="space-y-1.5">
                                 <Label htmlFor={id}>{label}</Label>
                                 <Input
                                    id={id}
                                    type={type || "text"}
                                    value={profile[id]}
                                    onChange={(e) => handleProfileChange(id, e.target.value)}
                                    placeholder={placeholder}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </>
   )
}
