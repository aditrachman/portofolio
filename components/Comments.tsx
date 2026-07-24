"use client"

import { useState } from "react"
import { addCommentAction } from "@/app/admin/actions"
import type { Comment } from "@/libs/comments"
import { formatDate } from "@/libs/Blog/formatDate"

export default function Comments({
  slug,
  initialComments,
}: {
  slug: string
  initialComments: Comment[]
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [username, setUsername] = useState("")
  const [text, setText] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setSending(true)
    setError("")

    const res = await addCommentAction(slug, username, text)
    if (res.comment) {
      setComments((prev) => [res.comment!, ...prev])
      setUsername("")
      setText("")
    } else {
      setError(res.error || "Gagal kirim komentar")
    }
    setSending(false)
  }

  return (
    <div className="mt-20 border-t border-[#222] pt-10">
      <h2 className="text-lg font-semibold mb-1">
        💬 Comments {comments.length > 0 && <span className="text-white/40 font-normal">({comments.length})</span>}
      </h2>
      <p className="text-sm text-white/40 mb-6">Biar tau kalo ada yang baca~</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-10">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nama (opsional)"
          className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-sm
                     text-white placeholder:text-white/20
                     focus:outline-none focus:border-white/40 transition-colors"
          maxLength={50}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tulis komentar..."
          rows={3}
          className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-sm
                     text-white placeholder:text-white/20 resize-none
                     focus:outline-none focus:border-white/40 transition-colors"
          required
          maxLength={500}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={sending || !text.trim()}
            className="px-5 py-2 bg-white text-black text-sm font-medium rounded-xl
                       hover:bg-white/90 transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {sending ? "Mengirim..." : "Kirim ✨"}
          </button>
        </div>
      </form>

      {/* Comment List */}
      {comments.length === 0 ? (
        <p className="text-sm text-white/20 text-center py-8">Belum ada komentar. Jadilah yang pertama~</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="border border-[#222] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white/70">{c.username}</span>
                <span className="text-xs text-white/30">{formatDate(c.timestamp)}</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
