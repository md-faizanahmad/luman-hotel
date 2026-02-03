import { BedDouble } from "lucide-react";
import { BookingSection } from "./BookingSection";
import { RoomType } from "@/types/rooms";

interface Props {
  rooms: RoomType[];
  selectedRoom?: RoomType;
  onSelect: (room: RoomType) => void;
}

export function RoomSelector({ rooms, selectedRoom, onSelect }: Props) {
  return (
    <BookingSection
      label="Room"
      value={
        selectedRoom
          ? `${selectedRoom.name} · ₹${selectedRoom.price}/night`
          : "Select Room"
      }
      icon={<BedDouble size={16} />}
      popoverContent={
        <div className="p-3 w-64 space-y-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onSelect(room)}
              className="
                w-full text-left px-4 py-3 rounded-xl
                border border-zinc-100
                hover:bg-zinc-50
                transition-all
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
