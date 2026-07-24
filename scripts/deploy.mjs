// Build the static export and upload it to cPanel over FTPS (port 21).
import { readFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import * as ftp from "basic-ftp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// Default builds export to out/; with NEXT_DIST_DIR set, Next 16 exports
// directly into that folder instead.
const out = join(root, process.env.NEXT_DIST_DIR || "out");

for (const envPath of [join(root, ".env"), join(root, "..", ".env")]) {
  if (!existsSync(envPath)) continue;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_REMOTE_DIR = "public_html", FTP_SECURE = "true" } = process.env;
const args = process.argv.slice(2);
const listOnly = args.includes("--list");
const dryRun = args.includes("--dry-run");

const missing = ["FTP_HOST", "FTP_USER", "FTP_PASSWORD"].filter((k) => !process.env[k]);
if (missing.length && !dryRun && !listOnly) {
  console.error(`\n  Missing ${missing.join(", ")} — the FTP account isn't set up yet.\n  Add them to a .env file, then publish again.\n`);
  process.exit(1);
}

function sh(cmd) {
  const r = spawnSync(cmd, {
    stdio: "inherit", shell: true, cwd: root,
    // Always build for production — the editor's publish endpoint spawns this
    // from the dev server, which would otherwise leak NODE_ENV=development.
    env: { ...process.env, NODE_ENV: "production" },
  });
  if (r.status !== 0) { console.error(`\n  Failed: ${cmd}\n`); process.exit(r.status ?? 1); }
}

if (!listOnly) {
  console.log("\n  Building the site (static export) …\n");
  rmSync(out, { recursive: true, force: true });
  sh("npm run build");
  if (!existsSync(out)) { console.error("\n  No export produced.\n"); process.exit(1); }
  console.log(`\n  Built (${readdirSync(out).length} top-level items).`);
}

if (dryRun) { console.log(`\n  [dry-run] would upload -> ${FTP_HOST || "(host)"}:${FTP_REMOTE_DIR}\n`); process.exit(0); }

const client = new ftp.Client(30000);
try {
  console.log(`\n  Connecting to ${FTP_HOST} over FTPS …`);
  await client.access({
    host: FTP_HOST, user: FTP_USER, password: FTP_PASSWORD,
    secure: FTP_SECURE !== "false", secureOptions: { rejectUnauthorized: false },
  });
  if (listOnly) {
    await client.cd(FTP_REMOTE_DIR);
    for (const f of await client.list()) console.log(`    ${f.isDirectory ? "[dir]" : "     "}  ${f.name}`);
  } else {
    console.log(`  Uploading -> ${FTP_REMOTE_DIR}/ …`);
    await client.ensureDir(FTP_REMOTE_DIR);
    await client.uploadFromDir(out); // upload OVER the remote dir; never wipe it
    console.log(`\n  Uploaded. The site files are live on the server.\n`);
  }
} catch (e) {
  console.error(`\n  ${listOnly ? "List" : "Upload"} failed: ${e.message}\n`);
  process.exitCode = 1;
} finally {
  client.close();
}
