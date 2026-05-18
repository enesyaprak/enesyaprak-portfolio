import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  splitWords();
  fadeUp();
  slideLeft();
  reveal();
  parallax();
}

function splitWords() {
  document.querySelectorAll<HTMLElement>('[data-anim="split"]').forEach((el) => {
    const text = el.textContent ?? "";
    el.textContent = "";
    const words = text.split(/(\s+)/);
    const inner: HTMLSpanElement[] = [];

    words.forEach((word) => {
      if (word.trim() === "") {
        el.append(document.createTextNode(word));
        return;
      }
      const wrap = document.createElement("span");
      wrap.setAttribute("data-split-word", "");
      const span = document.createElement("span");
      span.textContent = word;
      wrap.append(span);
      el.append(wrap);
      inner.push(span);
    });

    gsap.to(inner, {
      y: "0%",
      duration: 1,
      ease: "power4.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });
  });
}

function fadeUp() {
  document.querySelectorAll<HTMLElement>('[data-anim="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      }
    );
  });
}

function slideLeft() {
  document.querySelectorAll<HTMLElement>('[data-anim="slide-left"]').forEach((el) => {
    gsap.fromTo(
      el,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });
}

function reveal() {
  document.querySelectorAll<HTMLElement>('[data-anim="reveal"]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(100% 0 0 0)", opacity: 0 },
      {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });
}

function parallax() {
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = Number(el.dataset.parallax ?? 0.2);
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}
