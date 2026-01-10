import { create } from "zustand";
import { ROOMS } from "@/lib/data";

interface RoomState {
  selectedRoom: (typeof ROOMS)[0] | null;
  setSelectedRoom: (room: (typeof ROOMS)[0] | null) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  selectedRoom: null,
  setSelectedRoom: (room) => set({ selectedRoom: room }),
}));
