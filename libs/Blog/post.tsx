import type { Post } from "@/types"
import remarkGfm from "remark-gfm"
import { MDXRemoteProps } from "next-mdx-remote"

const GH_TOKEN = process.env.GH_TOKEN
const OWNER = process.env.GH_OWNER || "aditrachman"
const REPO = process.env.GH_REPO || "portofolio"
const API = "https://api.github.com"

async function ghFetch(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "aditrachman-portofolio",
    },
  })
  if (!res.ok) return null
  return res.json()
}

async function rawFetch(url: string): Promise<string | null> {
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      "User-Agent": "aditrachman-portofolio",
    },
  })
  if (!res.ok) return null
  return res.text()
}

// Date-invalid posts break the sort (NaN comparisons) → filter + warn instead
function sortByDateDesc(posts: Post[]): Post[] {
  const valid = posts.filter((p) => !Number.isNaN(new Date(p.date).getTime()));
  if (valid.length !== posts.length) {
    console.warn(
      `[blog] skipped ${posts.length - valid.length} post(s) with invalid frontmatter date`
    );
  }
  return valid.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllPosts(): Promise<Post[]> {
  // Fallback: if no GH_TOKEN, read from filesystem
  if (!GH_TOKEN) {
    return getAllPostsLocal()
  }

  const data = await ghFetch(`${API}/repos/${OWNER}/${REPO}/contents/content`)
  if (!data || !Array.isArray(data)) return []

  const files = data.filter((f: { name: string }) => f.name.endsWith(".mdx"))

  const posts: Post[] = []

  for (const file of files) {
    const slug = file.name.replace(".mdx", "")
    const raw = await rawFetch(file.download_url)
    if (!raw) continue

    // Simple frontmatter parsing (gray-matter works on server too)
    const { data: fm, content } = parseFrontmatter(raw)

    posts.push({
      slug,
      title: fm.title || file.name,
      date: fm.date || "",
      emoji: fm.emoji || "📄",
      content: content,
      readTime: calculateReadTime(content || ""),
      tags: (fm.tags || "").trim(),
    })
  }

  return sortByDateDesc(posts)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!GH_TOKEN) {
    return getPostBySlugLocal(slug)
  }

  const fileRes = await ghFetch(
    `${API}/repos/${OWNER}/${REPO}/contents/content/${slug}.mdx`,
  )
  if (!fileRes) return null

  const raw = Buffer.from(fileRes.content, "base64").toString("utf-8")
  const { data: fm, content } = parseFrontmatter(raw)

  return {
    slug,
    title: fm.title || slug,
    date: fm.date || "",
    emoji: fm.emoji || "📄",
    content,
    readTime: calculateReadTime(content || ""),
    tags: (fm.tags || "").trim(),
  }
}

// Simple frontmatter parser (no external deps)
function parseFrontmatter(raw: string): {
  data: Record<string, string>
  content: string
} {
  const data: Record<string, string> = {}
  let content = raw

  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (match) {
    const fmBlock = match[1]
    fmBlock.split("\n").forEach((line) => {
      const sep = line.indexOf(":")
      if (sep > 0) {
        const key = line.slice(0, sep).trim()
        let val = line.slice(sep + 1).trim()
        // Remove quotes
        val = val.replace(/^["']|["']$/g, "")
        data[key] = val
      }
    })
    content = raw.slice(match[0].length)
  }

  return { data, content }
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
}

export const components: MDXRemoteProps["components"] = {}

/* ─── Fallback: filesystem (for local dev without GH_TOKEN) ─── */
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "content")

function getAllPostsLocal(): Post[] {
  try {
    const getFiles = fs.readdirSync(postsDir)
    const posts: Post[] = getFiles
      .filter((f) => f.endsWith(".mdx"))
      .map((filename) => {
        const filePath = path.join(postsDir, filename)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data, content } = matter(fileContents)
        return {
          slug: filename.replace(".mdx", ""),
          title: data.title,
          date: data.date,
          emoji: data.emoji,
          content: content,
          readTime: calculateReadTime(content),
          tags: (data.tags || "").trim(),
        }
      })
    return sortByDateDesc(posts)
  } catch {
    return []
  }
}

function getPostBySlugLocal(slug: string): Post | null {
  try {
    const filePath = path.join(postsDir, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    return {
      slug,
      title: data.title,
      date: data.date,
      emoji: data.emoji,
      content,
      readTime: calculateReadTime(content),
      tags: (data.tags || "").trim(),
    }
  } catch {
    return null
  }
}
