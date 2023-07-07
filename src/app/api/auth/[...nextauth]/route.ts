import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth";

const options = {
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
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
