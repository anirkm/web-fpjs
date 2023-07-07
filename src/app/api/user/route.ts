import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth"

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "invalid session" }, { status: 401 });
  }

  return NextResponse.json({ session: session });
}
