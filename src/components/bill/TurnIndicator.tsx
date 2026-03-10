import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TurnIndicatorProps {
  direction: "right-to-next" | "left-to-next";
}

export function TurnIndicator({ direction }: TurnIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative h-10 w-full"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-200" />
      <div className={cn(
        "absolute top-0 bottom-0 w-0.5 bg-slate-200",
        direction === "right-to-next" ? "right-0" : "left-0"
      )} />
      <div className={cn(
        "absolute bottom-1 text-[9px] font-bold text-slate-300 uppercase tracking-widest",
        direction === "right-to-next" ? "right-2" : "left-2"
      )}>
        {direction === "right-to-next" ? "↓ next" : "next ↓"}
      </div>
    </motion.div>
  );
}