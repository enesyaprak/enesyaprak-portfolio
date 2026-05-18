import { gsap } from "gsap";

export function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  // Two layers:
  // 1. Registration mark — circle + crosshair lines
  // 2. Inner dot — instant tracker

  const ring = document.createElement("div");
  ring.setAttribute("aria-hidden", "true");
  ring.className =
    "fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference will-change-transform";
  ring.style.transform = "translate(-50%, -50%)";
  ring.style.transition = "opacity 0.2s ease";
  ring.innerHTML = `
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
         xmlns="http://www.w3.org/2000/svg"
         style="display:block; transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);">
      <circle cx="22" cy="22" r="13" stroke="#ede7d9" stroke-width="1" fill="none"/>
      <path d="M22 2 V12 M22 32 V42 M2 22 H12 M32 22 H42"
            stroke="#ede7d9" stroke-width="1" stroke-linecap="square"/>
    </svg>
  `;

  const dot = document.createElement("div");
  dot.setAttribute("aria-hidden", "true");
  dot.className =
    "fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9999] mix-blend-difference";
  dot.style.background = "#ede7d9";
  dot.style.transform = "translate(-50%, -50%)";
  dot.style.transition = "opacity 0.2s ease";

  document.body.append(ring, dot);

  const ringSvg = ring.querySelector("svg") as SVGElement;

  const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
  const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });
  const dotX = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power2.out" });
  const dotY = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power2.out" });

  let lastMove = 0;
  window.addEventListener("mousemove", (e) => {
    ringX(e.clientX);
    ringY(e.clientY);
    dotX(e.clientX);
    dotY(e.clientY);
    lastMove = performance.now();
  });

  window.addEventListener("mouseleave", () => {
    ring.style.opacity = "0";
    dot.style.opacity = "0";
  });
  window.addEventListener("mouseenter", () => {
    ring.style.opacity = "1";
    dot.style.opacity = "1";
  });

  const setGrow = (grow: boolean) => {
    if (!ringSvg) return;
    if (grow) {
      ringSvg.style.transform = "scale(1.9)";
      dot.style.opacity = "0";
    } else {
      ringSvg.style.transform = "scale(1)";
      dot.style.opacity = "1";
    }
  };

  const attach = () => {
    document.querySelectorAll<HTMLElement>('[data-cursor="grow"]').forEach((el) => {
      el.addEventListener("mouseenter", () => setGrow(true));
      el.addEventListener("mouseleave", () => setGrow(false));
    });

    document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
      const strength = Number(el.dataset.magnetic ?? 0.35);
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(el, { x, y, duration: 0.5, ease: "power3.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
}
