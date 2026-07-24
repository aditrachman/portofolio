"use client"

import { logoutAction } from "../actions"

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-sm text-white/30 hover:text-red-400 transition-colors"
      >
        Logout
      </button>
    </form>
  )
}
