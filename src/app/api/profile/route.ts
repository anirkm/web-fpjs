import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import discordApi from "@/lib/discord";

import { captureException } from "@sentry/nextjs";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "invalid session" }, { status: 401 });
  }

  const member = await discordApi.guilds
    .getMember("777271906486976512", "490667823392096268")
    .catch((e) => {
      if (e.message !== "Unknown User") {
        captureException(e);
      }
      return null;
    });

  if (!member) {
    return NextResponse.json(
      {
        error: "invalid member",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      member: { ...member, image: session.user.image },
    },
    { status: 200 }
  );
}
