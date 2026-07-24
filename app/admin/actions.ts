"use server"

import { createSession, destroySession, checkPassword, verifySession } from "@/libs/auth"
import { commitPost, getPost, listPosts, deletePost } from "@/libs/github"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

/* ───── Auth ───── */

export async function loginAction(form: FormData) {
  const password = form.get("password") as string
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1")
  }
  await createSession()
  redirect("/admin")
}

export async function logoutAction() {
  await destroySession()
  redirect("/admin/login")
}

/* ───── Posts ───── */

export async function publishPost(form: FormData) {
  const authed = await verifySession()
  if (!authed) throw new Error("Unauthorized")

  const title = form.get("title") as string
  const slug = form.get("slug") as string
  const date = form.get("date") as string
  const tags = form.get("tags") as string
  const emoji = form.get("emoji") as string
  const body = form.get("body") as string

  if (!title || !slug || !body) {
    return { error: "Title, slug, and body are required" }
  }

  const frontmatter = [
    '---',
    `title: "${title}"`,
    `date: "${date || new Date().toISOString().split('T')[0]}"`,
    `tags: "${tags || 'untagged'}"`,
    `emoji: "${emoji || '📝'}"`,
    '---',
    '',
  ].join('\n')

  const content = frontmatter + body

  try {
    await commitPost(slug, content, `publish: ${title}`)
    revalidatePath('/writings')
    revalidatePath('/')
    return { success: true, slug }
  } catch (e) {
    return { error: String(e) }
  }
}

export async function updatePost(slug: string, existingSha: string, form: FormData) {
  const authed = await verifySession()
  if (!authed) throw new Error("Unauthorized")

  const title = form.get("title") as string
  const newSlug = form.get("slug") as string
  const date = form.get("date") as string
  const tags = form.get("tags") as string
  const emoji = form.get("emoji") as string
  const body = form.get("body") as string

  if (!title || !body) {
    return { error: "Title and body are required" }
  }

  const frontmatter = [
    '---',
    `title: "${title}"`,
    `date: "${date || new Date().toISOString().split('T')[0]}"`,
    `tags: "${tags || 'untagged'}"`,
    `emoji: "${emoji || '📝'}"`,
    '---',
    '',
  ].join('\n')

  const content = frontmatter + body

  try {
    // If slug changed, create new file and delete old
    if (newSlug !== slug) {
      await commitPost(newSlug!, content, `rename & update: ${title}`)
      await deletePost(slug, existingSha)
    } else {
      await commitPost(slug, content, `update: ${title}`, existingSha)
    }
    revalidatePath('/writings')
    revalidatePath('/')
    return { success: true, slug: newSlug || slug }
  } catch (e) {
    return { error: String(e) }
  }
}

export async function removePost(slug: string) {
  const authed = await verifySession()
  if (!authed) throw new Error("Unauthorized")

  const post = await getPost(slug)
  if (!post) return { error: "Post not found" }

  try {
    await deletePost(slug, post.sha)
    revalidatePath('/writings')
    revalidatePath('/')
    return { success: true }
  } catch (e) {
    return { error: String(e) }
  }
}

/* ───── Image ───── */

export async function uploadImageAction(form: FormData) {
  const authed = await verifySession()
  if (!authed) throw new Error("Unauthorized")

  const file = form.get("image") as File
  if (!file) return { error: "No file" }

  const buffer = Buffer.from(await file.arrayBuffer())
  const base64 = buffer.toString("base64")
  const filename = `${Date.now()}-${file.name}`

  // Use GitHub API to upload
  const { uploadImage } = await import("@/libs/github")
  const url = await uploadImage(filename, base64)
  return { url }
}

/* ───── Comments ───── */

export async function addCommentAction(slug: string, username: string, text: string) {
  const { addComment } = await import("@/libs/comments")
  try {
    const comment = await addComment(slug, username || "Anonymous", text)
    if (comment) {
      revalidatePath(`/writings/${slug}`)
      return { comment }
    }
    return { error: "Gagal menyimpan komentar" }
  } catch (e) {
    return { error: String(e) }
  }
}
