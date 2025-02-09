import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default async function Header() {
  const { userId } = await auth()
  const isSignedIn = !!userId

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between">
        <div className="mr-4 md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-4xl sm:inline-block text-purple-700">TLDReel</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignUpButton mode="modal">
                <Button variant="outline" className="rounded-full bg-transparent border-purple-700">Sign up</Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="default" className="rounded-full bg-[#8161FF]">Log in</Button>
              </SignInButton>
            </>
          )}
        </div>
      </div>
    </header>
  )
}