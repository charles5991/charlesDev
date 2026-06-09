import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
   server: {
      GITHUB_TOKEN: z.string().startsWith("github_pat"),
      AUTH_GITHUB_ID: z.string(),
      AUTH_GITHUB_SECRET: z.string(),
      POSTGRES_DATABASE: z.string(),
      POSTGRES_HOST: z.string(),
      POSTGRES_PASSWORD: z.string(),
      POSTGRES_URL: z.string().url(),
      RESEND_API_KEY: z.string(),
      NEXTAUTH_URL: z.string(),
      NEXTAUTH_SECRET: z.string(),
      AUTH_GOOGLE_ID: z.string().optional(),
      AUTH_GOOGLE_SECRET: z.string().optional(),
   },
   experimental__runtimeEnv: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
      AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
      POSTGRES_HOST: process.env.POSTGRES_HOST,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_URL: process.env.POSTGRES_URL,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
      AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
   } as Record<string, string | undefined>,
   skipValidation: !!process.env.SKIP_ENV_VALIDATION || process.env.NODE_ENV === "development",
})
