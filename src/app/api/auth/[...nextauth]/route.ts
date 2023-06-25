import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth";


const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds',
    }),
  ],
  pages: {
    signIn: "/",
  },
});

export const GET = handler.handlers.GET;
export const POST = handler.handlers.POST;
export const runtime = "edge";
