import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import discordApi from "@/lib/discord";
import { captureException } from "@sentry/nextjs";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "invalid session" }, { status: 401 });
  }

  const member = await discordApi.guilds
    .getMember("777271906486976512", session.user.id)
    .catch((e: Error) => {
      if (e.message !== "Unknown User") {
        captureException(e);
      }
      return null;
    });

  console.log(session);

  return NextResponse.json(
    {
      user: {
        ...session.user,
        isMember: !!member,
        isVerified: member?.roles.includes("1037823799502045204"),
      },
    },
    { status: 200 }
  );
}
