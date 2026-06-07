"use server"

import { octokit } from "@/lib/octokit"

export async function getGithubStats() {
   const hasGithubToken = process.env.GITHUB_TOKEN?.startsWith("github_pat")
   if (!hasGithubToken) {
      return {
         issues: 0,
         prs: 0,
         followers: 0,
         stars: 0,
      }
   }

   try {
      const gql = String.raw
      const { user } = await octokit.graphql<{
         user: {
            repositoriesContributedTo: { totalCount: number }
            pullRequests: { totalCount: number }
            openIssues: { totalCount: number }
            closedIssues: { totalCount: number }
            followers: { totalCount: number }
            repositories: {
               totalCount: number
               nodes: {
                  stargazers: { totalCount: number }
               }[]
               pageInfo: {
                  hasNextPage: boolean
                  endCursor: string | null
               }
            }
         }
      }>(
         gql`
            query ($login: String!) {
               user(login: $login) {
                  pullRequests(first: 1) {
                     totalCount
                  }
                  openIssues: issues(states: OPEN) {
                     totalCount
                  }
                  closedIssues: issues(states: CLOSED) {
                     totalCount
                  }
                  followers {
                     totalCount
                  }
                  repositories(ownerAffiliations: OWNER, first: 100) {
                     totalCount
                     nodes {
                        stargazers {
                           totalCount
                        }
                     }
                     pageInfo {
                        hasNextPage
                        endCursor
                     }
                  }
               }
            }
         `,
         { login: "charles5991" },
      )
      return {
         issues: user.closedIssues.totalCount + user.openIssues.totalCount,
         prs: user.pullRequests.totalCount,
         followers: user.followers.totalCount,
         stars: user.repositories.nodes.reduce(
            (totalStars, repo) => totalStars + repo.stargazers.totalCount,
            0,
         ),
      }
   } catch (error) {
      console.warn("Failed to fetch Github stats:", error)
      return {
         issues: 0,
         prs: 0,
         followers: 0,
         stars: 0,
      }
   }
}

export async function getGithubContributions() {
   const hasGithubToken = process.env.GITHUB_TOKEN?.startsWith("github_pat")
   if (!hasGithubToken) {
      return {
         totalContributions: 0,
         latestContributions: [],
         maxContributionDay: { contributionCount: 0, date: "", color: "" },
      }
   }

   try {
      const gql = String.raw
      const { user } = await octokit.graphql<{
         user: {
            contributionsCollection: {
               contributionCalendar: {
                  totalContributions: number
                  weeks: {
                     contributionDays: {
                        color: string
                        contributionCount: number
                        date: string
                     }[]
                  }[]
               }
            }
         }
      }>(
         gql`
            query ($login: String!) {
               user(login: $login) {
                  contributionsCollection {
                     contributionCalendar {
                        totalContributions
                        weeks {
                           contributionDays {
                              color
                              contributionCount
                              date
                           }
                        }
                     }
                  }
               }
            }
         `,
         { login: "charles5991" },
      )

      const weeklyContributions =
         user.contributionsCollection.contributionCalendar.weeks

      // find the day with the highest contribution count.
      let maxContributionDay = { contributionCount: 0, date: "", color: "" }

      for (let week of weeklyContributions) {
         for (let day of week.contributionDays) {
            if (day.contributionCount > maxContributionDay.contributionCount) {
               maxContributionDay = day
            }
         }
      }
      const latestContributions = weeklyContributions.slice(-11)
      const totalContributions =
         user.contributionsCollection.contributionCalendar.totalContributions
      return {
         totalContributions,
         latestContributions,
         maxContributionDay,
      }
   } catch (error) {
      console.warn("Failed to fetch Github contributions:", error)
      return {
         totalContributions: 0,
         latestContributions: [],
         maxContributionDay: { contributionCount: 0, date: "", color: "" },
      }
   }
}
