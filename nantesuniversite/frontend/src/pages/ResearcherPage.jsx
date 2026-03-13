import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import TopicTitle from '../components/TopicTitle';
import ExpertQuote from '../components/ExpertQuote';
import ProgressBar from '../components/ProgressBar';
import IcebergScene from '../components/IcebergScene';
import ScrollArrow from '../components/ScrollArrow';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 4609;
const STAGES = ['Public', 'Curieux', 'Experts'];

export default function ResearcherPage() {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);
  const [storyProgress, setStoryProgress] = useState(0);
  const [revealedResources, setRevealedResources] = useState([]);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const progressLevel = useMemo(() => {
    const revealRatio = revealedResources.length / 3;
    return Math.min(1, storyProgress * 0.5 + revealRatio * 0.5);
  }, [revealedResources.length, storyProgress]);

  const stageIndex = Math.min(
    STAGES.length - 1,
    Math.floor(storyProgress * STAGES.length),
  );

  function handleResourceReveal(resourceId) {
    setRevealedResources((current) => (
      current.includes(resourceId) ? current : [...current, resourceId]
    ));
  }

  return (
    <>
      <div className="fixed bottom-[33px] left-[33px] pointer-events-none z-50" style={{ zoom: 0.6 }}>
        <div className="flex items-end gap-5">
          <ProgressBar level={progressLevel} />
          <div className="mb-5 rounded-full border border-white/40 bg-white/60 px-5 py-3 text-[20px] font-semibold tracking-[0.12em] text-brand-blue shadow-[0_18px_50px_rgba(53,82,255,0.16)] backdrop-blur-md">
            {STAGES[stageIndex]}
          </div>
        </div>
      </div>

      <div className="fixed bottom-[33px] right-[60px] z-50">
        <ScrollArrow direction="up" scale={0.5} />
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-700"
        style={{
          opacity: Math.max(0, storyProgress - 0.12) * 0.5,
          background:
            'radial-gradient(circle at 50% 20%, rgba(96, 203, 235, 0) 0%, rgba(96, 203, 235, 0.02) 28%, rgba(53, 82, 255, 0.14) 58%, rgba(15, 32, 111, 0.35) 100%)',
        }}
      />

      <div
        className="relative font-sans"
        style={{
          zoom: scale,
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          background: 'linear-gradient(to bottom, white 0%, white 35%, var(--color-brand-blue) 100%)',
        }}
      >
        <Header />
        <TopicTitle />
        <ExpertQuote />
        <IcebergScene
          onProgressChange={setStoryProgress}
          onResourceReveal={handleResourceReveal}
        />
      </div>
    </>
  );
}
