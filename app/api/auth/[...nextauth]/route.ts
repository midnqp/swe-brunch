import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const g = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})
export const opts = {
  providers: [g],
  secret: "password",
  callbacks: {
    // jwt(params) {
    //   const p =params.profile
    //   p.email
    //   p.image
    //   p.name
    //   return params.token
    // },
    // session(params) {
    //   const {session, token, user} = params
    //   return session
    // }
  },

  // note: subhanallah, just adding this line did magic.
  session: { strategy: "jwt" as const },
}
const n = await NextAuth(opts)
const handler = n
export { handler as GET, handler as POST }
