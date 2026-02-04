import { Plus, Minus, Users } from "lucide-react";
import { BookingSection } from "./BookingSection";
import { MAX_GUESTS, MIN_GUESTS } from "@/utils/booking";

interface Props {
  guests: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}

export function GuestSelector({
  guests,
  onChange,
  disabled,
  open,
  onOpenChange,
}: Props) {
  const increment = () => {
    if (guests < MAX_GUESTS + 1) {
      onChange(guests + 1);
    }
  };

  const decrement = () => {
    if (guests > MIN_GUESTS) {
      onChange(guests - 1);
    }
  };

  return (
    <BookingSection
      label="Guests"
      value={`${guests} Adult${guests > 1 ? "s" : ""}`}
      icon={<Users size={16} />}
      disabled={disabled}
      isOpen={!!open}
      onOpenChange={(v) => onOpenChange?.(v)}
      popoverContent={
        <div className="p-4 w-56 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Adults
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={decrement}
                disabled={guests <= MIN_GUESTS}
                className="w-7 h-7 rounded-full border border-zinc-100 flex items-center justify-center hover:bg-zinc-900 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <Minus size={12} />
              </button>

              <span className="text-sm font-bold w-4 text-center">
                {guests}
              </span>

              <button
                type="button"
                onClick={increment}
                className="w-7 h-7 rounded-full border border-zinc-100 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {guests > MAX_GUESTS && (
            <p className="text-xs text-orange-600 font-semibold">
              For more than {MAX_GUESTS} guests, please call the hotel directly.
            </p>
          )}
        </div>
      }
    />
  );
}
