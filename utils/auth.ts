import { signIn, signOut } from "next-auth/react"
import { opts } from "../app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export const handleSignIn = () => signIn("google")
export const handleSignOut = () => signOut()

export function getSession() {
  return getServerSession(opts)
}
