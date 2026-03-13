import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import robot2Head from '../assets/robot/robot2-head.png';
import robot2UpperBody from '../assets/robot/robot2-upper-body.png';
import robot2LowerBody from '../assets/robot/robot2-lower-body.png';
import robot2ArmBack from '../assets/robot/robot2-arm-back.png';
import robot2ArmFront from '../assets/robot/robot2-arm-front.png';

export default function Robot({ containerRef, spriteRef, stage = 0 }) {
  const motionRef = useRef(null);
  const shadowRef = useRef(null);
  const headRef = useRef(null);
  const armBackRef = useRef(null);
  const armFrontRef = useRef(null);
  const bodyRef = useRef(null);

  useLayoutEffect(() => {
    const motion = motionRef.current;
    const shadow = shadowRef.current;
    const head = headRef.current;
    const armBack = armBackRef.current;
    const armFront = armFrontRef.current;
    const body = bodyRef.current;

    if (!motion || !shadow || !head || !armBack || !armFront || !body) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(head, { transformOrigin: '43% 19%' });
      gsap.set(armBack, { transformOrigin: '58% 31%' });
      gsap.set(armFront, { transformOrigin: '48% 41%' });
      gsap.set(body, { transformOrigin: '50% 55%' });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(motion, {
          y: -12,
          rotate: 1.4,
          duration: 2.2,
        })
        .to(motion, {
          y: 5,
          rotate: -1.2,
          duration: 2.2,
        });

      gsap.to(head, {
        rotate: -5,
        y: -8,
        x: -1,
        duration: 1.7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(armBack, {
        rotate: 4,
        x: -4,
        y: 3,
        duration: 1.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(armFront, {
        rotate: 6,
        x: 5,
        y: -2,
        duration: 1.55,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(body, {
        scaleY: 1.015,
        scaleX: 0.99,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(shadow, {
        scaleX: 0.84,
        opacity: 0.18,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-[432px] top-[804px] w-[206px] h-[252px]"
    >
      <div ref={spriteRef} className={`robot-shell robot-shell--stage-${stage}`}>
        <div ref={shadowRef} className="robot-shell__shadow" />
        <div className="robot-shell__halo" />
        <div className="robot-shell__ring robot-shell__ring--inner" />
        <div className="robot-shell__ring robot-shell__ring--outer" />

        <div ref={motionRef} className="robot-shell__motion">
          <img
            ref={armBackRef}
            src={robot2ArmBack}
            alt=""
            aria-hidden
            className="robot-shell__part robot-shell__part--arm-back"
          />
          <img
            ref={bodyRef}
            src={robot2LowerBody}
            alt=""
            aria-hidden
            className="robot-shell__part robot-shell__part--lower-body"
          />
          <img
            src={robot2UpperBody}
            alt=""
            aria-hidden
            className="robot-shell__part robot-shell__part--upper-body"
          />
          <img
            ref={armFrontRef}
            src={robot2ArmFront}
            alt=""
            aria-hidden
            className="robot-shell__part robot-shell__part--arm-front"
          />
          <img
            ref={headRef}
            src={robot2Head}
            alt="Figure IA"
            className="robot-shell__part robot-shell__part--head-two"
          />
        </div>
      </div>
    </div>
  );
}
