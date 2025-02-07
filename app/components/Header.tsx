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
            <span className="font-bold text-2xl sm:inline-block">PDF to Video</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#features">Features</Link>
            <Link href="#use-cases">Use Cases</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">Log in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  )
}