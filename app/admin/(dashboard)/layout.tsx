import { verifySession } from "@/libs/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import React, { ReactNode } from "react"
import LogoutButton from "../components/LogoutButton"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const authed = await verifySession()
  if (!authed) redirect("/admin/login")

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-[#222] sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-semibold text-base text-white/80 hover:text-white tracking-tight">
              ← CMS
            </Link>
            <nav className="flex items-center gap-5">
              <Link href="/admin" className="text-[15px] text-white/50 hover:text-white transition-colors font-medium">Posts</Link>
              <Link href="/admin/create" className="text-[15px] text-white/50 hover:text-white transition-colors font-medium">New Post</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-white/40 hover:text-white/60 transition-colors" target="_blank">
              View Site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
