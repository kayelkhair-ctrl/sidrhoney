"use client";

import { useEffect, useState } from "react";
import { Puck, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { config } from "@/puck/config";

const PAGE = "home";

export default function EditPage() {
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // Trailing slashes matter: trailingSlash:true redirects would drop bodies.
    fetch(`/api/puck/?page=${PAGE}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setStatus("Could not load the page content - is the dev server healthy?"));
  }, []);

  const onPublish = async (next: Data) => {
    setStatus("Saving your changes...");
    const save = await fetch("/api/puck/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: PAGE, data: next }),
    });
    if (!save.ok) {
      setStatus("PROBLEM: saving failed - your changes are NOT stored. Try again or ask Claude.");
      return;
    }
    setStatus("Saved. Now building and uploading to the live server (1-2 minutes)...");
    try {
      const res = await fetch("/api/publish/", { method: "POST" });
      const out = await res.json();
      setStatus(out.ok ? (out.message ?? "Published! Your changes are live.")
                       : `Saved, but the upload didn't finish: ${out.message ?? "unknown error"}`);
    } catch {
      setStatus("Saved, but the upload didn't finish (connection error). Ask Claude to run the deploy.");
    }
  };

  if (!data) return <p style={{ padding: "3rem", fontFamily: "sans-serif" }}>{status ?? "Loading your page..."}</p>;

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Puck config={config} data={data} onPublish={onPublish} />
      {status && (
        <div
          style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)",
                   background: "#0b0b0b", color: "#fff", padding: "10px 18px", borderRadius: 8,
                   fontFamily: "sans-serif", fontSize: 14, zIndex: 9999, maxWidth: "90vw" }}
          onClick={() => setStatus(null)}
          title="Click to dismiss"
        >
          {status}
        </div>
      )}
    </div>
  );
}
