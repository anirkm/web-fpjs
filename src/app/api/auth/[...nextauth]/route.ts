import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth";

export const runtime = "edge";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify guilds email" } },
    }),
  ],
  pages: {
    signIn: "/",
  },
});

export { handler as POST, handler as GET };
