import createJiti from "jiti"
import { fileURLToPath } from "node:url"
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti("./app/env")

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      domains: ["images.unsplash.com"],
   },
}

export default nextConfig
