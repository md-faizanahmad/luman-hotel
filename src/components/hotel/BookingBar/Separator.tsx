// Separator.tsx
// Simple visual divider used inside BookingBar.
// Rendered only on desktop to keep mobile layout clean.

export function Separator() {
  return (
    <div
      className="
        hidden md:block 
        w-px 
        h-6 
        bg-zinc-200/60 
        mx-1
      "
      aria-hidden="true"
    />
  );
}
