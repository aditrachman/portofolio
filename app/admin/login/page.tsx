import { verifySession, destroySession } from "@/libs/auth"
import { redirect } from "next/navigation"
import { loginAction } from "../actions"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ logout?: string; error?: string }>
}) {
  const { logout, error } = await searchParams

  // Handle logout
  if (logout === "1") {
    await destroySession()
    redirect("/admin/login")
  }

  // Already logged in
  const authed = await verifySession()
  if (authed) redirect("/admin")

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="border border-[#222] rounded-2xl p-8">
          <h1 className="text-xl font-semibold mb-2">Admin Login</h1>
          <p className="text-sm text-white/50 mb-6">Masuk ke CMS portofolio</p>

          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-xl text-sm bg-red-500/10 text-red-400 border border-red-500/20">
              Password salah, coba lagi~
            </div>
          )}

          <form action={loginAction} className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-sm
                         text-white placeholder:text-white/30
                         focus:outline-none focus:border-white/40 transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-white text-black text-sm font-medium rounded-xl
                         hover:bg-white/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
