import { motion } from "framer-motion";
import { Receipt, Calendar, Stethoscope, FlaskConical, Pill, ChevronRight, Pencil, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bill, formatDate, statusConfig } from "./billTypes";

const STATUS_ICONS = { CheckCircle2, Clock, XCircle };

interface BillCardProps {
  bill: Bill;
  animDelay: number;
  onDetails: () => void;
  onEdit: () => void;
}

export function BillCard({ bill, animDelay, onDetails, onEdit }: BillCardProps) {
  const cfg = statusConfig(bill.status);
  const StatusIcon = STATUS_ICONS[cfg.icon];
  const medicinesTotal = bill.medicines.reduce((s, m) => s + m.total, 0);
  const isPending = bill.status === "Pending";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: animDelay, type: "spring", stiffness: 260, damping: 24 }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 18 } }}
      className={cn("rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col", cfg.border)}
    >
      <div className={cn("h-1.5 w-full bg-gradient-to-r shrink-0", cfg.strip)} />

      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={cn("p-2 rounded-xl shrink-0", cfg.bg)}>
              <Receipt className={cn("w-3.5 h-3.5", cfg.color)} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-xs text-slate-800 font-mono leading-tight">{bill.billNumber}</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Calendar className="w-2.5 h-2.5 shrink-0" />
                {formatDate(bill.createdAt)}
              </p>
            </div>
          </div>
          <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0", cfg.badge)}>
            <StatusIcon className="w-2.5 h-2.5" />
            {bill.status}
          </span>
        </div>

        {/* Fee tiles */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[
            { icon: Stethoscope,  label: "Consult", value: bill.consultationFee, color: "text-blue-500",   bg: "bg-blue-50"   },
            { icon: FlaskConical, label: "Lab",      value: bill.labTestsFee,     color: "text-violet-500", bg: "bg-violet-50" },
            { icon: Pill,         label: "Meds",     value: medicinesTotal,       color: "text-teal-500",   bg: "bg-teal-50"   },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className={cn("rounded-xl px-2.5 py-2 flex flex-col gap-0.5", bg)}>
              <div className="flex items-center gap-1">
                <Icon className={cn("w-2.5 h-2.5 shrink-0", color)} />
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide leading-none">{label}</span>
              </div>
              <p className="text-xs font-bold text-slate-700">₹{value.toFixed(0)}</p>
            </div>
          ))}
        </div>

        {/* Medicine tags */}
        {bill.medicines.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {bill.medicines.slice(0, 2).map((m, i) => (
              <span key={i} className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full border border-slate-200 truncate max-w-[80px]">
                {m.name} {m.dosage}
              </span>
            ))}
            {bill.medicines.length > 2 && (
              <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full border border-slate-200">
                +{bill.medicines.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-2">
          <div>
            <p className="text-[9px] text-slate-400 uppercase tracking-wide leading-none mb-0.5">Total</p>
            <p className="text-sm font-bold text-slate-800">₹{bill.total.toFixed(0)}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {isPending && (
              <motion.div
                initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: animDelay + 0.18, type: "spring", stiffness: 380 }}
              >
                <Button size="sm" variant="outline"
                  onClick={(e) => { e.stopPropagation(); onEdit(); }}
                  className="h-7 px-2.5 gap-1 border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 text-[10px] font-semibold rounded-xl">
                  <Pencil className="w-2.5 h-2.5" /> Edit
                </Button>
              </motion.div>
            )}
            <Button size="sm" onClick={onDetails}
              className="h-7 px-2.5 gap-1 bg-slate-900 hover:bg-slate-700 text-white text-[10px] font-semibold rounded-xl">
              Details <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}