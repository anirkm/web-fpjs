import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import discordApi from "@/lib/discord";

import * as z from "zod";
import { captureException } from "@sentry/nextjs";
import { authOptions } from "../auth/[...nextauth]/route";

import db from "@/drizzle/db";

import { verifications, users } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "invalid session" }, { status: 401 });
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (user.length === 0) {
    await db
      .insert(users)
      .values({
        id: session.user.id,
        email: session.user.email,
      })
      .onConflictDoNothing();
  }

  const body = z
    .object({
      _: z.string().regex(/^\d+\.[a-zA-Z0-9]+$/),
    })
    .safeParse(await req.json().catch(() => ({})));

  if (!body.success) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const { _ } = body.data;

  const fingerprint = await fetch(`https://api.fpjs.io/events/${_}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Auth-API-Key": process.env.FPJS_API_KEY!,
    },
    next: {
      revalidate: false,
    },
  });

  if (!fingerprint.ok) {
    return NextResponse.json(
      { error: "an unexpected error occured" },
      {
        status: 500,
      }
    );
  }

  const fingerprintData = await fingerprint.json().catch(() => null);

  if (!fingerprintData)
    return NextResponse.json(
      { error: "an unexpected error occured" },
      { status: 500 }
    );

  // console.log(
  //   JSON.stringify(fingerprintData),
  //   req.headers.get("cf-connecting-ip") ?? "unknown",
  //   req.headers.get("user-agent") ?? "unknown",
  //   fingerprintData.products.identification.data.browserDetails.userAgent ==
  //     req.headers.get("user-agent")
  // );

  let newVerification = await db
    .insert(verifications)
    .values({
      userId: session.user.id,
      requestId: fingerprintData.products.identification.data.requestId,
    })
    .returning()
    .onConflictDoUpdate({
      target: verifications.requestId,
      set: {
        userId: session.user.id,
      },
    });
  console.log(newVerification);

  if (newVerification.length === 0)
    return NextResponse.json({ _v: "error" }, { status: 500 });

  const isRoleAdded = await discordApi.guilds
    .addRoleToMember(
      "777271906486976512",
      session.user.id,
      "1037823799502045204",
      {
        reason: `verification request - id: ${newVerification[0].id}`,
      }
    )
    .then(() => true)
    .catch((e: Error) => {
      captureException(e);
      return true;
    });

  if (!isRoleAdded) return NextResponse.json({ _v: "error" }, { status: 500 });

  const userVerifications = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .leftJoin(verifications, eq(verifications.userId, users.id))
    .orderBy(verifications.createdAt);

  console.log(userVerifications);

  return NextResponse.json(
    {
      _i: newVerification[0].id,
      _v: isRoleAdded ? "success" : "error",
    },
    {
      status: 200,
    }
  );
}
