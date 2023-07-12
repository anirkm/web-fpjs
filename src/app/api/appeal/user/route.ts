import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import discordApi from "@/lib/discord";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { captureException } from "@sentry/nextjs";
import db from "@/drizzle/db";
import { appeals } from "@/drizzle/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "invalid session" }, { status: 401 });
  }

  const isBanned = await discordApi.guilds
    .getMemberBans("777271906486976512")
    .then((bans) => {
      const isBanned = bans.find((ban) => ban.user.id === session.user.id);
      return !!isBanned;
    })
    .catch((e: Error) => {
      captureException(e);
      return undefined;
    });

  if (isBanned === undefined) {
    return NextResponse.json(
      { error: "an unexpected error occured" },
      { status: 500 }
    );
  }

  const havePendingAppeal = await db
    .select()
    .from(appeals)
    .where(
      and(eq(appeals.userId, session.user.id), eq(appeals.status, "pending"))
    )
    .limit(1);

  return NextResponse.json(
    {
      isBanned: true,
      havePendingAppeal: havePendingAppeal.length > 0,
      pendingAppeal: havePendingAppeal[0] ?? null,
    },
    { status: 200 }
  );
}
