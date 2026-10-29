import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { redis, key } from "@/lib/redis";
import { normalizeUrl } from "@/lib/url";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
  }

  const target = normalizeUrl(body.url ?? "");
  if (!target) {
    return NextResponse.json(
      { error: "Link không hợp lệ. Chỉ nhận http/https." },
      { status: 400 }
    );
  }

  // 7-char code; retry a few times on the rare collision.
  let code = "";
  for (let i = 0; i < 5; i++) {
    code = nanoid(7);
    const ok = await redis.set(key(code), target, { nx: true });
    if (ok) break;
    code = "";
  }
  if (!code) {
    return NextResponse.json({ error: "Thử lại giúp tao" }, { status: 500 });
  }

  const origin = req.nextUrl.origin;
  return NextResponse.json({ code, shortUrl: `${origin}/${code}`, target });
}
