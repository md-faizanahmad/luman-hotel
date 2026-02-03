import { ReactNode } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
  popoverContent: ReactNode;
}

export function BookingSection({ label, value, icon, popoverContent }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex-1 flex items-center gap-4 px-6 py-3 rounded-2xl hover:bg-white">
          <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <div className="text-[10px] font-black uppercase">{label}</div>
            <div className="text-xs font-bold text-red-800">{value}</div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-2xl">
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
}
