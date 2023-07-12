import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { captureException } from "@sentry/nextjs";
import discordApi from "@/lib/discord";

import { and, eq } from "drizzle-orm";

import db from "@/drizzle/db";

import { appeals } from "@/drizzle/db/schema";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "invalid session" }, { status: 401 });
  }

  //   const isBanned = await discordApi.guilds
  //     .getMemberBans("777271906486976512")
  //     .then((bans) => {
  //       const isBanned = bans.find((ban) => ban.user.id === session.user.id);
  //       return !!isBanned;
  //     })
  //     .catch((e: Error) => {
  //       captureException(e);
  //       return undefined;
  //     });

  //   if (isBanned === undefined) {
  //     return NextResponse.json(
  //       { error: "an unexpected error occured" },
  //       { status: 500 }
  //     );
  //   }

  //   if (!isBanned) {
  //     return NextResponse.json(
  //       {
  //         error: "You are not banned from the server.",
  //       },
  //       { status: 400 }
  //     );
  //   }

  const havePendingAppeal = await db
    .select()
    .from(appeals)
    .where(
      and(eq(appeals.userId, session.user.id), eq(appeals.status, "pending"))
    )
    .limit(1);

  if (havePendingAppeal.length > 0) {
    return NextResponse.json(
      {
        error: "You already have a pending appeal. (conflict)",
      },
      { status: 409 }
    );
  }

  const body = z
    .object({
      message: z.string().min(50).max(300),
      reason: z.string().max(100),
    })
    .safeParse(await req.json().catch(() => ({})));

  if (!body.success) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const { message, reason } = body.data;

  const appeal = await db
    .insert(appeals)
    .values({
      userId: session.user.id,
      message,
      reason,
    })
    .onConflictDoUpdate({
      target: appeals.id,
      set: {
        userId: session.user.id,
        message,
        reason,
      },
    })
    .returning()
    .catch((e) => {
      captureException(e);
      return [];
    });

  if (appeal.length === 0) {
    return NextResponse.json(
      { error: "an unexpected error occured" },
      { status: 500 }
    );
  }

  return NextResponse.json(appeal[0], {
    status: 200,
  });
}
