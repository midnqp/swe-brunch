"use client"
import { SessionProvider } from "next-auth/react"

export function NextAuthSessionProvider({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>
}
