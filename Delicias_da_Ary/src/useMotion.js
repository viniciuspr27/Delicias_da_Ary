import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useMotion(root, disabled) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    let frame;
    const refresh = () => {
      cancelAnimationFrame(frame);
      if (!disposed) frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    media.add(
      { desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' },
      (context) => {
        const { desktop } = context.conditions;
        root.current.dataset.reduced = String(disabled);
        if (disabled) return;
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-eyebrow', { y: 16, opacity: 0.25, duration: 0.7 }, 0.05)
          .from('.hero-title .line', { yPercent: 110, rotate: 2, duration: 1, stagger: 0.12 }, 0.15)
          .from(
            '.hero-description, .hero-actions, .hero-bottom',
            { y: 25, opacity: 0.2, duration: 0.8, stagger: 0.1 },
            0.55,
          )
          .from(
            '.hero-art',
            { x: desktop ? 70 : 22, y: 25, rotate: 4, opacity: 0.7, duration: 1.2 },
            0.1,
          )
          .from('.hero-seal', { scale: 0.7, rotate: -20, opacity: 0.3, duration: 0.8 }, 0.75)
          .from('.hero-floating-sweet', { x: -35, y: 20, rotate: -15, duration: 1 }, 0.65);
        gsap.fromTo(
          '.hero-image',
          { yPercent: -2, scale: 1.06 },
          {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
          },
        );
        gsap.to('.hero-floating-sweet', {
          y: desktop ? -90 : -40,
          rotate: 15,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        });
        gsap.to('.orbit-gold', {
          rotate: 25,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
        });
        gsap.fromTo(
          '.scroll-progress',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: () => ScrollTrigger.maxScroll(window), scrub: 0.2 },
          },
        );
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.home-essence',
              start: 'top 92%',
              end: 'center 54%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .from(
            '.cake-stack-main',
            { x: desktop ? -110 : -40, y: 35, scale: 0.9, rotate: -4, duration: 1 },
            0,
          )
          .from(
            '.cake-stack-left',
            { x: desktop ? -200 : -75, y: 75, rotate: -23, duration: 1 },
            0.15,
          )
          .from('.cake-stack-right', { x: desktop ? 200 : 75, y: 65, rotate: 23, duration: 1 }, 0.4)
          .from(
            '.celebrate-copy',
            { x: desktop ? 45 : 0, y: desktop ? 0 : 25, opacity: 0.45, duration: 1 },
            0.15,
          );
        gsap.utils
          .toArray('[data-reveal], .cake-builder-visual, .contact-photo')
          .forEach((element) => {
            gsap.from(element, {
              y: 32,
              opacity: 0.25,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: { trigger: element, start: 'top 94%', once: true },
            });
          });
      },
      root,
    );
    const images = Array.from(root.current.querySelectorAll('img'));
    images.forEach((image) => image.addEventListener('load', refresh));
    document.fonts?.ready.then(refresh);
    refresh();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      images.forEach((image) => image.removeEventListener('load', refresh));
      media.revert();
    };
  }, [root, disabled]);
}

export function useCardMotion(scope, category, disabled) {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (disabled) return;
      gsap.utils.toArray('.product-card').forEach((card, index) => {
        gsap.fromTo(
          card.querySelector('.product-motion'),
          { y: 55, x: ((index % 3) - 1) * 18, scale: 0.96, opacity: 0.45 },
          {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 98%', end: 'top 72%', scrub: 0.5 },
          },
        );
      });
    }, scope);
    refreshMotion();
    return () => context.revert();
  }, [scope, category, disabled]);
}
export function refreshMotion() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
