import NextAuth from "next-auth/next";
import credentialsProvider from "next-auth/providers/credentials";

const authHandler = NextAuth({
  providers: [
    credentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {

            return null

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
      },

    }),

  ],
  pages:{
    signIn:"/login"
  }
});

export { authHandler as GET, authHandler as POST };
