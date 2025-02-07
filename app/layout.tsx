import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider} from "@clerk/nextjs"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PDF to Video - Learn something quick",
  description: "Boost productivity your work process with our intuitive SaaS platform.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
       <html lang="en" className="scroll-smooth">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

