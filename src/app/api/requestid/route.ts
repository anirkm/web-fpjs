import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const fingerprint = await fetch(`https://api.fpjs.io/events/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Auth-API-Key": process.env.FPJS_API_KEY!,
    },
    next: {
      revalidate: false,
    },
  });

  if (fingerprint.ok) {
    const fingerprintData = await fingerprint.json();
    return NextResponse.json(fingerprintData, {
      status: 200,
    });
  }

  return NextResponse.json(
    { success: false },
    {
      status: 400,
    }
  );
}
