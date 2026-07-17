export function ScrollCue({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative h-14 w-px ${className}`}>
      <span className="absolute inset-0 bg-brass/25" />
      <span className="scroll-cue-mote absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brass" />
    </div>
  );
}
