import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TopicTitle() {
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(title, {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          once: true,
        },
      });

      gsap.to(title, {
        y: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, title);

    return () => ctx.revert();
  }, []);

  return (
    <p
      ref={titleRef}
      className="absolute left-[47px] top-[150px] w-[1918px] h-[232px] text-brand-blue text-[48px] leading-normal not-italic whitespace-pre-wrap m-0"
      style={{ fontFamily: "'OT Bulb Monoline', Inter, sans-serif" }}
    >
      {`ACCOMPAGNER LE DÉPLOIEMENT \nDE L'IA DANS L'ÉDUCATION`}
    </p>
  );
}
