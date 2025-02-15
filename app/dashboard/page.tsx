"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ChatUI() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handlePDFClick = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    const userInput = inputText || file?.name || '';

    try {
      // Send POST request to /generate
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to create topic");
      }

      // Parse the response to get the MongoDB _id
      const data = await response.json();
      console.log(data)
      const topicId = data.topic_id; // Assuming the server returns the created document with _id

      // Navigate to the new topic page
      router.push(`/dashboard/${topicId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
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
              disabled={isLoading} // Disable input while loading
            />
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={isLoading} // Disable file input while loading
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-[120px] top-1/2 -translate-y-1/2"
              onClick={handlePDFClick}
              type="button"
              disabled={isLoading} // Disable button while loading
            >
              <Upload className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button
              variant="default"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSubmit}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Loading..." : "Get Started"}
            </Button>
          </div>
          {file && <div className="mt-2 text-sm text-gray-600">Selected file: {file.name}</div>}
        </div>
      </div>
    </div>
  );
}