import { create } from "zustand";

const options = [
  { lang: "EN", curr: "USD", symbol: "$", rate: 1 },
  { lang: "EN", curr: "INR", symbol: "₹", rate: 83 },
  { lang: "FR", curr: "EUR", symbol: "€", rate: 0.92 },
];

interface CurrencyState {
  activeCurrency: (typeof options)[0];
  setCurrency: (curr: (typeof options)[0]) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  activeCurrency: options[1], // Default to INR
  setCurrency: (curr) => set({ activeCurrency: curr }),
}));
