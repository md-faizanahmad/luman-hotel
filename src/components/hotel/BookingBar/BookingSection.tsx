import { ReactNode } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
  popoverContent: ReactNode;
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  disabled?: boolean;
}

export function BookingSection({
  label,
  value,
  icon,
  popoverContent,
  isOpen,
  onOpenChange,
  disabled,
}: Props) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex-1 flex items-center gap-4 px-6 py-3 rounded-2xl transition-all",
            "hover:bg-white",
            disabled && "opacity-40 pointer-events-none",
          )}
        >
          <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <div className="text-[10px] font-black uppercase">{label}</div>
            <div className="text-xs font-bold text-zinc-900 truncate">
              {value}
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="p-0 rounded-2xl border-none shadow-xl"
        align="start"
      >
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
}
