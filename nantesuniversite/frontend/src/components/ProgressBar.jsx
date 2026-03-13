const TRACK_HEIGHT = 427;

export default function ProgressBar({ level = 0 }) {
  const clampedLevel = Math.min(1, Math.max(0, level));
  const fillHeight = Math.round(TRACK_HEIGHT * clampedLevel);
  const markerBottom = Math.max(10, fillHeight - 14);

  return (
    <div className="relative w-[46px] h-[427px]">
      <div className="absolute inset-0 rounded-[23px] bg-brand-grey/78 backdrop-blur-sm" />

      <div
        className="absolute bottom-0 left-[9px] w-[27px] rounded-[23px] transition-[height] duration-500 ease-out"
        style={{
          height: fillHeight,
          background:
            'linear-gradient(to bottom, var(--color-brand-light-blue) 5%, var(--color-brand-blue) 33%, #1933b8 100%)',
          boxShadow: '0 24px 45px rgba(53, 82, 255, 0.28)',
        }}
      />

      <div
        className="progress-marker absolute left-1/2 h-[20px] w-[20px] -translate-x-1/2 rounded-full bg-white transition-[bottom,opacity] duration-500 ease-out"
        style={{
          bottom: markerBottom,
          opacity: clampedLevel > 0.03 ? 1 : 0,
        }}
      />
    </div>
  );
}
