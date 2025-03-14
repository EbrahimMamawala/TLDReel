import { Mail, Instagram, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {

  const socialLinks = [
    { icon: Mail, href: "mailto:contact@example.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
  ]

  return (
    <footer className="border-t py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
          <div>
            <h3 className="text-4xl font-bold mb-2">
              Short Lessons,
              <br />
              Big <span className="text-purple-600">Impact.</span>
            </h3>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} TLDR Inc. All rights reserved</p>
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <Link key={index} href={link.href} className="text-gray-400 hover:text-gray-600 transition-colors">
                <link.icon className="w-5 h-5" />
                <span className="sr-only">Social link</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

