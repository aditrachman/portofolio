"use client"

import { removePost } from "../actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteButton({ slug, title }: { slug: string; title: string }) {
  const [confirming, setConfirming] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    const res = await removePost(slug)
    if (res.success) {
      router.refresh()
    } else {
      alert("Gagal hapus: " + res.error)
    }
    setConfirming(false)
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-400">Yakin?</span>
        <button
          onClick={handleDelete}
          className="px-2 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20"
        >
          Hapus
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-xs border border-[#333] rounded-lg hover:border-white/40"
        >
          Batal
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 text-xs border border-[#333] rounded-lg hover:border-red-500/50 hover:text-red-400 transition-colors"
    >
      Hapus
    </button>
  )
}
