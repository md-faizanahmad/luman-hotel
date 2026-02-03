import { Plus, Minus, Users } from "lucide-react";
import { BookingSection } from "./BookingSection";
import { MAX_GUESTS, MIN_GUESTS } from "@/utils/booking";

interface Props {
  guests: number;
  onChange: (value: number) => void;
}

export function GuestSelector({ guests, onChange }: Props) {
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
      value={`${guests} Adults`}
      icon={<Users size={16} />}
      popoverContent={
        <div className="p-4 w-56 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Adults
            </span>
            <div className="flex items-center gap-3">
              <button onClick={decrement}>
                <Minus size={12} />
              </button>
              <span className="text-sm text-[10px] font-bold">{guests}</span>
              <button onClick={increment}>
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
