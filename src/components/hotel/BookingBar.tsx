// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Search, Plus, Minus, Calendar as CalIcon, Users } from "lucide-react";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { BookingSummary } from "./BookingSummary";

// export function BookingBar() {
//   const [checkIn, setCheckIn] = useState<Date>();
//   const [checkOut, setCheckOut] = useState<Date>();
//   const [guests, setGuests] = useState(2);
//   const [openIn, setOpenIn] = useState(false);
//   const [openOut, setOpenOut] = useState(false);
//   const [isSummaryOpen, setIsSummaryOpen] = useState(false);

//   return (
//     <div className="w-full flex justify-center px-4 relative z-100">
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="w-full max-w-5xl"
//       >
//         {/* MAIN BAR CONTAINER */}
//         <div className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] md:rounded-full p-1.5 flex flex-col md:flex-row items-stretch md:items-center gap-1">
//           {/* CHECK-IN */}
//           <BookingSection
//             label="Check In"
//             value={checkIn ? format(checkIn, "dd MMM") : "Add Date"}
//             icon={<CalIcon size={16} />}
//             isOpen={openIn}
//             onOpenChange={setOpenIn}
//             popoverContent={
//               <Calendar
//                 mode="single"
//                 selected={checkIn}
//                 onSelect={(date) => {
//                   setCheckIn(date);
//                   setOpenIn(false);
//                   setTimeout(() => setOpenOut(true), 150);
//                 }}
//                 className="rounded-3xl border-none"
//               />
//             }
//           />

//           <Separator />

//           {/* CHECK-OUT */}
//           <BookingSection
//             label="Check Out"
//             value={checkOut ? format(checkOut, "dd MMM") : "Add Date"}
//             icon={<CalIcon size={16} />}
//             isOpen={openOut}
//             onOpenChange={setOpenOut}
//             popoverContent={
//               <Calendar
//                 mode="single"
//                 selected={checkOut}
//                 disabled={(date) => (checkIn ? date <= checkIn : false)}
//                 onSelect={(date) => {
//                   setCheckOut(date);
//                   setOpenOut(false);
//                 }}
//                 className="rounded-3xl border-none"
//               />
//             }
//           />

//           <Separator />

//           {/* GUESTS */}
//           <BookingSection
//             label="Travelers"
//             value={`${guests} Adults`}
//             icon={<Users size={16} />}
//             popoverContent={
//               <div className="p-4 w-56 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
//                     Adults
//                   </span>
//                   <div className="flex items-center gap-3">
//                     <GuestBtn
//                       onClick={() => setGuests(Math.max(1, guests - 1))}
//                       icon={<Minus size={12} />}
//                     />
//                     <span className="text-sm font-bold w-4 text-center">
//                       {guests}
//                     </span>
//                     <GuestBtn
//                       onClick={() => setGuests(guests + 1)}
//                       icon={<Plus size={12} />}
//                     />
//                   </div>
//                 </div>
//               </div>
//             }
//           />

//           {/* ACTION BUTTON */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setIsSummaryOpen(true)}
//             className="md:ml-auto bg-zinc-950 text-white h-14 md:h-12 px-8 md:px-6 rounded-3xl md:rounded-full flex items-center justify-center gap-3 group transition-all duration-500 hover:bg-orange-600 shadow-lg shadow-zinc-950/10"
//           >
//             <div className="relative overflow-hidden w-4 h-4">
//               <Search className="w-4 h-4 absolute transition-transform duration-500 group-hover:-translate-y-6" />
//               <Search className="w-4 h-4 absolute translate-y-6 transition-transform duration-500 group-hover:translate-y-0" />
//             </div>
//             <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
//               Find Suite
//             </span>
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* PORTAL-READY SUMMARY */}
//       <BookingSummary
//         isOpen={isSummaryOpen}
//         onClose={() => setIsSummaryOpen(false)}
//         data={{
//           checkIn,
//           checkOut,
//           guests,
//           basePrice: 450,
//         }}
//       />
//     </div>
//   );
// }

// // --- SUB-COMPONENTS FOR CLEANER CODE ---

// function BookingSection({
//   label,
//   value,
//   icon,
//   popoverContent,
//   isOpen,
//   onOpenChange,
// }: any) {
//   return (
//     <Popover open={isOpen} onOpenChange={onOpenChange}>
//       <PopoverTrigger asChild>
//         <button className="flex-1 flex items-center gap-4 px-6 py-3 md:py-2 rounded-2xl md:rounded-full hover:bg-white transition-all text-left group border border-transparent hover:border-zinc-100">
//           <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-black group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shrink-0">
//             {icon}
//           </div>
//           <div className="flex flex-col">
//             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black group-hover:text-orange-600 transition-colors">
//               {label}
//             </span>
//             <span className="text-xs font-bold text-zinc-900 truncate">
//               {value}
//             </span>
//           </div>
//         </button>
//       </PopoverTrigger>
//       <PopoverContent
//         className="w-auto p-0 rounded-[2rem] border-none shadow-2xl bg-white/95 backdrop-blur-xl z-150"
//         align="start"
//       >
//         {popoverContent}
//       </PopoverContent>
//     </Popover>
//   );
// }

// function Separator() {
//   return <div className="hidden md:block w-px h-6 bg-zinc-200/60 mx-1" />;
// }

// function GuestBtn({
//   onClick,
//   icon,
// }: {
//   onClick: () => void;
//   icon: React.ReactNode;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="w-7 h-7 rounded-full border border-zinc-100 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all"
//     >
//       {icon}
//     </button>
//   );
// }
