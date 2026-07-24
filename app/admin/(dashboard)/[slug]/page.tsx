import { getPost } from "@/libs/github"
import { getComments } from "@/libs/comments"
import { notFound } from "next/navigation"
import Link from "next/link"
import PostEditor from "../../components/PostEditor"
import matter from "gray-matter"
import { formatDate } from "@/libs/Blog/formatDate"

export default async function EditPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const { data, content } = matter(post.content)
  const comments = await getComments(slug)

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white/60">
          ← CMS
        </Link>
        <span className="text-white/20">/</span>
        <h1 className="text-2xl font-semibold">✏️ {data.title}</h1>
      </div>

      <PostEditor
        mode="edit"
        initial={{
          slug,
          title: data.title || "",
          date: data.date || "",
          tags: data.tags || "",
          emoji: data.emoji || "📝",
          body: content.trim(),
          sha: post.sha,
        }}
      />

      {/* Comments Section */}
      <div className="mt-12 border-t border-[#222] pt-8">
        <h2 className="text-lg font-semibold mb-4">
          💬 Comments {comments.length > 0 && <span className="text-white/40 font-normal">({comments.length})</span>}
        </h2>

        {comments.length === 0 ? (
          <p className="text-sm text-white/20 text-center py-6">Belum ada komentar untuk post ini~</p>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="border border-[#222] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white/70">{c.username}</span>
                  <span className="text-xs text-white/30">{formatDate(c.timestamp)}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
