import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export default async function ChatUI() {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId) {
    redirect("/");
  }
  
  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col h-screen justify-center mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-5">What do you want to learn today?</h1>
          <div className="relative w-full max-w-6xl">
            <Input placeholder="Search for a topic or upload a PDF..." className="pr-48 h-14" />
            <Button 
              size="sm" 
              variant="ghost" 
              className="absolute right-[120px] top-1/2 -translate-y-1/2"
            >
              <Upload className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button 
              variant="default" 
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Get Started
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Checkbox id="roadmap" />
            <label htmlFor="roadmap" className="text-sm font-medium leading-none">
              Build Roadmap
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}