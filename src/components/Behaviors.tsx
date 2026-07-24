"use client";
import { useEffect } from "react";

export default function Behaviors() {
  useEffect(() => {
    const w = window as unknown as { __behaviors?: boolean };
    if (w.__behaviors) return; // StrictMode double-effect guard
    w.__behaviors = true;
    document.documentElement.classList.add("js");
  }, []);
  return null;
}
