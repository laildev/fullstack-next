import { login, loginWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions, Account, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export type TUser = {
  id: string,
  name: string,
  email: string;
  password: string;
  role: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string,
          password: string
        }
        const user: TUser | null = await login({ email });
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    })
  ],
  callbacks: {
    async jwt({ token, account, user }: {
      token: JWT,
      account?: Account | null,
      user: User
    }) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      if (account?.provider === 'google') {
        const data: Partial<TUser> = {
          name: user.name ?? '',
          email: user.email ?? '',
        };

        await loginWithGoogle(data, (result: { status: boolean, data: TUser }) => {
          if (result.status) {
            token.email = result.data.email;
            token.name = result.data.name;
            token.role = result.data.role;
          }
        });
      }
      return token;
    },
    async session({ session, token }) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions);
export {
  handler as GET, handler as POST
}
