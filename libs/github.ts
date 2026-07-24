const GH_TOKEN = () => process.env.GH_TOKEN
const OWNER = () => process.env.GH_OWNER || 'aditrachman'
const REPO = () => process.env.GH_REPO || 'portofolio'

const API = 'https://api.github.com'

type GHFile = {
  name: string
  path: string
  sha: string
  type: 'file' | 'dir'
  download_url: string | null
}

async function ghFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${GH_TOKEN()}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'aditrachman-portofolio-cms',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub API error ${res.status}: ${err}`)
  }
  return res.json()
}

/** List files in content/ directory */
export async function listPosts(): Promise<GHFile[]> {
  const data = await ghFetch(`${API}/repos/${OWNER()}/${REPO()}/contents/content`)
  return Array.isArray(data) ? data.filter((f: GHFile) => f.name.endsWith('.mdx')) : []
}

/** Get single MDX file content */
export async function getPost(slug: string): Promise<{ content: string; sha: string } | null> {
  try {
    const data = await ghFetch(
      `${API}/repos/${OWNER()}/${REPO()}/contents/content/${slug}.mdx`,
    )
    return {
      content: Buffer.from(data.content, 'base64').toString('utf-8'),
      sha: data.sha,
    }
  } catch {
    return null
  }
}

/** Commit a new/updated MDX file */
export async function commitPost(
  slug: string,
  content: string,
  message: string,
  sha?: string,
) {
  const body: Record<string, unknown> = {
    message: `CMS: ${message}`,
    content: Buffer.from(content).toString('base64'),
    branch: 'main',
  }
  if (sha) body.sha = sha

  return ghFetch(`${API}/repos/${OWNER()}/${REPO()}/contents/content/${slug}.mdx`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

/** Delete a post */
export async function deletePost(slug: string, sha: string) {
  return ghFetch(`${API}/repos/${OWNER()}/${REPO()}/contents/content/${slug}.mdx`, {
    method: 'DELETE',
    body: JSON.stringify({
      message: `CMS: delete ${slug}`,
      sha,
      branch: 'main',
    }),
  })
}

/** Upload image to public/assets/images/ */
export async function uploadImage(
  filename: string,
  base64Content: string,
): Promise<string> {
  const path = `public/assets/images/${filename}`
  await ghFetch(`${API}/repos/${OWNER()}/${REPO()}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `CMS: upload image ${filename}`,
      content: base64Content,
      branch: 'main',
    }),
  })
  // Return raw GitHub URL — works immediately, no need to wait for deploy
  return `https://raw.githubusercontent.com/${OWNER()}/${REPO()}/main/public/assets/images/${filename}`
}
