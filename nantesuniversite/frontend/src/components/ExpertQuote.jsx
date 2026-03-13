import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotPattern from './DotPattern';

gsap.registerPlugin(ScrollTrigger);

const portrait =
  'https://www.figma.com/api/mcp/asset/71f39c43-afc9-468e-860f-28b1405167bf';
const portraitOverlay =
  'https://www.figma.com/api/mcp/asset/9b81ea1f-2ec9-4bb4-ac89-6d588af65991';

export default function ExpertQuote() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const overlayRef = useRef(null);
  const quoteRef = useRef(null);
  const metaRef = useRef(null);
  const leftDotsRef = useRef(null);
  const rightDotsRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from([portraitRef.current, overlayRef.current], {
        autoAlpha: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from([quoteRef.current, metaRef.current], {
        autoAlpha: 0,
        x: 84,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from([leftDotsRef.current, rightDotsRef.current], {
        autoAlpha: 0,
        scale: 0.82,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      });

      gsap.to(overlayRef.current, {
        y: 32,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute top-[292px] left-0 right-0">
      <div
        ref={portraitRef}
        className="absolute left-[176px] top-0 w-[472px] h-[398px] overflow-hidden"
      >
        <img
          src={portrait}
          alt="Portrait de Colin de la Higuera"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute left-[149px] top-[204px] w-[523px] h-[307px] pointer-events-none"
      >
        <img src={portraitOverlay} alt="" className="w-full h-full object-cover" />
      </div>

      <div ref={leftDotsRef} className="absolute left-[583px] top-[24px]">
        <DotPattern dotSize={22} />
      </div>

      <p
        ref={quoteRef}
        className="absolute left-[735px] top-[61px] w-[960px] italic text-black text-[36px] leading-[normal] font-sans"
      >
        &thinsp;Je m&apos;en sors habituellement en observant que ce qu&apos;on
        entend par intelligence est mouvant et qu&apos;au fur du temps, des
        activités qu&apos;on tenait pour intelligentes ne le sont plus.&thinsp;
      </p>

      <div
        ref={metaRef}
        className="absolute left-[735px] top-[282px] w-[943px] text-right text-black font-sans"
      >
        <p className="font-bold text-[36px]">Colin de la Higuera,</p>
        <p className="text-[32px]">Professeur à l&apos;Université de Nantes</p>
        <p className="text-[32px]">Titulaire de la Chaire UNESCO RELIA</p>
      </div>

      <div ref={rightDotsRef} className="absolute left-[1695px] top-[124px]">
        <DotPattern dotSize={24} mirror />
      </div>
    </section>
  );
}
