// Small cue under phone-width image rows that scroll sideways.
export function SwipeHint({ className = "" }: { className?: string }) {
  return (
    <p aria-hidden="true" className={`ukha-note mt-3 tracking-[0.18em]! sm:hidden ${className}`}>
      SWIPE →
    </p>
  );
}
