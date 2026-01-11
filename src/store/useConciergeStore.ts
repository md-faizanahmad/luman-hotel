import { create } from "zustand";

interface PreBooking {
  type: "Spa" | "Dining" | "None";
  time?: string;
}

interface ConciergeState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  booking: PreBooking;
  setBooking: (booking: PreBooking) => void;
}

export const useConciergeStore = create<ConciergeState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  booking: { type: "None" },
  setBooking: (booking) => set({ booking }),
}));
