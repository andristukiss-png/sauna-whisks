export function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 74 74" aria-hidden="true">
      <path d="M38 65C33 48 34 27 51 10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M43 23C49 11 60 8 66 9C64 20 56 27 43 23Z" fill="currentColor" opacity=".95" />
      <path d="M38 36C26 27 17 29 11 34C18 43 27 45 38 36Z" fill="currentColor" opacity=".82" />
      <path d="M39 48C49 38 59 40 64 44C59 54 50 57 39 48Z" fill="currentColor" opacity=".7" />
    </svg>
  );
}
