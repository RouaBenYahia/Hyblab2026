import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Robot from './Robot';
import ResourceCard from './ResourceCard';
import ScrollArrow from './ScrollArrow';
import data from '../data/data.json';

import prixSvg from '../data/pictogramme/prix.svg';
import articleSvg from '../data/pictogramme/article.svg';
import conferenceSvg from '../data/pictogramme/conference.svg';
import livreSvg from '../data/pictogramme/livre.svg';
import podcastSvg from '../data/pictogramme/podcast.svg';
import rechercheSvg from '../data/pictogramme/recherche.svg';

gsap.registerPlugin(ScrollTrigger);

const PICTOGRAMMES = {
  prix: prixSvg,
  article: articleSvg,
  conference: conferenceSvg,
  livre: livreSvg,
  podcast: podcastSvg,
  recherche: rechercheSvg,
};

const CARD_POSITIONS = [
  { left: 227, top: 1394 },
  { left: 1003, top: 2150 },
  { left: 523, top: 2901 },
];

const cardDocuments = data.researcher.documents.slice(0, 3);

const icebergOutline =
  'https://www.figma.com/api/mcp/asset/5269f595-e74b-4e55-afe5-a7554468a35e';
const icebergFill =
  'https://www.figma.com/api/mcp/asset/e0dd227c-79e9-4ec8-ab24-ca8d1e2d240b';
const icebergOutline2 =
  'https://www.figma.com/api/mcp/asset/32052552-9008-407e-b009-4f0f62e864ab';
const wavyLineSide =
  'https://www.figma.com/api/mcp/asset/02a68ccd-a0df-4a73-b697-55f5605a5a10';
const wavyLineCentre =
  'https://www.figma.com/api/mcp/asset/a7cc859a-99ec-42b5-98df-bd06ed42cbbc';

