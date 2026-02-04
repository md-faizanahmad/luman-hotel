import { BedDouble } from "lucide-react";
import { BookingSection } from "./BookingSection";
import { RoomType } from "@/types/rooms";

interface Props {
  rooms: RoomType[];
  selectedRoom?: RoomType;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  onSelect: (room: RoomType) => void;
}

export function RoomSelector({
  rooms,
  selectedRoom,
  disabled,
  open,
  onOpenChange,
  onSelect,
}: Props) {
  return (
    <BookingSection
      label="Room"
      value={
        selectedRoom
          ? `${selectedRoom.name} · ₹${selectedRoom.price}/night`
          : "Select Room"
      }
      icon={<BedDouble size={16} />}
      disabled={disabled}
      isOpen={!!open}
      onOpenChange={(v) => onOpenChange?.(v)}
      popoverContent={
        <div className="p-3 w-64 space-y-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => onSelect(room)}
              className="
                w-full text-left px-4 py-3 rounded-xl
                border border-zinc-100
                hover:bg-zinc-50
                transition-all
                focus:outline-none focus:ring-2 focus:ring-zinc-900
              "
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-zinc-900">
                  {room.name}
                </span>
                <span className="text-sm font-bold text-zinc-900">
                  ₹{room.price}
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                Per Night
              </span>
            </button>
          ))}
        </div>
      }
    />
  );
}
