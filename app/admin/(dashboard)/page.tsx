import { listPosts, getPost } from "@/libs/github"
import { getCommentStats } from "@/libs/comments"
import Link from "next/link"
import DeleteButton from "../components/DeleteButton"
import matter from "gray-matter"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const posts = await listPosts()
  const stats = await getCommentStats()

  const postData = await Promise.all(
    posts.map(async (f) => {
      const res = await getPost(f.name.replace(".mdx", ""))
      if (!res) return null
      const { data: frontmatter } = matter(res.content)
      return {
        slug: f.name.replace(".mdx", ""),
        title: frontmatter.title || f.name,
        date: frontmatter.date || "",
        emoji: frontmatter.emoji || "📄",
        tags: frontmatter.tags || "",
      }
    }),
  )

  const validPosts = postData.filter(Boolean).sort(
    (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()
  )

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Posts" value={validPosts.length} emoji="📝" />
        <StatCard label="Total Comments" value={stats.total} emoji="💬" />
        <StatCard label="Posts with Comments" value={Object.keys(stats.perPost).length} emoji="🗣️" />
        <StatCard label="Avg Comments/Post" value={validPosts.length > 0 ? (stats.total / validPosts.length).toFixed(1) : "0"} emoji="📊" />
      </div>

      {/* Latest Comments */}
      {stats.latest.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-white/50 mb-3">💬 Latest Comments</h2>
          <div className="space-y-2">
            {stats.latest.map((c) => (
              <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg border border-[#222] text-sm">
                <span className="text-white/40 mt-0.5 shrink-0">💬</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-white/70">{c.username}</span>
                    <span className="text-xs text-white/30">{new Date(c.timestamp).toLocaleDateString("id-ID")}</span>
                  </div>
                  <p className="text-white/50 text-xs mt-0.5 line-clamp-1">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post List */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link
          href="/admin/create"
          className="px-4 py-2 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-colors"
        >
          + New Post
        </Link>
      </div>

      {validPosts.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-sm">Belum ada post. Yuk buat yang pertama~</p>
        </div>
      ) : (
        <div className="space-y-2">
          {validPosts.map((post) => {
            const commentCount = stats.perPost[post!.slug] || 0
            return (
              <div
                key={post!.slug}
                className="flex items-center gap-4 p-4 rounded-xl border border-[#222] hover:border-[#444] transition-colors group"
              >
                <span className="text-xl">{post!.emoji}</span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/${post!.slug}`}
                    className="text-sm font-medium hover:text-white/80 transition-colors"
                  >
                    {post!.title}
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-white/30 mt-0.5">
                    <span>{post!.date}</span>
                    <span>#{post!.tags}</span>
                    {commentCount > 0 && <span>· 💬 {commentCount}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/${post!.slug}`}
                    className="px-3 py-1.5 text-xs border border-[#333] rounded-lg hover:border-white/40 transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteButton slug={post!.slug} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, emoji }: { label: string; value: string | number; emoji: string }) {
  return (
    <div className="border border-[#222] rounded-xl p-4">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/40 mt-0.5">{label}</div>
    </div>
  )
}
