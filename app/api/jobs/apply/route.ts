import { NextResponse } from "next/server"
import { auth } from "@/app/auth"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
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
      const body = await request.json()
      const {
         jobTitle,
         company,
         jobUrl,
         applicantName,
         applicantEmail,
         phone,
         linkedin,
         github,
         website,
         coverLetter,
         resumeBase64, // base64 encoded PDF
         resumeFilename,
      } = body

      if (!jobTitle || !company || !applicantEmail) {
         return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }

      // Send to yourself first — a copy of every application for your records
      const selfCopyResult = await resend.emails.send({
         from: "Job Applications <onboarding@resend.dev>", // or your verified sender
         to: applicantEmail,
         subject: `📋 Application Sent: ${jobTitle} @ ${company}`,
         html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
               <h2 style="color: #111;">Application Submitted ✅</h2>
               <p style="color: #555;">This is your personal record copy.</p>
               
               <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                  <tr>
                     <td style="padding: 8px; border-bottom: 1px solid #eee; color: #888; width: 140px;">Role</td>
                     <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">${jobTitle}</td>
                  </tr>
                  <tr>
                     <td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Company</td>
                     <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">${company}</td>
                  </tr>
                  <tr>
                     <td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Job URL</td>
                     <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="${jobUrl}">${jobUrl}</a></td>
                  </tr>
                  <tr>
                     <td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Applied at</td>
                     <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })} (KL)</td>
                  </tr>
               </table>
               
               <h3 style="color: #111;">Cover Letter</h3>
               <div style="background: #f9f9f9; border-left: 3px solid #10b981; padding: 16px; white-space: pre-wrap;">${coverLetter || "No cover letter included."}</div>
               
               <h3 style="color: #111;">Profile Links</h3>
               <ul style="color: #555;">
                  ${linkedin ? `<li><a href="${linkedin}">LinkedIn</a></li>` : ""}
                  ${github ? `<li><a href="${github}">GitHub</a></li>` : ""}
                  ${website ? `<li><a href="${website}">Portfolio</a></li>` : ""}
               </ul>
            </div>
         `,
         attachments: resumeBase64 ? [
            {
               filename: resumeFilename || "resume.pdf",
               content: resumeBase64,
            }
         ] : [],
      })

      if (selfCopyResult.error) {
         console.error("Resend error:", selfCopyResult.error)
         return NextResponse.json(
            { error: "Failed to send email", detail: selfCopyResult.error },
            { status: 500 }
         )
      }

      return NextResponse.json({
         success: true,
         message: `Application record sent to ${applicantEmail}`,
         emailId: selfCopyResult.data?.id,
      })
   } catch (error) {
      console.error("Apply error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
   }
}
