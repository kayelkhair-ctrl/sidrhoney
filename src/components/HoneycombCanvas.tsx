"use client";
import { useEffect, useRef } from "react";

/* Interactive honeycomb weave for the hero background.
   Very quiet: hex cells shimmer almost imperceptibly, and the cells near
   the cursor stroke amber with a soft trailing follow. Renders nothing but
   ivory for no-JS visitors and stays static under prefers-reduced-motion. */

const INK = "35, 24, 13";
const AMBER = "198, 138, 42";
const R = 26; // hex radius in px

export function HoneycombCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || canvas.dataset.init) return; // StrictMode double-effect guard
    canvas.dataset.init = "1";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let centers: { x: number; y: number; phase: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      centers = [];
      const hs = Math.sqrt(3) * R; // horizontal spacing
      const vs = 1.5 * R; // vertical spacing
      let row = 0;
      for (let y = -R; y < H + R; y += vs, row++) {
        const off = row % 2 ? hs / 2 : 0;
        for (let x = -hs + off; x < W + hs; x += hs) {
          centers.push({ x, y, phase: (x * 0.37 + y * 0.73) % (Math.PI * 2) });
        }
      }
    };

    const hexPath = (x: number, y: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 180) * (60 * i - 90);
        const px = x + R * Math.cos(a);
        const py = y + R * Math.sin(a);
        if (i) ctx.lineTo(px, py);
        else ctx.moveTo(px, py);
      }
      ctx.closePath();
    };

    // cursor state: target (tx,ty), smoothed (x,y), glow fades in/out
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, seen: false, over: false };
    let glow = 0;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      if (!mouse.seen) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
        mouse.seen = true;
      }
      mouse.over = true;
    };
    const onOut = () => {
      mouse.over = false;
    };

    let raf = 0;
    let visible = true;

    const draw = (t: number) => {
      const time = t / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.09;
      mouse.y += (mouse.ty - mouse.y) * 0.09;
      glow += ((mouse.over ? 1 : 0) - glow) * 0.06;

      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      for (const c of centers) {
        const shimmer = reduced ? 0 : Math.sin(time * 0.45 + c.phase) * 0.017;
        hexPath(c.x, c.y);
        ctx.strokeStyle = `rgba(${INK}, ${0.042 + shimmer})`;
        ctx.stroke();
        if (glow > 0.02 && mouse.seen) {
          const d = Math.hypot(c.x - mouse.x, c.y - mouse.y);
          const k = Math.max(0, 1 - d / 230);
          if (k > 0.02) {
            const g = k * k * glow;
            ctx.strokeStyle = `rgba(${AMBER}, ${g * 0.55})`;
            ctx.stroke();
            if (g > 0.2) {
              ctx.fillStyle = `rgba(${AMBER}, ${(g - 0.2) * 0.07})`;
              ctx.fill();
            }
          }
        }
      }
      if (visible && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      draw(0); // one static frame, no loop, no cursor chase
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onOut);
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onOut);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas className="hero__weave" ref={ref} aria-hidden="true" />;
}
