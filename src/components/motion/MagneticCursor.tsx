// "use client";

// import React, { useEffect, useState } from "react";
// import { motion, useMotionValue, useSpring } from "framer-motion";
// import { useRoomStore } from "@/store/useRoomStore";

// export default function MagneticCursor() {
//   const [cursorType, setCursorType] = useState("default");
//   const { selectedRoom } = useRoomStore();

//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);

//   // Smooth springs for a "premium" feel
//   const springConfig = { damping: 25, stiffness: 250 };
//   const edgeSpringConfig = { damping: 15, stiffness: 100 }; // Softer for the "magnetic" part

//   const x = useSpring(cursorX, springConfig);
//   const y = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e: MouseEvent) => {
//       cursorX.set(e.clientX);
//       cursorY.set(e.clientY);

//       // Check if hovering over a "magnetic" element
//       const target = e.target as HTMLElement;
//       if (target.closest(".magnetic-item")) {
//         setCursorType("view");
//       } else if (target.closest("button") || target.closest("a")) {
//         setCursorType("pointer");
//       } else {
//         setCursorType("default");
//       }
//     };

//     window.addEventListener("mousemove", moveCursor);
//     return () => window.removeEventListener("mousemove", moveCursor);
//   }, []);

//   // Hide cursor on mobile or when a modal is open
//   if (typeof window !== "undefined" && window.innerWidth < 768) return null;
//   if (selectedRoom) return null;

//   return (
//     <motion.div
//       className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-600 pointer-events-none z-9999 flex items-center justify-center"
//       style={{
//         x,
//         y,
//         translateX: "-50%",
//         translateY: "-50%",
//         // Dynamic styling based on hover state
//         width: cursorType === "view" ? 100 : cursorType === "pointer" ? 40 : 20,
//         height:
//           cursorType === "view" ? 100 : cursorType === "pointer" ? 40 : 20,
//         backgroundColor:
//           cursorType === "view" ? "rgba(234, 88, 12, 0.9)" : "transparent",
//         borderColor:
//           cursorType === "default"
//             ? "rgba(234, 88, 12, 0.5)"
//             : "rgba(234, 88, 12, 1)",
//       }}
//       transition={{ type: "spring", ...edgeSpringConfig }}
//     >
//       {cursorType === "view" && (
//         <motion.span
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-[10px] font-bold text-white uppercase tracking-tighter"
//         >
//           View Suite
//         </motion.span>
//       )}
//     </motion.div>
//   );
// }
