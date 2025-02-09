"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

export function LanguageSelector({ selectedLanguage, setSelectedLanguage }: { selectedLanguage: string, setSelectedLanguage: (lang: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="hi">हिंदी</SelectItem>
          <SelectItem value="te">తెలుగు</SelectItem>
          <SelectItem value="ta">தமிழ்</SelectItem>
          <SelectItem value="mr">मराठी</SelectItem>
          <SelectItem value="bn">বাংলা</SelectItem>
          <SelectItem value="gu">ગુજરાતી</SelectItem>
          <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
          <SelectItem value="ml">മലയാലം</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
