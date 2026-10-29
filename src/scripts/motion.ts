import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector<HTMLElement>('.site-header');
const headerVisible = () => !!header && getComputedStyle(header).display !== 'none';
const headerOffset = () => (headerVisible() ? -(header!.offsetHeight + 16) : -24);

/* ---------- smooth scroll ---------- */
const lenis = new Lenis({ lerp: 0.1 });
lenis.on('scroll', ScrollTrigger.update);
lenis.on('scroll', ({ scroll }) => header?.classList.toggle('is-scrolled', scroll > 40));
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]')) {
  link.addEventListener('click', (event) => {
    const url = new URL(link.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: headerOffset() });
    history.pushState(null, '', url.hash);
  });
}

/* ---------- active side-nav link (home) ---------- */
const sideLinks = document.querySelectorAll<HTMLAnchorElement>('[data-side-link]');
if (sideLinks.length) {
  for (const link of sideLinks) {
    const id = link.getAttribute('href')?.slice(1);
    const section = id ? document.getElementById(id) : null;
    if (!section) continue;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) {
          for (const other of sideLinks) other.removeAttribute('aria-current');
          link.setAttribute('aria-current', 'true');
        }
      },
    });
  }
}

/* ---------- fill-in timelines & contribution grid (class-based, CSS animates) ---------- */
for (const el of document.querySelectorAll<HTMLElement>('[data-fill], [data-contrib]')) {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => el.classList.add('is-in'),
  });
}

/* ---------- motion (only when the visitor allows it) ---------- */
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const heroFades = gsap.utils.toArray<HTMLElement>('[data-hero-fade]');
  if (heroFades.length) {
    gsap.from(heroFades, {
      y: 18,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power2.out',
    });
  }

  for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal]')) {
    gsap.from(el, {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  }

  const groupItems = gsap.utils.toArray<HTMLElement>('[data-reveal-group] > *');
  if (groupItems.length) {
    gsap.set(groupItems, { y: 24, autoAlpha: 0 });
    ScrollTrigger.batch(groupItems, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06, ease: 'power2.out', overwrite: true }),
    });
  }
});

/* ---------- 'is-in' fallback: if ScrollTrigger never fires (print, odd viewports), reveal after load ---------- */
window.addEventListener('load', () => {
  window.setTimeout(() => ScrollTrigger.refresh(), 200);
});
