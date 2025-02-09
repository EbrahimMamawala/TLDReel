"use client";

import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ChatUI() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handlePDFClick = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleSubmit = () => {
    const topicId = uuidv4();
    router.push(`/dashboard/${topicId}`);
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col h-screen justify-center mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-5">What do you want to learn today?</h1>
          <div className="relative w-full max-w-6xl">
            <Input
              placeholder="Search for a topic or upload a PDF..."
              className="pr-48 h-14"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-[120px] top-1/2 -translate-y-1/2"
              onClick={handlePDFClick}
              type="button"
            >
              <Upload className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button
              variant="default"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSubmit}
            >
              Get Started
            </Button>
          </div>
          {file && <div className="mt-2 text-sm text-gray-600">Selected file: {file.name}</div>}
        </div>
      </div>
    </div>
  );
}
