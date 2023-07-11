import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis/nodejs";

const redis = new Redis({
  url: "https://informed-hen-41828.upstash.io",
  token:
    "AaNkASQgOTI2MDk1ZTItMmM1ZS00ZmJjLWE5MGMtNTM0NzgwMzU3ZmM5ZWRiNWMzYzE3YzYzNDgyNjk3YTIwZGI4ODA5M2E4OTY=",
});

const options = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email guilds" } },
    }),
  ],
  callbacks: {
    //@ts-ignore

    async session({ session, user }) {
      session.user.id = user;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
