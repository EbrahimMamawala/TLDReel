"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs"; // Ensure the worker file is loaded

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();

export default function ChatUI() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState({ easy: [], medium: [], difficult: [] });

  const handlePDFClick = () => {
    document.getElementById("file-upload")?.click();
  };

  const extractTextFromPDF = async (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const loadingTask = pdfjs.getDocument({ data: new Uint8Array(reader.result as ArrayBuffer) });
          const pdf = await loadingTask.promise;
          let extractedText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            extractedText += textContent.items.map((item) => (item as any).str).join(" ") + " ";
          }

          resolve(extractedText.trim());
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(reader.error);
    });
  };

  const handleSubmit = async () => {
    if (!inputText && !file) {
      alert("Enter text or upload a file");
      return;
    }

    setLoading(true);
    let combinedText = inputText.trim();

    if (file) {
      try {
        const extractedText = await extractTextFromPDF(file);
        combinedText += ` ${extractedText}`;
      } catch (error) {
        alert("Failed to extract text from PDF");
        setLoading(false);
        return;
      }
    }

    const topicId = uuidv4();

    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: combinedText }),
      });

      if (response.ok) {
        const data = await response.json();
        const data1 = JSON.parse(data);
        setTopics(data1.topics);
        router.push(`/dashboard/${topicId}?topics=${encodeURIComponent(JSON.stringify(data1.topics))}`);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setLoading(false);
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
              disabled={loading}
            >
              {loading ? "Processing..." : "Get Started"}
            </Button>
          </div>
          {file && <div className="mt-2 text-sm text-gray-600">Selected file: {file.name}</div>}
        </div>
      </div>
    </div>
  );
}
