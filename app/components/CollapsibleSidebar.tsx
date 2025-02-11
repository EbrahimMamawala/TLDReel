"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
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
}

export default function CollapsibleSidebar({ user, chatHistory }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(false) // Default to closed for mobile devices

  const toggleSidebar = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event propagation to overlay
    setIsOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }
  const router = useRouter()

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
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
          <div className="flex items-center gap-2 mb-6 mt-10">
            <p className="text-sm font-bold text-foreground">Points🏅: 123</p>
          </div>
          <div className="space-y-2">
            <Button className="w-full justify-start" onClick={() => router.push(`/dashboard`)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Topic
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <h2 className="font-bold mb-2 text-sm text-foreground">Topic History</h2>
          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <Button key={chat._id} variant="ghost" className="w-full justify-start text-left" onClick={() => router.push(`/dashboard/${chat._id}`)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                <div className="break-words">
                  <div className="text-sm">{chat.name}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Desktop Toggle Button */}
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
