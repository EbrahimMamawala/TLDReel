"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus, Check } from "lucide-react"

interface TopicButtonProps {
  content: string
  isSelected: boolean
  onClick: () => void
  rowIndex: number
}

export function TopicButton({ content, isSelected, onClick, rowIndex }: TopicButtonProps) {
  const getRowColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-green-100 hover:bg-green-200 data-[state=selected]:bg-green-500"
      case 1:
        return "bg-yellow-100 hover:bg-yellow-200 data-[state=selected]:bg-yellow-500"
      case 2:
        return "bg-red-100 hover:bg-red-200 data-[state=selected]:bg-red-500"
      default:
        return ""
    }
  }

  return (
    <Button
      onClick={onClick}
      variant="outline"
      data-state={isSelected ? "selected" : "default"}
      className={cn(
        "rounded-full px-6 transition-colors flex items-center gap-2",
        getRowColor(rowIndex),
        isSelected && "text-white",
      )}
    >
      {content}
      {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
    </Button>
  )
}

