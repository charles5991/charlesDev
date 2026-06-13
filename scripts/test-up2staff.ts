// Using global fetch (native in Node.js v18+)

async function testFetch() {
   console.log("Fetching jobs from Up2Staff...")
   const bodyParams = new URLSearchParams()
   bodyParams.append("lang", "")
   bodyParams.append("search_keywords", "frontend developer")
   bodyParams.append("search_location", "")
   bodyParams.append("search_categories[]", "51")
   bodyParams.append("filter_job_type[]", "contract")
   bodyParams.append("filter_job_type[]", "full-time")
   bodyParams.append("filter_job_type[]", "")
   bodyParams.append("per_page", "30")
   bodyParams.append("orderby", "date")
   bodyParams.append("order", "DESC")
   bodyParams.append("page", "1")
   bodyParams.append("show_pagination", "false")
   bodyParams.append("form_data", "search_keywords=frontend%20developer&search_categories%5B%5D=51&filter_job_type%5B%5D=contract&filter_job_type%5B%5D=full-time&filter_job_type%5B%5D=")

   try {
      const response = await fetch("https://up2staff.com/jm-ajax/get_listings/", {
         method: "POST",
         headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "origin": "https://up2staff.com",
            "referer": "https://up2staff.com/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
            "x-requested-with": "XMLHttpRequest"
         },
         body: bodyParams.toString()
      })

      if (!response.ok) {
         console.error(`Error fetching: ${response.status} ${response.statusText}`)
         const text = await response.text()
         console.error(text.slice(0, 500))
         return
      }

      const data = (await response.json()) as any
      console.log(`Response received. found_jobs: ${data.found_jobs}, showing: ${data.showing}`)
      
      const html = data.html || ""
      if (!html) {
         console.log("No HTML returned.")
         return
      }

      // Split the HTML by "<li class=\"post-" to get separate job postings
      const chunks = html.split(/<li\s+class=["']post-/)
      console.log(`Found ${chunks.length - 1} job listing chunks in HTML.`)

      const parsedJobs = []
      for (let i = 1; i < chunks.length; i++) {
         const chunk = chunks[i]
         
         // 1. Extract Post ID
         const idMatch = chunk.match(/^(\d+)/)
         const id = idMatch ? idMatch[1] : `unknown-${i}`

         // 2. Extract Link URL
         const urlMatch = chunk.match(/href=["']([^"']+)["']/)
         const url = urlMatch ? urlMatch[1] : ""

         // 3. Extract Company Logo (optional)
         const logoMatch = chunk.match(/class=["']company_logo["'][^>]*src=["']([^"']+)["']/)
         const logo = logoMatch ? logoMatch[1] : ""

         // 4. Extract Job Title
         const titleMatch = chunk.match(/<h3>([^<]+)<\/h3>/)
         const title = titleMatch ? titleMatch[1].trim() : ""

         // 5. Extract Company Name
         const companyMatch = chunk.match(/<div\s+class=["']company["']>([\s\S]*?)<\/div>/)
         const company = companyMatch ? companyMatch[1].replace(/<[^>]+>/g, "").trim() : ""

         // 6. Extract Location
         const locationMatch = chunk.match(/<div\s+class=["']location["']>([\s\S]*?)<\/div>/)
         let location = ""
         if (locationMatch) {
            location = locationMatch[1]
               .replace(/<[^>]+>/g, " ") // replace tags with space
               .replace(/\s+/g, " ") // normalize whitespace
               .trim()
         }

         // 7. Extract Job Type / Meta Tag
         const typeMatch = chunk.match(/class=["']job-type[^"']*["']>([^<]+)<\/li>/)
         const jobType = typeMatch ? typeMatch[1].trim() : ""

         // 8. Extract Date
         const dateMatch = chunk.match(/<time\s+datetime=["']([^"']+)["']/)
         const date = dateMatch ? dateMatch[1] : ""

         // Parse tags
         const tags = jobType ? [jobType] : []

         parsedJobs.push({
            id: `up2staff-${id}`,
            title,
            company,
            logo,
            url,
            location,
            salary: "",
            publishedAt: date,
            tags,
            description: `${title} ${company} ${location} ${jobType}`.toLowerCase()
         })
      }

      console.log("First 3 parsed jobs:")
      console.log(JSON.stringify(parsedJobs.slice(0, 3), null, 2))
      console.log(`Total parsed jobs: ${parsedJobs.length}`)

   } catch (error) {
      console.error("Fetch failed:", error)
   }
}

testFetch()
