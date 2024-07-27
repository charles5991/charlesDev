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
   } as Record<string, string | undefined>, // Type assertion
})