export default function IcebergScene({ onProgressChange, onResourceReveal }) {
  const sceneRef = useRef(null);
  const centerWaveRef = useRef(null);
  const leftWaveRef = useRef(null);
  const rightWaveRef = useRef(null);
  const icebergOutlineRef = useRef(null);
  const icebergFillRef = useRef(null);
  const icebergOutline2Ref = useRef(null);
  const depthOverlayRef = useRef(null);
  const robotRef = useRef(null);
  const robotSpriteRef = useRef(null);
  const cardRefs = useRef([]);
  const progressCallbackRef = useRef(onProgressChange);
  const revealCallbackRef = useRef(onResourceReveal);
  const stageRef = useRef(0);
  const [robotStage, setRobotStage] = useState(0);

  useEffect(() => {
    progressCallbackRef.current = onProgressChange;
    revealCallbackRef.current = onResourceReveal;
  }, [onProgressChange, onResourceReveal]);

  useEffect(() => {
    const sprite = robotSpriteRef.current;
    if (!sprite) {
      return undefined;
    }

    const moveX = gsap.quickTo(sprite, 'x', { duration: 0.35, ease: 'power3.out' });
    const moveY = gsap.quickTo(sprite, 'y', { duration: 0.35, ease: 'power3.out' });
    const tilt = gsap.quickTo(sprite, 'rotate', { duration: 0.45, ease: 'power3.out' });

    function handlePointerMove(event) {
      const offsetX = ((event.clientX / window.innerWidth) - 0.5) * 20;
      const offsetY = ((event.clientY / window.innerHeight) - 0.5) * 14;
      moveX(offsetX);
      moveY(offsetY);
      tilt(offsetX * 0.35);
    }

    function resetPointerOffset() {
      moveX(0);
      moveY(0);
      tilt(0);
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', resetPointerOffset);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', resetPointerOffset);
    };
  }, []);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(icebergFillRef.current, {
        clipPath: 'inset(0 0 72% 0)',
      });
      gsap.set(cardRefs.current, {
        autoAlpha: 0,
        y: 92,
        rotate: -2,
        scale: 0.94,
      });

      gsap.to(centerWaveRef.current, {
        x: 18,
        duration: 4.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(leftWaveRef.current, {
        x: -28,
        duration: 4.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(rightWaveRef.current, {
        x: 36,
        duration: 5.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top+=80',
          end: 'bottom bottom',
          scrub: 1.15,
          onUpdate: ({ progress }) => {
            const stage = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
            progressCallbackRef.current?.(progress);
            if (stageRef.current !== stage) {
              stageRef.current = stage;
              setRobotStage(stage);
            }
          },
        },
      })
        .to(depthOverlayRef.current, {
          opacity: 0.78,
          scale: 1.05,
          ease: 'none',
        }, 0)
        .to(icebergOutlineRef.current, {
          y: -36,
          scale: 1.01,
          transformOrigin: 'center top',
          ease: 'none',
        }, 0)
        .to(icebergFillRef.current, {
          clipPath: 'inset(0 0 0% 0)',
          ease: 'none',
        }, 0)
        .to(icebergOutline2Ref.current, {
          y: 84,
          scale: 1.02,
          transformOrigin: 'center center',
          ease: 'none',
        }, 0)
        .to(centerWaveRef.current, {
          y: 20,
          opacity: 0.72,
          ease: 'none',
        }, 0)
        .to(robotRef.current, {
          keyframes: [
            { x: 160, y: 320, scale: 1.02, duration: 0.24 },
            { x: 520, y: 1180, scale: 1.12, duration: 0.42 },
            { x: 140, y: 2040, scale: 1.23, duration: 0.34 },
          ],
          ease: 'none',
        }, 0);

      cardDocuments.forEach((doc, index) => {
        const element = cardRefs.current[index];
        if (!element) {
          return;
        }

        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
            onEnter: () => revealCallbackRef.current?.(doc.id),
          },
        });

        gsap.to(element, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, scene);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sceneRef} className="absolute inset-0">
      <ScrollArrow direction="down" left="50%" top={888} translateX="-50%" />

      <div className="absolute left-[843px] top-[1036px] w-[234px] h-[18px]">
        <img ref={centerWaveRef} src={wavyLineCentre} alt="" className="w-full h-full" aria-hidden />
      </div>

      <div
        ref={depthOverlayRef}
        className="absolute left-[233px] top-[1128px] h-[2470px] w-[1255px] rounded-[999px] opacity-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 10%, rgba(96, 203, 235, 0.14) 0%, rgba(96, 203, 235, 0.08) 18%, rgba(53, 82, 255, 0.26) 45%, rgba(9, 23, 98, 0.72) 100%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="absolute left-[99px] top-[894px] w-[1588px] h-[2701px]">
        <img ref={icebergOutlineRef} src={icebergOutline} alt="Iceberg" className="w-full h-full object-contain" />
      </div>
      <div className="absolute left-[99px] top-[894px] w-[1588px] h-[2701px]">
        <img ref={icebergFillRef} src={icebergFill} alt="" className="w-full h-full object-contain" aria-hidden />
      </div>
      <div className="absolute left-[99px] top-[894px] w-[1588px] h-[2701px]">
        <img ref={icebergOutline2Ref} src={icebergOutline2} alt="" className="w-full h-full object-contain" aria-hidden />
      </div>

      <div className="absolute left-[1678px] top-[1488px] w-[242px] h-[9px]">
        <img ref={rightWaveRef} src={wavyLineSide} alt="" className="w-full h-full" aria-hidden />
      </div>
      <div className="absolute left-[-74px] top-[1644px] w-[242px] h-[9px]">
        <img ref={leftWaveRef} src={wavyLineSide} alt="" className="w-full h-full" aria-hidden />
      </div>

      <Robot containerRef={robotRef} spriteRef={robotSpriteRef} stage={robotStage} />

      {cardDocuments.map((doc, index) => (
        <ResourceCard
          key={doc.id}
          cardRef={(element) => {
            cardRefs.current[index] = element;
          }}
          pictogramme={PICTOGRAMMES[doc.category]}
          category={doc.category}
          title={doc.title}
          description={doc.description}
          {...CARD_POSITIONS[index]}
        />
      ))}
    </section>
  );
}
