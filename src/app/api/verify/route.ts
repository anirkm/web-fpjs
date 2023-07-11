import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import discordApi from "@/lib/discord";

import * as z from "zod";
import { captureException } from "@sentry/nextjs";

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

  const fingerprintData = await fingerprint.json().catch(() => null);

  if (!fingerprintData)
    return NextResponse.json(
      { error: "an unexpected error occured" },
      { status: 500 }
    );

  console.log(
    JSON.stringify(fingerprintData),
    req.headers.get("cf-connecting-ip") ?? "unknown",
    req.headers.get("user-agent") ?? "unknown",
    fingerprintData.products.identification.data.browserDetails.userAgent ==
      req.headers.get("user-agent")
  );

  const uuid = crypto.randomUUID();

  const userId = session.user?.image?.split("/")[4];

  const isRoleAdded = await discordApi.guilds
    .addRoleToMember("777271906486976512", userId!, "1037823799502045204", {
      reason: `online verification - ${uuid}`,
    })
    .then(() => true)
    .catch((e) => {
      captureException(e);
      return true;
    });

  return NextResponse.json(
    {
      _v: isRoleAdded ? "success" : "error",
      uuid,
    },
    {
      status: 200,
    }
  );
}
