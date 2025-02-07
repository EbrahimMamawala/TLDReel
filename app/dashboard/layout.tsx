import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import CollapsibleSidebar from "../components/CollapsibleSidebar"
import type React from "react"

const chatHistory = [
  { id: 1, title: "React Components Discussion", date: "2024-02-01" },
  { id: 2, title: "Database Schema Planning", date: "2024-02-02" },
  { id: 3, title: "API Integration Questions", date: "2024-02-03" },
  { id: 4, title: "Performance Optimization Chat", date: "2024-02-04" },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/")
  }

  // Extract only the required fields from the `user` object
  const plainUser = {
    firstName: user?.firstName || null,
  }

  return (
    <html lang="en" className="h-full">
      <body className="h-full flex overflow-hidden">
        {/* Pass the plainUser object */}
        <CollapsibleSidebar user={plainUser} chatHistory={chatHistory} />

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-hidden">{children}</div>
      </body>
    </html>
  )
}
