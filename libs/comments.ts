const GH_TOKEN = process.env.GH_TOKEN
const OWNER = process.env.GH_OWNER || "aditrachman"
const REPO = process.env.GH_REPO || "portofolio"
const API = "https://api.github.com"

export type Comment = {
  id: string
  username: string
  text: string
  timestamp: string
}

type CommentsFile = Record<string, Comment[]>

const COMMENTS_PATH = "content/comments.json"

async function ghFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "aditrachman-portofolio",
      ...(options.headers || {}),
    },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub API error ${res.status}: ${err}`)
  }
  return res.json()
}

/** Get all comments, optionally filtered by post slug */
export async function getComments(slug?: string): Promise<Comment[]> {
  if (!GH_TOKEN) return []

  try {
    const data = await ghFetch(
      `${API}/repos/${OWNER}/${REPO}/contents/${COMMENTS_PATH}`,
    )
    const raw = Buffer.from(data.content, "base64").toString("utf-8")
    const all: CommentsFile = JSON.parse(raw)

    if (slug) return all[slug] || []
    // Flatten all comments
    return Object.values(all).flat().sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
  } catch {
    return []
  }
}

/** Add a comment to a post */
export async function addComment(
  slug: string,
  username: string,
  text: string,
): Promise<Comment | null> {
  if (!GH_TOKEN) return null

  // Get existing file or create new
  let all: CommentsFile = {}
  let sha: string | undefined

  try {
    const data = await ghFetch(
      `${API}/repos/${OWNER}/${REPO}/contents/${COMMENTS_PATH}`,
    )
    const raw = Buffer.from(data.content, "base64").toString("utf-8")
    all = JSON.parse(raw)
    sha = data.sha
  } catch {
    // File doesn't exist yet — start fresh
    all = {}
  }

  const comment: Comment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    username: username.trim() || "Anonymous",
    text: text.trim(),
    timestamp: new Date().toISOString(),
  }

  if (!all[slug]) all[slug] = []
  all[slug].push(comment)

  // Write back
  await ghFetch(`${API}/repos/${OWNER}/${REPO}/contents/${COMMENTS_PATH}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `CMS: new comment on ${slug}`,
      content: Buffer.from(JSON.stringify(all, null, 2)).toString("base64"),
      sha,
      branch: "main",
    }),
  })

  return comment
}

/** Count comments per slug */
export async function countComments(): Promise<Record<string, number>> {
  const all = await getComments()
  const counts: Record<string, number> = {}
  for (const c of all) {
    // Can't map back to slug from flattened list
    // Let's get the slug counts differently
    return {}
  }
  return counts
}

/** Get comment stats */
export async function getCommentStats(): Promise<{
  total: number
  perPost: Record<string, number>
  latest: Comment[]
}> {
  if (!GH_TOKEN) return { total: 0, perPost: {}, latest: [] }

  try {
    const data = await ghFetch(
      `${API}/repos/${OWNER}/${REPO}/contents/${COMMENTS_PATH}`,
    )
    const raw = Buffer.from(data.content, "base64").toString("utf-8")
    const all: CommentsFile = JSON.parse(raw)

    const perPost: Record<string, number> = {}
    let total = 0
    const allComments: Comment[] = []

    for (const [postSlug, comments] of Object.entries(all)) {
      perPost[postSlug] = comments.length
      total += comments.length
      allComments.push(...comments)
    }

    allComments.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )

    return {
      total,
      perPost,
      latest: allComments.slice(0, 5),
    }
  } catch {
    return { total: 0, perPost: {}, latest: [] }
  }
}
