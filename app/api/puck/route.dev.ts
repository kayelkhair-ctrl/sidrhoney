import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const pagesDir = join(process.cwd(), "content", "pages");
const safe = (slug: string | null) => (slug && /^[a-z0-9-]+$/.test(slug) ? slug : null);

export async function GET(req: NextRequest) {
  const page = safe(req.nextUrl.searchParams.get("page"));
  if (!page) return NextResponse.json({ error: "bad page name" }, { status: 400 });
  try {
    const raw = await readFile(join(pagesDir, `${page}.json`), "utf8");
    return new NextResponse(raw, { headers: { "Content-Type": "application/json" } });
  } catch {
    return NextResponse.json({ error: "page not found" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const page = safe(body?.page);
  const data = body?.data;
  if (!page || !data || !Array.isArray(data.content)) {
    return NextResponse.json({ error: "bad payload" }, { status: 400 });
  }
  await writeFile(join(pagesDir, `${page}.json`), JSON.stringify(data, null, 2) + "\n", "utf8");
  return NextResponse.json({ ok: true });
}
