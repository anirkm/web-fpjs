import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import discordApi from "@/lib/discord";

import { captureException } from "@sentry/nextjs";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "invalid session" }, { status: 401 });
  }

  const isBanned = await discordApi.guilds
    .getMemberBans("777271906486976512")
    .then((bans) => {
      const isBanned = bans.find((ban) => ban.user.id === "490667823392096268");
      return !!isBanned;
    })
    .catch((e) => {
      captureException(e);
      return undefined;
    });

  if (isBanned === undefined) {
    return NextResponse.json(
      { error: "an unexpected error occured" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      isBanned,
    },
    { status: 200 }
  );
}
