import { NextResponse } from "next/server";
import { spawn } from "node:child_process";

let publishing = false;

// GitHub Pages adapter: publishing = commit the content and push.
// The GitHub Action builds and deploys — live about a minute after push.
const run = (args: string[]) =>
  new Promise<{ code: number | null; log: string }>((resolve) => {
    const child = spawn("git", args, { cwd: process.cwd(), windowsHide: true });
    let log = "";
    child.stdout.on("data", (c) => (log += c.toString()));
    child.stderr.on("data", (c) => (log += c.toString()));
    child.on("close", (code) => resolve({ code, log }));
  });

export async function POST() {
  if (publishing) return NextResponse.json({ ok: false, message: "a publish is already running - give it a minute" });
  publishing = true;
  try {
    await run(["add", "content"]);
    const commit = await run(["commit", "-m", "Content update from the site editor"]);
    if (commit.code !== 0 && !/nothing to commit/i.test(commit.log)) {
      return NextResponse.json({ ok: false, message: commit.log.trim().split(/\r?\n/).slice(-3).join(" · ") });
    }
    const push = await run(["push"]);
    if (push.code === 0) {
      return NextResponse.json({ ok: true, message: "Published - the site goes live in about a minute." });
    }
    return NextResponse.json({ ok: false, message: push.log.trim().split(/\r?\n/).slice(-3).join(" · ") });
  } finally {
    publishing = false;
  }
}
