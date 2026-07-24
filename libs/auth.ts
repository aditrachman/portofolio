import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.ADMIN_SECRET || 'fallback')
const COOKIE = 'admin_token'

export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)

  const c = await cookies()
  c.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function verifySession(): Promise<boolean> {
  const c = await cookies()
  const token = c.get(COOKIE)?.value
  if (!token) return false
  try {
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

export async function destroySession() {
  const c = await cookies()
  c.delete(COOKIE)
}

export function checkPassword(input: string): boolean {
  return input === process.env.ADMIN_PASSWORD
}
