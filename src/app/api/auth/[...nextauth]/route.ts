import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth";
import { eq } from "drizzle-orm";
import { accounts } from "@/drizzle/authAdapter/schema";
import { DrizzleAdapter } from "@/drizzle/authAdapter/adapter";

import { dbAuth } from "@/drizzle/authAdapter";
import type { NextAuthOptions } from "next-auth";

const options: NextAuthOptions = {
  adapter: DrizzleAdapter(dbAuth),
  session: {
    strategy: "database",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email guilds" } },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, user }) {
      const [dbUser] = await dbAuth
        .select()
        .from(accounts)
        .where(eq(accounts.userId, user.id || ""))
        .limit(1);

      if (!dbUser) {
        if (user) {
          session.user.id = user?.id;
        }
      }

      if (user) {
        session.user.id = dbUser.providerAccountId;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
      }

      return session;
    },
  },
};

const handler = NextAuth(options);

export const authOptions = options;
export { handler as GET, handler as POST };
