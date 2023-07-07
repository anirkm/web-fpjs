import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import * as z from "zod";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "invalid session" }, { status: 401 });
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

  const fingerprintData = await fingerprint.json();
  return NextResponse.json(
    {
      _v: Math.floor(Math.random() * 100) + 1 > 50 ? "success" : "flagged",
    },
    {
      status: 200,
    }
  );
}

