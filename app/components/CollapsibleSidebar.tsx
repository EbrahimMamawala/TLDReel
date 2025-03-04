"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuth, UserButton } from "@clerk/nextjs"
import { MessageSquare, PlusCircle, Menu } from "lucide-react"
import { useRouter } from "next/navigation"

interface CollapsibleSidebarProps {
  user: {
    firstName?: string | null
  }
  chatHistory: Array<{
    _id: number
    name: string
  }>
  userId: string
}

export default function CollapsibleSidebar({ user, chatHistory, userId }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [points, setPoints] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${baseUrl}/get-score`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-ID": userId
          },
        });
    
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        const data = await res.json()
        setPoints(data.points)
      } catch (error) {
        console.error("Error fetching points for given user:", error);
        return [];
      }
    }
    fetchPoints()
  }, [userId])

  const toggleSidebar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 border-r bg-purple-200 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-6 mt-10">
            <UserButton />
            <span className="font-medium">Hello, {user?.firstName || "Guest"}</span>
          </div>
          <p className="text-md font-bold text-foreground pb-4">
            Points🏅: {points !== null ? points : "Loading..."}
          </p>
          <div className="space-y-2">
            <Button className="w-full justify-start" onClick={() => router.push(`/dashboard`)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Topic
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <h2 className="font-bold mb-2 text-sm text-foreground">Topic History</h2>
          <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {chatHistory.map((chat) => (
              <Button
                key={chat._id}
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => router.push(`/dashboard/${chat._id}`)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <div className="break-words">
                  <div className="text-sm">{chat.name}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4 hidden lg:flex h-8 w-8 rounded-full border bg-background"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
