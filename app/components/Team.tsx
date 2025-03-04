"use client"

import { useState, useEffect } from "react"
import { Award, Linkedin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Team() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const teamMembers = [
    {
      name: "G S Ashwin",
      role: "Project Lead",
      image: "/Ashwin.png",
      linkedin: "https://linkedin.com/in/gsashwin",
    },
    {
      name: "Ritika Jadhav",
      role: "UI/UX Designer",
      image: "/Ritika.png",
      linkedin: "https://linkedin.com/in/ritikajadhav",
    },
    {
      name: "Ebrahim Mamawala",
      role: "Full Stack Developer",
      image: "/Ebrahim.png",
      linkedin: "https://linkedin.com/in/ebrahimmamawala",
    },
    {
      name: "Adwitiya Paul",
      role: "Backend Developer",
      image: "/Adwitiya.png",
      linkedin: "https://linkedin.com/in/adwitiyapaul",
    },
    {
      name: "Adarsh Shirawalmath",
      role: "ML Engineer",
      image: "/Adarsh.png",
      linkedin: "https://linkedin.com/in/adarshshirawalmath",
    },
  ]

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#f9f9fc] to-[#f5f5fa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e1e2e]">Our</h2>
            <div className="bg-[#f0e6ff] px-4 py-1 rounded-full">
              <span className="text-4xl md:text-5xl font-bold text-[#8a4fff]">Team</span>
            </div>
          </div>

          <div
            className={`mt-6 inline-flex items-center gap-2 bg-[#f0e6ff] border border-[#d9c6ff] rounded-full px-4 py-2 transition-all duration-700 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Award className="h-5 w-5 text-[#8a4fff] animate-pulse" />
            <span className="text-sm font-medium text-[#1e1e2e]">
              Track Winner for Quality Education at Yantra Central Hack in VIT-Vellore
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4 group">
                <div className="absolute inset-0 bg-[#8a4fff]/20 rounded-full transform scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <img
                  src={member?.image || "/placeholder.svg"}
                  alt={member?.name || "Team Member"}
                  className="w-32 h-32 object-cover rounded-full border-4 border-[#f0e6ff]"
                />
              </div>

              <h3 className="text-2xl font-semibold text-[#1e1e2e] mb-2">{member?.name}</h3>
              <Badge className="mb-4 bg-[#f0e6ff] text-[#8a4fff] hover:bg-[#e6d9ff] border-0 px-3 py-1 text-sm">
                {member?.role}
              </Badge>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8a4fff] text-white px-4 py-2 rounded-full hover:bg-[#7a3fee] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

