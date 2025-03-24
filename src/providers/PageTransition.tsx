"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Unique key for each page transition
        // initial={{ opacity: 0, y: 20 }} // Initial state (fade + slide)
        animate={{ opacity: 1, y: 0 }} // Final state (visible)
        // exit={{ opacity: 0, y: -20 }} // Exit animation (fade out + slide up)
        transition={{ duration: 0.3, ease: "easeInOut" }} // Transition timing
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
