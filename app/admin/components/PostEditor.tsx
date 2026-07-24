"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { publishPost, updatePost, uploadImageAction } from "../actions"
import { renderMarkdown } from "./markdown"

type Props = {
  mode: "create" | "edit"
  initial?: {
    slug: string
    title: string
    date: string
    tags: string
    emoji: string
    body: string
    sha: string
  }
}

export default function PostEditor({ mode, initial }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title || "")
  const [slug, setSlug] = useState(initial?.slug || "")
  const [date, setDate] = useState(initial?.date || new Date().toISOString().split("T")[0])
  const [tags, setTags] = useState(initial?.tags || "")
  const [emoji, setEmoji] = useState(initial?.emoji || "📝")
  const [body, setBody] = useState(initial?.body || "")
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-generate slug from title (only on create)
  useEffect(() => {
    if (mode === "create" && title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 60),
      )
    }
  }, [title, mode])

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const form = new FormData()
    form.set("title", title)
    form.set("slug", slug)
    form.set("date", date)
    form.set("tags", tags)
    form.set("emoji", emoji)
    form.set("body", body)

    const res =
      mode === "create"
        ? await publishPost(form)
        : await updatePost(initial!.slug, initial!.sha, form)

    if (res.success) {
      setMessage({ type: "success", text: "Post published! 🎉" })
      if (mode === "create") {
        router.push(`/admin/${res.slug}`)
      }
      router.refresh()
    } else {
      setMessage({ type: "error", text: res.error || "Gagal publish" })
    }
    setSaving(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const form = new FormData()
    form.set("image", file)

    setMessage({ type: "success", text: "Uploading..." })
    const res = await uploadImageAction(form)
    if (res.url) {
      const imgMd = `![${file.name}](${res.url})`
      setBody((prev) => prev + "\n" + imgMd)
      setMessage({ type: "success", text: "Image uploaded! 🖼️" })
    } else {
      setMessage({ type: "error", text: res.error || "Gagal upload" })
    }
  }

  function insertMarkdown(before: string, after = "") {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = body.substring(start, end)
    const newText = body.substring(0, start) + before + selected + after + body.substring(end)
    setBody(newText)
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(start + before.length, start + before.length + selected.length)
    }, 0)
  }

  return (
    <form onSubmit={handlePublish} className="space-y-6">
      {/* Message */}
      {message && (
        <div
          className={`px-4 py-3 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Title + Slug row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs text-white/40 mb-1.5">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-sm
                       text-white placeholder:text-white/20
                       focus:outline-none focus:border-white/40 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Emoji</label>
          <input
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="📝"
            className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-sm
                       text-white placeholder:text-white/20 text-center text-xl
                       focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
      </div>

      {/* Slug + Date + Tags row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="post-slug"
            className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-sm
                       text-white placeholder:text-white/20 font-mono
                       focus:outline-none focus:border-white/40 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-sm
                       text-white
                       focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Tags</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="nextjs, react, tutorial"
            className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-sm
                       text-white placeholder:text-white/20
                       focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <ToolbarButton onClick={() => insertMarkdown("**", "**")} title="Bold">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("*", "*")} title="Italic">
          <em>I</em>
        </ToolbarButton>
        <span className="w-px h-5 bg-[#333]" />
        <ToolbarButton onClick={() => insertMarkdown("# ")} title="Heading 1">
          H1
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("## ")} title="Heading 2">
          H2
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("### ")} title="Heading 3">
          H3
        </ToolbarButton>
        <span className="w-px h-5 bg-[#333]" />
        <ToolbarButton onClick={() => insertMarkdown("- ")} title="Bullet list">
          • List
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("1. ")} title="Numbered list">
          1. List
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("```\n", "\n```")} title="Code block">
          {'</>'}
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("[", "](url)")} title="Link">
          🔗
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("> ")} title="Blockquote">
          ❝
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("---\n")} title="Horizontal rule">
          ―
        </ToolbarButton>
        <span className="w-px h-5 bg-[#333]" />
        <label className="px-2.5 py-1.5 text-xs border border-[#333] rounded-lg hover:border-white/40 transition-colors cursor-pointer">
          🖼️ Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <span className="w-px h-5 bg-[#333]" />
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
            preview
              ? "bg-white/10 border-white/30 text-white"
              : "border-[#333] text-white/50 hover:border-white/40"
          }`}
        >
          {preview ? "✏️ Edit" : "👁️ Preview"}
        </button>
      </div>

      {/* Editor / Preview */}
      <div className="border border-[#222] rounded-xl overflow-hidden">
        {preview ? (
          <div
            className="prose prose-invert prose-sm max-w-none p-6 min-h-[400px] max-h-[600px] overflow-y-auto
                       prose-headings:text-white prose-a:text-blue-400 prose-code:text-green-400
                       prose-pre:bg-[#111] prose-pre:border prose-pre:border-[#333]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tulis post-mu di sini... ✨"
            className="w-full px-6 py-5 bg-transparent text-sm text-white/90
                       placeholder:text-white/20 font-mono leading-relaxed
                       focus:outline-none resize-none"
            rows={20}
            required
          />
        )}
      </div>

      {/* Publish */}
      <div className="flex items-center justify-between pt-2">
        <a
          href={`/writings/${slug}`}
          target="_blank"
          className="text-xs text-white/30 hover:text-white/50 transition-colors"
        >
          Preview on site ↗
        </a>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-xl
                     hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : mode === "create" ? "✨ Publish" : "💾 Update"}
        </button>
      </div>
    </form>
  )
}

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-2.5 py-1.5 text-xs border border-[#333] rounded-lg hover:border-white/40 transition-colors text-white/70 hover:text-white"
    >
      {children}
    </button>
  )
}
