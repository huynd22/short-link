import { NextRequest, NextResponse } from "next/server";
import { redis, key } from "@/lib/redis";

export const runtime = "nodejs";

// Every visitor hitting /<code> gets the same 302 to the same target.
// No branching on user-agent, IP, referrer or geo — that is the whole point.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const target = await redis.get<string>(key(code));
  if (!target) {
    return new NextResponse("Link không tồn tại", { status: 404 });
  }

  return NextResponse.redirect(target, 302);
}
