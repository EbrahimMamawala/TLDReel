import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import CollapsibleSidebar from "../components/CollapsibleSidebar"
import type React from "react"
import { headers } from "next/headers";

async function fetchChatHistory() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${baseUrl}/generate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
}


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

  const chatHistory = await fetchChatHistory();

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
