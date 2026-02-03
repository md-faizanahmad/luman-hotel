"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

export type ViewState = "options" | "spa" | "dining" | "queries";

interface ActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

// 1. SMALL COMPONENT: Quick Action Card
export const QuickAction = ({ icon, label, onClick }: ActionProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-orange-200 hover:bg-white transition-all group h-24"
  >
    <div className="mb-2 text-zinc-400 group-hover:text-orange-600 transition-all">
      {icon}
    </div>
    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-900 text-center">
      {label}
    </span>
  </button>
);

// 2. SMALL COMPONENT: List Item
export const SelectionItem = ({
  title,
  time,
}: {
  title: string;
  time: string;
}) => (
  <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl hover:bg-orange-50 transition-colors cursor-pointer group">
    <span className="text-[10px] font-bold text-zinc-800">{title}</span>
    <span className="text-[8px] font-bold text-zinc-400 group-hover:text-orange-600 uppercase">
      {time}
    </span>
  </div>
);

// 3. SMALL COMPONENT: Navigation Header
export const ViewHeader = ({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) => (
  <div className="mb-4">
    <button
      onClick={onBack}
      className="flex items-center gap-1 text-[9px] font-bold text-zinc-400 uppercase tracking-tighter hover:text-orange-600 transition-colors mb-2"
    >
      <ArrowLeft size={10} /> Back
    </button>
    <h4 className="font-serif text-xl italic text-zinc-900">{title}</h4>
  </div>
);
