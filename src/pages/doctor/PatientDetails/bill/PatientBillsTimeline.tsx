import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Receipt, Clock, XCircle,
  TrendingUp, ArrowRight, ArrowLeft as ArrowLeftIcon, Pencil,
} from "lucide-react";
import {
  useGetBillsByPatientQuery,
  useGetPatientByIdQuery,
  useCreateBillMutation,
  useGetDoctorDetailsQuery,
} from "@/redux/slices/api";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { Bill, BillPayload, chunk } from "@/components/bill/billTypes";
import { BillCard }       from "@/components/bill/BillCard";
import { TurnIndicator }  from "@/components/bill/TurnIndicator";
import { EditBillDialog } from "@/components/bill/EditBillDialog";

const PER_ROW = 3;

export default function PatientBillsTimeline() {
  const { id, doctorId } = useParams<{ id: string; doctorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const rawUser = useSelector((state: RootState) => state.app.doctorUser);
  const { data: doctor } = useGetDoctorDetailsQuery(String(rawUser?.id), { skip: !rawUser?.id });
  const user = doctor;

  const { data: patient, isLoading: patientLoading } = useGetPatientByIdQuery(id!);
  const {
    data: billsRaw,
    isLoading: billsLoading,
    refetch: refetchBills,
  } = useGetBillsByPatientQuery(Number(id), { skip: !id });

  const [createBill]   = useCreateBillMutation();
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  const bills: Bill[] = [...(billsRaw ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const rows       = chunk(bills, PER_ROW);
  const totalSpend = bills.filter((b) => b.status === "Paid").reduce((s, b) => s + b.total, 0);

  const handleSaveBill = async (data: BillPayload) => {
    try {
      await createBill({
        billId:          data._id,
        doctorId:        user._id ?? user.id,
        doctorCode:      user.doctorCode,
        patientId:       Number(id),
        medicines:       data.medicines,
        consultationFee: data.consultationFee,
        labTestsFee:     data.labTestsFee,
        subtotal:        data.subtotal,
        tax:             data.tax,
        total:           data.total,
        status:          data.status,
        paymentMethod:   data.paymentMethod,
        notes:           data.notes,
      }).unwrap();
      toast({ title: "Bill Updated", description: "The bill has been updated successfully." });
      refetchBills();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err?.data?.message || "Failed to update bill",
      });
    }
  };

  if (patientLoading || billsLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-slate-300 border-t-slate-800 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 group-hover:border-slate-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex flex-col items-center leading-tight">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Billing History</span>
            <span className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
              {patient?.name ?? "Patient"}
            </span>
          </div>

          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <Receipt className="w-3.5 h-3.5" />
            {bills.length} bill{bills.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Hero: patient info + summary stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260 }}
          className="flex flex-col lg:flex-row lg:items-center gap-5"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              {patient?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) ?? "P"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {patient?.name ?? "Patient"}'s Bills
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {[patient?.age && `${patient.age} yrs`, patient?.gender, patient?.condition]
                  .filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Total",     value: bills.length,                                          icon: Receipt,    color: "text-slate-600",   bg: "bg-slate-100"  },
              { label: "Paid",      value: `₹${(totalSpend / 1000).toFixed(1)}k`,                icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Pending",   value: bills.filter((b) => b.status === "Pending").length,    icon: Clock,      color: "text-amber-600",   bg: "bg-amber-50"   },
              { label: "Cancelled", value: bills.filter((b) => b.status === "Cancelled").length,  icon: XCircle,    color: "text-red-500",     bg: "bg-red-50"     },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm text-center">
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 mx-auto", bg)}>
                  <Icon className={cn("w-3.5 h-3.5", color)} />
                </div>
                <p className="text-base font-bold text-slate-800">{value}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Empty state ── */}
        <AnimatePresence>
          {bills.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Receipt className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-base font-semibold text-slate-600">No bills yet</p>
              <p className="text-sm text-slate-400 mt-1">Bills for this patient will appear here.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Zigzag timeline ── */}
        {bills.length > 0 && (
          <>
            {/* Timeline header */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Timeline</span>
              <div className="flex-1 h-px bg-slate-200" />
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                <ArrowRight className="w-3 h-3" />
                <span>left to right</span>
                <span className="text-slate-300">·</span>
                <span>then right to left</span>
                <ArrowLeftIcon className="w-3 h-3" />
              </div>
              {bills.some((b) => b.status === "Pending") && (
                <span className="flex items-center gap-1 text-[10px] text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 ml-2">
                  <Pencil className="w-2.5 h-2.5" />
                  Pending bills are editable
                </span>
              )}
            </div>

            {/* Rows */}
            <div className="space-y-0">
              {rows.map((rowBills, rowIdx) => {
                const isEven        = rowIdx % 2 === 0;
                const globalOffset  = rowIdx * PER_ROW;
                const isLast        = rowIdx === rows.length - 1;
                // odd rows read right-to-left so we reverse the visual order
                const displayBills  = isEven ? rowBills : [...rowBills].reverse();

                return (
                  <div key={rowIdx}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: rowIdx * 0.08 }}
                    >
                      {/* Row direction label */}
                      <div className={cn("flex items-center gap-2 mb-2", !isEven && "flex-row-reverse")}>
                        <div className={cn(
                          "flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest",
                          !isEven && "flex-row-reverse"
                        )}>
                          {isEven
                            ? <><span>Row {rowIdx + 1}</span><ArrowRight className="w-3 h-3 text-slate-300" /></>
                            : <><ArrowLeftIcon className="w-3 h-3 text-slate-300" /><span>Row {rowIdx + 1}</span></>
                          }
                        </div>
                        <span className="text-[9px] text-slate-300">
                          #{globalOffset + 1}{rowBills.length > 1 ? `–${globalOffset + rowBills.length}` : ""}
                        </span>
                      </div>

                      {/* 3-column grid — invisible placeholders keep alignment for short rows */}
                      <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: PER_ROW }).map((_, slotIdx) => {
                          const bill = displayBills[slotIdx];
                          if (!bill) return <div key={`empty-${slotIdx}`} className="invisible" />;

                          const trueIdx = isEven
                            ? globalOffset + slotIdx
                            : globalOffset + (rowBills.length - 1 - slotIdx);

                          return (
                            <BillCard
                              key={bill._id}
                              bill={bill}
                              animDelay={trueIdx * 0.055}
                              onDetails={() =>
                                navigate(`/doctor/${doctorId}/patients/${id}/bill`, {
                                  state: { billId: bill._id },
                                })
                              }
                              onEdit={() => setEditingBill(bill)}
                            />
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Connector between rows */}
                    {!isLast && (
                      <TurnIndicator direction={isEven ? "right-to-next" : "left-to-next"} />
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-400 pb-4 pt-2">
              {bills.length} bill{bills.length !== 1 ? "s" : ""} total · Newest first
            </p>
          </>
        )}
      </div>

      {/* ── Edit Bill Modal ── */}
      <AnimatePresence>
        {editingBill && (
          <EditBillDialog
            key={editingBill._id}
            bill={editingBill}
            patientName={patient?.name ?? "Patient"}
            patientAge={patient?.age}
            patientGender={patient?.gender}
            open={!!editingBill}
            onClose={() => setEditingBill(null)}
            onSave={handleSaveBill}
          />
        )}
      </AnimatePresence>
    </div>
  );
}